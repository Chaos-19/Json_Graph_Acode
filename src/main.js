import plugin from "../plugin.json";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import TailwindCSS
import PageContextProvider from "./PageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App";

class AcodePlugin {
    async init($page, cacheFile, cacheFileUrl) {
        // Create a container for your React app
        let rootDiv = document.createElement("div");
        rootDiv.id = "react-root";
        $page.append(rootDiv);

        // Create a React root and render the app
        const root = ReactDOM.createRoot(rootDiv);
        root.render(
            <ErrorBoundary>
                <App $page={$page} />
            </ErrorBoundary>
        );

        editorManager.editor.commands.addCommand({
            name: "react-acode",
            discription: "react acode interface",
            bindKey: {
                win: "Ctrl-m"
            },
            exec: () => $page.show()
        });
        editorManager.editor.commands.addCommand({
            name: "react-acode",
            discription: "react acode interface",
            bindKey: {
                win: "Ctrl-Shift-r"
            },
            exec: () => $page.show()
        });
    }

    async destroy() {
        const rootDiv = document.getElementById("react-root");
        if (rootDiv) {
            ReactDOM.createRoot(rootDiv).unmount(); // Use createRoot for unmounting
        }
        const header = root.get("header");
        let icon = header.get(".icon.json-icon");
        if (icon) icon.remove();
    }
}

if (window.acode) {
    const acodePlugin = new AcodePlugin();

    acode.setPluginInit(
        plugin.id,
        async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
            if (!baseUrl.endsWith("/")) {
                baseUrl += "/";
            }
            acodePlugin.baseUrl = baseUrl;
            await acodePlugin.init($page, cacheFile, cacheFileUrl);
        }
    );

    acode.setPluginUnmount(plugin.id, () => {
        acodePlugin.destroy();
    });
}
