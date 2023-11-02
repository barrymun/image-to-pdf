import { jsPDF } from "jspdf";
import van from "vanjs-core";

import { converterCanvasId } from "utils/constants";
import { appState } from "utils/state";

const { button, canvas, div } = van.tags;

export const Converter = () => {
  const canDownload = van.state<boolean>(false);

  const download = async () => {
    const doc = new jsPDF();

    const canvas = document.getElementById(converterCanvasId)! as HTMLCanvasElement;
    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const padding: number = 16;
    const paddedWidth: number = pdfWidth - 2 * padding;
    const paddedHeight: number = pdfHeight - 2 * padding;

    const canvasAspectRatio: number = canvas.width / canvas.height;
    const pdfAspectRatio: number = paddedWidth / paddedHeight;

    let imgWidth: number, imgHeight: number;

    if (canvasAspectRatio > pdfAspectRatio) {
      imgWidth = paddedWidth;
      imgHeight = paddedWidth / canvasAspectRatio;
    } else {
      imgHeight = paddedHeight;
      imgWidth = paddedHeight * canvasAspectRatio;
    }

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    doc.addImage({
      imageData: imgData,
      x: x,
      y: y,
      width: imgWidth,
      height: imgHeight,
      format: "PNG",
    });
    doc.save("document.pdf");
  };

  const handleConversion = async () => {
    if (!appState.readerResult.val) {
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById(converterCanvasId)! as HTMLCanvasElement;
      const ctx = canvas.getContext("2d")!;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canDownload.val = true;
    };
    img.src = appState.readerResult.val;
  };

  const clearCanvas = () => {
    canDownload.val = false;
    const canvas = document.getElementById(converterCanvasId) as HTMLCanvasElement | undefined;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  van.derive(() => {
    clearCanvas();
    if (!appState.readerResult.val) {
      return;
    }
    handleConversion();
  });

  return div(
    {
      class: "converter",
    },
    canvas({
      id: converterCanvasId,
    }),
    () =>
      button(
        {
          disabled: !canDownload.val,
          onclick: download,
        },
        "Download",
      ),
  );
};
