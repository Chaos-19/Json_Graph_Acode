# JSON to Graph Visualizer Plugin for Acode

**JSON to Graph Visualizer** is a plugin for Acode that allows you to visualize JSON data as an interactive graph. This tool is especially useful for developers who want to quickly understand complex JSON structures by exploring them in a graphical format.

## Features

- **Interactive JSON Visualization**: Converts JSON files into a graphical representation, making it easier to navigate and understand nested structures.
- **JSON Visualization Toggle**: A toggle button will appear in the editor when a JSON file is active, allowing you to visualize the file’s structure.
- **Customizable Graph Options**: Change the theme, direction, and control over child nodes or collapse buttons for better readability.

## How to Use

1. **Open a JSON file**: Once you have a JSON file open in Acode, you will see the **JSON Visualization Toggle** button appear.
2. **Click the Toggle Button**: Clicking the button will open the JSON visualization in a new page, allowing you to interact with the data graphically.
3. **Explore the Graph**: You can zoom in and out, collapse nodes, and explore the hierarchical structure of your JSON data with ease.

## Installation

1. Open the **Acode Plugin Market**.
2. Search for **JSON to Graph Visualizer**.
3. Install and activate the plugin.
4. Open any JSON file in the Acode editor, and the **JSON Visualization Toggle** button will appear when the file is active.

## Built With

- **React**: The plugin is built using the React Acode template.
- **jsongraph-react**: It leverages the [jsongraph-react](https://github.com/karolkrupa/jsongraph-react) library to render the JSON data as a graph. Special acknowledgment to **jsongraph-react** for providing the foundation for visualizing JSON structures.

## Customization

You can pass options to customize the graph layout:

- **Theme**: Change the graph’s theme (light/dark).
- **Direction**: Control the layout direction (e.g., left-to-right or top-down).
- **Hide Children Count**: Toggle whether to show or hide the number of child nodes.
- **Hide Collapse Button**: Enable or disable the collapse button for child nodes.

## Example

Once a JSON file is open, click the **JSON Visualization Toggle** button to launch the visualization page. You'll then be able to navigate and explore your JSON data as an interactive graph.

## Contribution

Feel free to contribute by submitting pull requests or reporting any issues via the GitHub repository.