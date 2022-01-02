const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jvd1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("job_portal").collection("user");
  // perform actions on the collection object
  app.post('/api/register', (req, res) => {
      const data = req.body;
      collection.insertOne(data)
      .then(result => {
          res.send(result.insertCount > 0);
      })
  })
  app.get('/api/user', (req, res) => {
      collection.find({})
      .toArray((err, documents) => {
          res.send(documents);
      })
  })
});

app.get('/', (req, res) =>{
    res.send('working...');
})

app.listen(process.env.PORT || port);