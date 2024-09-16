const { exec } = require("child_process");
const path = require("path");

module.exports = (env, options) => {
    const { mode = "development" } = options;
    const rules = [
        { test: /\.worker\.js$/, use: { loader: "worker-loader" } },
        {
            test: /\.m?js(x)?$/, // Handle both .js and .jsx files
            exclude: /node_modules/, // Exclude node_modules to avoid transpiling dependencies
            use: [
                "html-tag-js/jsx/tag-loader.js",
                {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"] // Ensure React preset is used
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            use: [
                "style-loader", // injects CSS into the DOM
                "css-loader", // resolves @import and url() in CSS
                "postcss-loader" // processes the CSS with PostCSS (Tailwind)
            ]
        }
    ];

    const main = {
        mode,
        entry: {
            main: "./src/main.js"
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            chunkFilename: "[name].js"
        },
        module: {
            rules
        },
        resolve: {
            extensions: [".js", ".jsx"] // Allow importing without specifying the file extension
        },
        plugins: [
            {
                apply: compiler => {
                    compiler.hooks.afterDone.tap("pack-zip", () => {
                        exec(
                            "node .vscode/pack-zip.js",
                            (err, stdout, stderr) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                console.log(stdout);
                            }
                        );
                    });
                }
            }
        ]
    };

    return [main];
};
