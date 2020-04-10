const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

// dbUser & pass ata always hide . 
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });


//get data from database


// services from doctorsPortal database

app.get("/services", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((error) => {
    const collection = client.db("doctorsPortal").collection("services");
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        console.log(error)
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });
    client.close();
  });
});

//post data to database


app.post("/bookAppointment", (req, res) => {
  const appointmentDetails = req.body;
  appointmentDetails.bookingDate = new Date();
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((error) => {
    const collection = client.db("doctorsPortal").collection("appointments");
    collection.insertOne(appointmentDetails, (err, result) => {
      if (err) {
        console.log(err);
        console.log(error)
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});


const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listening to port 4200'));

