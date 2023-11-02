import van from "vanjs-core";

const { canvas, div } = van.tags;

export const Converter = () => {
  return div(
    {
      class: "converter",
    },
    canvas({}),
  );
};
