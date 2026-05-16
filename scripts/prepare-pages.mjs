import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const clientDir = path.resolve("dist/client");
const serverModuleUrl = `${pathToFileURL(path.resolve("dist/server/index.js")).href}?ts=${Date.now()}`;
const serverModule = await import(serverModuleUrl);
const serverEntry = serverModule.default;

if (!serverEntry || typeof serverEntry.fetch !== "function") {
  throw new Error("Could not load dist/server/index.js fetch handler.");
}

async function renderHtmlWithRedirects(startUrl) {
  let currentUrl = startUrl;

  for (let i = 0; i < 5; i += 1) {
    const response = await serverEntry.fetch(new Request(currentUrl), {}, {});

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        throw new Error(`Got redirect status ${response.status} without location header.`);
      }
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    return response;
  }

  throw new Error("Too many redirects while rendering SSR HTML.");
}

const response = await renderHtmlWithRedirects("https://example.com/");
const renderedHtml = await response.text();

if (!renderedHtml || response.status >= 400) {
  throw new Error(`Could not render SSR HTML for Pages (status: ${response.status}).`);
}

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}` : "";
const assetPrefix = `${basePath}/assets/`;

const html = renderedHtml
  .replaceAll('"/assets/', `"${assetPrefix}`)
  .replaceAll("'/assets/", `'${assetPrefix}`);

await writeFile(path.join(clientDir, "index.html"), html, "utf8");
await copyFile(path.join(clientDir, "index.html"), path.join(clientDir, "404.html"));
