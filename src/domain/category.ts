import { StateStatus } from "~/src/constant";

export interface Category {
  id: number;
  key: string;
  name: string;
  index: number;
  state: StateStatus;
}
