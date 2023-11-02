import van from "vanjs-core";

import { AppState } from "utils/types";

export const appState: AppState = {
  readerResult: van.state<string | undefined>(undefined),
};
