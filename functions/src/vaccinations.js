import connectDb from "../connectDb.js";

export function getAllVax(req, res) {
  const db = connectDb();
  db.collection("vaccinations")
    .get()
    .then((snapshot) => {
      const vaxArray = snapshot.docs.map((doc) => {
        let vaccination = doc.data();
        vaccination.id = doc.id;
        return vaccination;
      });
      res.send(vaxArray);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function addVax(req, res) {
  if (!req.body) {
    res.status(401).send("Invalid Request");
    return;
  }
  const db = connectDb();
  db.collection("vaccinations")
    .add(req.body)
    .then((doc) => {
      res.send("New vaccination added");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//no need for other api points right now
