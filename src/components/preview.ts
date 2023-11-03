import van from "vanjs-core";

import { appState } from "utils/state";
import { previewImageId } from "utils/constants";

const { div, img } = van.tags;

export const Preview = () => {
  return div(
    {
      class: "preview",
    },
    () =>
      div(
        appState.readerResult.val
          ? img({
              id: previewImageId,
              src: appState.readerResult.val ?? "",
              alt: "Preview",
            })
          : div("Please upload an image to get a preview"),
      ),
  );
};
