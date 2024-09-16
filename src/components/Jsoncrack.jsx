import React, { useState, useEffect } from "react";
import { JSONGraph as Graph } from "jsongraph-react";
import { fileExtensions } from "../constants";
const fs = acode.require("fsOperation");

const Jsoncrack = ({
    graphRef,
    options: {
        theme,
        direction,
        hideChildrenCount,
        hideCollapseButton,
        collapseNodes
    },
    fileName,
    uri
}) => {
    const [fileContent, setFileContent] = useState([]);
    const [readeState, setReadeState] = useState(false);

    const currentFileRef = useRef(null); // Track the current file being read

    async function readFileInChunks() {
        let chunkSize = 100 * 824;
        const file = editorManager.activeFile;
        const fileContentArray = [];
        let offset = 0;

        try {
            const content = await fs(file.uri).readFile("utf-8");
            const fileSize = content.length;
            chunkSize = fileSize / 2;

            while (offset < fileSize) {
                if (file !== currentFileRef.current) {
                    console.log("File switched, stopping read process...");
                    return;
                }

                // Process the content in chunks
                const chunk = content.slice(offset, offset + chunkSize);

                offset += chunkSize;

                setFileContent(prev => [...prev, chunk]);
                console.log(`Processed ${offset} of ${fileSize}`);
            }

            console.log("File processing complete.");
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }

    useEffect(() => {
        console.log(fileName, "...New file detected");

        const handleSwitchFile = async () => {
            const { filename } = editorManager.activeFile;

            if (fileExtensions.includes(filename?.split(".").pop())) {
                currentFileRef.current = editorManager.activeFile; // Set current file reference
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
            {readeState || fileContent.length == 0 ? (
                <h1>Loading...</h1>
            ) : (
                <Graph
                    json={fileContent.join("")}
                    ref={graphRef}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    layout={{
                        theme,
                        direction,
                        hideChildrenCount,
                        hideCollapseButton,
                        collapseNodes
                    }}
                />
            )}
        </div>
    );
};

export default Jsoncrack;
