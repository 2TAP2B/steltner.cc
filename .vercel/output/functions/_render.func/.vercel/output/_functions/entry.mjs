import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BhPynGxE.mjs';
import { manifest } from './manifest_DB3wJyjd.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/contact.astro.mjs');
const _page2 = () => import('./pages/imprint.astro.mjs');
const _page3 = () => import('./pages/privacy.astro.mjs');
const _page4 = () => import('./pages/thank-you.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/contact.ts", _page1],
    ["src/pages/imprint.md", _page2],
    ["src/pages/privacy.md", _page3],
    ["src/pages/thank-you.astro", _page4],
    ["src/pages/index.astro", _page5]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5a8e3ad7-d6bc-48d3-8292-9fb03d586434",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
