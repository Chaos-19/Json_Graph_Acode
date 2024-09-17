import React, { useState, useEffect, useRef } from "react";
import { JSONGraph as Graph } from "jsongraph-react";
import { fileExtensions } from "../constants";
const fs = acode.require("fsOperation");

const Jsoncrack = ({
    graphRef,
    options: { theme, direction, hideChildrenCount, hideCollapseButton },
    fileName,
    uri
}) => {
    const [fileContent, setFileContent] = useState("");
    const [readeState, setReadeState] = useState(false);
    const [isTooLarge, setIsTooLarge] = useState(false);

    const currentFileRef = useRef(null); // Track the current file being read

    async function readFileInChunks() {
        const file = editorManager.activeFile;
        const fileContentArray = [];
        let offset = 0;

        try {
            // Read the entire file
            const content = await fs(file.uri).readFile("utf-8");
            const fileStat = await fs(uri).stat();

            setIsTooLarge(fileStat.length > 200000);

            const fileSize = content.length;
            let chunkSize = fileSize / 5;

            while (offset < fileSize) {
                if (file !== currentFileRef.current || isTooLarge) {
                    console.log("File switched, stopping read process...");
                    return;
                }

                // Process the content in chunks
                const chunk = content.slice(offset, offset + chunkSize);

                offset += chunkSize;

                setFileContent(prev => prev + chunk);
                console.log(`Processed ${offset} of ${fileSize}`);
            }

            console.log("File processing complete.");
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }

    useEffect(() => {
        const handleSwitchFile = async () => {
            const { filename } = editorManager.activeFile;

            if (fileExtensions.includes(filename?.split(".").pop())) {
                currentFileRef.current = editorManager.activeFile; // Set current file reference
                setIsTooLarge(false);
                setFileContent(""); // Reset file content for the new file
                setReadeState(true);
                await readFileInChunks();
                setReadeState(false);
            } else {
                console.log("Resetting content for non-supported file");
                setFileContent(""); // Reset if unsupported file
            }
        };

        handleSwitchFile();

        return () => {
            // Reset the current file ref when the component unmounts
            currentFileRef.current = null;
        };
    }, [fileName, uri]);

    return (
        <div className="w-[99%] h-[94dvh]">
            {readeState ? (
                <div className="h-full w-full flex items-center justify-center">
                    <h1>Loading...</h1>
                </div>
            ) : isTooLarge ? (
                <div className="h-full w-full flex items-center justify-center">
                    <div>
                        <h3 className="text-lg font-bold">Oppsss!</h3>
                        <p className="text-sm">file is too large</p>
                    </div>
                </div>
            ) : (
                fileContent && (
                    <Graph
                        json={fileContent}
                        ref={graphRef}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                        layout={{
                            theme,
                            direction,
                            hideChildrenCount,
                            hideCollapseButton
                        }}
                    />
                )
            )}
        </div>
    );
};

export default Jsoncrack;
