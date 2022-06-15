import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  updateMed,
  getAllMeds,
  deleteMed,
  addMed,
  getMedById,
  getMedByName,
} from "./src/medications.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/medications", getAllMeds);
app.get("/medications/:medicationId", getMedById);
app.get("/medications/:medicationName", getMedByName);
app.post("/medications", addMed);
app.patch("/medications/:medicationId", updateMed);
app.delete("/medications/:medicationId", deleteMed);

export const api = functions.https.onRequest(app);

// app.listen(5555, () => {
//   console.log(`Listening on 5555`);
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
