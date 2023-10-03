import admin from "firebase-admin";
import serviceAccount from "../config/service-account-key.json";

console.log("Initializing Firebase Admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });

  console.log("Firebase Admin initialized");
} else {
  console.log("Firebase Admin already initialized");
}

export { admin };
