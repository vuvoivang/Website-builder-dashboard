import { ILoginResponseData } from "../../domain/auth";

export interface StoreState {
  auth: ILoginResponseData;
}
