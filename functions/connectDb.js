import { initializeApp } from "firebase-admin";
import { cert, getApps } from "firebase-admin/app";
import myCredentials from "./credentials.js";

export default function connectDb() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(myCredentials),
    });
  }
  return getFirestore();
}
