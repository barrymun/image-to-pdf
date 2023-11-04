import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { Converter } from "components/converter";
import { Preview } from "components/preview";
import { Uploader } from "components/uploader";

import "assets/css/base.css";
import "assets/css/style.css";
import "assets/css/uploader.css";
import "assets/css/preview.css";
import "assets/css/converter.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, ForkMe());
van.add(dom, Uploader());
van.add(dom, Preview());
van.add(dom, Converter());

const handleLoad = () => {
  // do something on load
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
