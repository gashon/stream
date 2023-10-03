// shared fields across all resources
import { FieldValue } from "@google-cloud/firestore";

export type Resource = {
  created_at: FieldValue;
  updated_at: FieldValue;
  deleted_at: FieldValue | null;
};
