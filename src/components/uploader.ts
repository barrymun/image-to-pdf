// import pluralize from "pluralize";
import van from "vanjs-core";

import { uploaderInputId } from "utils/constants";
import { appState } from "utils/state";

const { div, input, label } = van.tags;

export const Uploader = () => {
  const handleChange = (_event: Event) => {
    const input = document.getElementById(uploaderInputId)! as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) {
      appState.readerResult.val = undefined;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      appState.readerResult.val = reader.result as string;
    };
    reader.readAsDataURL(files[0]);
  };

  return div(
    {
      class: "uploader",
    },
    label(
      {
        for: uploaderInputId,
      },
      "Upload image",
    ),
    input({
      id: uploaderInputId,
      type: "file",
      multiple: false,
      accept: "image/*",
      onchange: handleChange,
    }),
    // span(
    //   () =>
    //     `${
    //       (appState.uploadedFiles.val ?? []).length > 0 ? (appState.uploadedFiles.val ?? []).length.toString() : "No"
    //     } ${pluralize("file", (appState.uploadedFiles.val ?? []).length)} chosen`,
    // ),
  );
};
