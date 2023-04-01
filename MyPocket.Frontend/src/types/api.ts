export interface AddOrUpdateResult<T> {
  new: boolean;
  error: boolean;
  message: string;
  entity: T;
}
