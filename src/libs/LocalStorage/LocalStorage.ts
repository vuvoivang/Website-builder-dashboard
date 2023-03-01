import { Storage } from "~/src/adapters/storage.helper";
import { ReverseMap } from "~/src/utils";

export enum LocalCacheKey {}
// userInfo = "userInfo", EXAMPLE

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LocalCacheValues {
  // [LocalCacheKey.userInfo]: UserInfo;
}
type LocalCacheKeysType = ReverseMap<typeof LocalCacheKey>;

async function get(
  keys: LocalCacheKeysType[]
): Promise<Partial<LocalCacheValues>> {
  return new Promise((resolve) => {
    const data = {} as LocalCacheValues;
    keys?.forEach((key) => {
      if (localStorage.getItem(key))
        data[key] = JSON.parse(localStorage.getItem(key) as string);
    });
    resolve(data);
  });
}

async function set(data: Partial<LocalCacheValues>): Promise<boolean> {
  return new Promise((resolve) => {
    if (Object.keys(data)?.length > 0) {
      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(data[key]));
      });
    }
    resolve(true);
  });
}

async function remove(keys: LocalCacheKeysType[]): Promise<boolean> {
  return new Promise((resolve) => {
    keys?.map((key) => localStorage.removeItem(key));
    resolve(true);
  });
}

async function clear(): Promise<boolean> {
  return new Promise((resolve) => {
    localStorage.clear();
    resolve(true);
  });
}

const LocalStorage: Storage = {
  get,
  set,
  remove,
  clear,
};

export default LocalStorage;
