import React, { useState, useEffect, useRef } from "react";

import Jsoncrack from "./components/Jsoncrack";
import { fileExtensions, jsonIcon } from "./constants";
import DropDown from "./components/Dropdown";

const fs = acode.require("fsOperation");

const App = ({ $page }) => {
    const [pageState, setPageState] = useState({
        theme: "light",
        direction: "DOWN",
        collapseNodes: true,
        compactNodes: false,
        hideCollapseButton: false,
        hideChildrenCount: false,
        disableImagePreview: false
    });

    const [activeFile, setActiveFile] = useState({});
    const graphRef = useRef();

    const toggleViewBtn = tag("span", {
        className: "icon json-icon",
        action: "toggle-json-graph",
        attr: {
            action: "toggle-json-graph"
        },
        onclick: () => $page.show(),
        oncontextmenu() {
            alert("oncontextmenu");
        }
    });

    const toggleBtnToView = {
        show: () => (toggleViewBtn.style.display = "block"),
        hide: () => (toggleViewBtn.style.display = "none")
    };

    toggleViewBtn.innerHTML = jsonIcon;
    toggleViewBtn.style = `
    width:17px;
    height:17px;
    display:none;
    font-size:18px;
    `;

    useEffect(() => {
        // Access the header element
        const header = root.get("header");

        // Append your custom toggle view button
        header.insertBefore(
            toggleViewBtn,
            header.querySelector(".text.sub-text").nextSibling
        );

        // Render DropDown component
        const dropDownElement = DropDown({
            $page,
            pageState,
            handlePageState,
            graphRef
        });
        $page.header.append(dropDownElement);

        // Cleanup function
        return () => {
            // Remove the dropdown element
            $page.header.removeChild(dropDownElement);
        };
    }, []);

    const handlePageState = newPageState => {
        setPageState({
            ...newPageState
        });
    };

    useEffect(() => {
        const handleSwitchFile = async () => {
            const { filename, uri } = editorManager.activeFile;
            
            const isFileExist = await fs(uri).exists();
            if (
                isFileExist &&
                fileExtensions.includes(filename?.split(".").pop())
            ) {
                setActiveFile({
                    filename,
                    uri
                });
                toggleBtnToView.show();
            } else {
                toggleBtnToView.hide();
            }
        };

        handleSwitchFile();

        editorManager.on("switch-file", handleSwitchFile);

        return () => {
            editorManager.off("switch-file", handleSwitchFile);
        };
    }, []);

    return (
        activeFile.filename && (
            <Jsoncrack
                graphRef={graphRef}
                options={pageState}
                fileName={activeFile.filename}
                uri={activeFile.uri}
            />
        )
    );
};

export default App;
