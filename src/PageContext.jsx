import React, { useState, createContext } from "react";

export const PageContext = createContext();

const PageContextProvider = ({ children }) => {
  
    const [pageState, setPageState] = useState({
        theme: "light",
        direction: "DOWN",
        collapseNodes: false,
        compactNodes: false,
        hideCollapseButton: false,
        hideChildrenCount: false,
        disableImagePreview: false
    });

    return (
        <PageContext.Provider value={{ pageState, setPageState }}>
            {children}
        </PageContext.Provider>
    );
};

export default PageContextProvider;
