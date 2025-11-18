import { createHighlighterCore, createJavaScriptRegexEngine } from "shiki";

import js from "shiki/langs/javascript.mjs";
import ts from "shiki/langs/typescript.mjs";
import html from "shiki/langs/html.mjs";
import css from "shiki/langs/css.mjs";
import json from "shiki/langs/json.mjs";
import jsx from "shiki/langs/jsx.mjs";  

import theme from "shiki/themes/tokyo-night.mjs";

let highlighter = null;

export async function highlightCode(code, lang = "javascript") {
  if (!highlighter) {
    highlighter = await createHighlighterCore({
      themes: [theme],
      langs: [js, ts, html, css, json, jsx], 
      engine: createJavaScriptRegexEngine(),
    });
  }

  return highlighter.codeToHtml(code, {
    lang,
    theme: "tokyo-night",
  });
}
