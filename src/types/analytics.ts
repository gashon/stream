import { admin } from "@/lib/firebase-admin";
import { Resource } from "@/types";

export type UserAnalytic = {
  user_id: string;
  views: number | admin.firestore.FieldValue;
  ua: string;
  ip: string;
  is_editor: boolean;
} & Resource;

export type AnalyticsGetResponse = {
  data: UserAnalytic[];
};
