import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  updateMed,
  getAllMeds,
  deleteMed,
  addMed,
  getMedById,
} from "./src/medications";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/medications", getAllMeds);
app.get("/medications/:medicationId", getMedById);
app.post("/medications", addMed);
app.patch("/medications/:medicationId", updateMed);
app.delete("/medications/:medicationId", deleteMed);

export const api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
