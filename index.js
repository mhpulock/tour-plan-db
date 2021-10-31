const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//user: mongodbuser1
//pass: LJzKLfp6DUmrawIt
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vljcn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('tourPlan');
        const servicesCollection = database.collection('services');

        //get api
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        //post api
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the api', service);


            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log('hiting the database');
//     client.close();
// });


app.get('/', (req, res) => {
    res.send('tour plan db');
});

app.listen(port, () => {
    console.log('tour plan port', port);
})