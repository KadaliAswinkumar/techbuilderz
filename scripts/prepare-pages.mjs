import { copyFile, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const clientDir = path.resolve("dist/client");
const assetsDir = path.join(clientDir, "assets");

const entries = await readdir(assetsDir);
const jsFiles = entries.filter((file) => /^index-.*\.js$/.test(file)).sort();
const cssFiles = entries.filter((file) => /^styles-.*\.css$/.test(file)).sort();

if (!jsFiles.length) {
  throw new Error("Could not find built JS entry in dist/client/assets.");
}

let jsEntry = jsFiles[0];

for (const file of jsFiles) {
  const source = await readFile(path.join(assetsDir, file), "utf8");
  if (source.startsWith("import") || source.includes("from\"./index-") || source.includes('from"./index-')) {
    jsEntry = file;
    break;
  }
}

const cssTag = cssFiles[0] ? `\n    <link rel="stylesheet" href="./assets/${cssFiles[0]}" />` : "";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />${cssTag}
    <title>TecH BuilderZ</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./assets/${jsEntry}"></script>
  </body>
</html>
`;

await writeFile(path.join(clientDir, "index.html"), html, "utf8");
await copyFile(path.join(clientDir, "index.html"), path.join(clientDir, "404.html"));
