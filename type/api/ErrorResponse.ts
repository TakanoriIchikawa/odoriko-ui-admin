export type ErrorResponse = {
  status: number;
  statusText: string;
  data: {
    status: string;
    message: string;
    errors: Record<string, any>;
  };
};
