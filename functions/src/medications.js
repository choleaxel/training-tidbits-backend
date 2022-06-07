import connectDb from "../connectDb.js";

export function getAllMeds(req, res) {
  const db = connectDb();
  db.collection("medications")
    .get()
    .then((snapshot) => {
      const medsArray = snapshot.docs.map((doc) => {
        let medication = doc.data();
        medication.id = doc.id;
        return medication;
      });
      res.send(medsArray);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function addMed(req, res) {
  if (!req.body) {
    res.status(401).send("Invalid Request");
    return;
  }
  const db = connectDb();
  db.collection("medications")
    .add(req.body)
    .then((doc) => {
      res.send("New medication added");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function updateMed(req, res) {
  if (!req.params || !req.params.medicationId || !req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const { medicationId } = req.params;
  const db = connectDb();
  db.collection("medications")
    .doc(medicationId)
    .update(req.body)
    .then(() => {
      res.send("Medication updated.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function getMedById(req, res) {
  const { medicationId } = req.params;
  if (!medicationId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("medications")
    .doc(medicationId)
    .get()
    .then((doc) => {
      let medication = doc.data();
      medication.id = doc.id;
      res.send(medication);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function getMedByName(req, res) {
  const { medicationName } = req.params;
  if (!medicationName) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("medications")
    .where("name", "==", medicationName)
    .get()
    .then((snapshot) => {
      const medications = snapshot.docs.map((doc) => {
        let medication = doc.data();
        medication.id = doc.id;
        return medication;
      });

      res.send(medications);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
}

// export const getMedByName = async (req, res) => {
//   const db = connectDb();
//   try {
//     const col = await db.collection("medications").get();
//     const medication = await medication.name;
//     return medication;
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

export function deleteMed(req, res) {
  const { medicationId } = req.params;
  if (!medicationId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("medications")
    .doc(medicationId)
    .delete()
    .then(() => {
      res.send("Medication deleted");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
