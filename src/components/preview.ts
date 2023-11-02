import van from "vanjs-core";

import { appState } from "utils/state";

const { div, img } = van.tags;

export const Preview = () => {
  van.derive(() => {
    // console.log("appState.readerResult.val", appState.readerResult.val);
  });

  return div(
    {
      class: "preview",
    },
    () =>
      div(
        appState.readerResult.val
          ? img({
              src: appState.readerResult.val ?? "",
              alt: "Preview",
            })
          : div("No image to preview"),
      ),
  );
};
