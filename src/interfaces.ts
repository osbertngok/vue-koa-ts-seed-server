export interface IStartAsync {
  start(port?: number): Promise<void>;
}

export interface IEnable {
  enable(): void;
  disable(): void;
}
