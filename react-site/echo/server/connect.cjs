const { MongoClient } = require("mongodb")
require("dotenv").config({path:"./config.env"})

async function main() {
    
    const Db = process.env.ATLAS_URI

    const client = new MongoClient(Db)

    try {
    await client.connect()
    console.log("Connected to MongoDB")
    const collections = await client.db("chatsitdb").collections()
    collections.forEach((collection) => console.log(collection.s.namespace.collection))

    // You can add database operations here
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }

}

main()