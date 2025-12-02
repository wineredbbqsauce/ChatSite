const { MongoClient } = require('mongodb');
const path = require('path');
require("dotenv").config({path: path.join(__dirname, "../../config/.env")});

const client = new MongoClient(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});


async function getDb() {
    if (!process.env.ATLAS_URI) throw new Error("ATLAS_URI is not defined in enviroment variables");
    if (!client.topology || !client.topology.isConnected?.()) await client.connect();
    return client.db("chatsitedb");
}

module.exports = { getDb };