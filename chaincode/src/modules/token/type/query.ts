export interface QueryGenericPayload {
  selector: {
    [k: string]: unknown;
  };
  bookmark?: string;
  pageSize?: number;
}