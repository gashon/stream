// shared fields across all resources

export type Resource = {
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
};

export type ErrorMessage = {
  error: string;
};
