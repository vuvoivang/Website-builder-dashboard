export interface Storage {
  get(keys: string[]): Promise<object | null>;
  set(data: object): Promise<boolean>;
  remove(keys: string[]): Promise<boolean>;
  clear(): Promise<boolean>;
}
