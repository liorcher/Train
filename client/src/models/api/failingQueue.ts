export interface FailedQueueItem {
  resolve: (value: string | PromiseLike<string>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
}
