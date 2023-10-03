import admin from "firebase-admin";

// must use require for json import typing
const serviceAccount = require("../config/service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-2bbe6-default-rtdb.firebaseio.com",
});

export { admin };