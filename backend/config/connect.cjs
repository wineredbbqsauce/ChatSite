const { MongoClient } = require("mongodb")
require("dotenv").config({path:"./config.env"})

async function main() {
    
    console.log("DEBUG: ATLAS_URI set?", !!process.env.ATLAS_URI)
    console.log("DEBUG: ATLAS_URI value:", process.env.ATLAS_URI ? "yes" : "not loaded")
    
    const Db = process.env.ATLAS_URI

    if (!Db) {
        console.error("ERROR: ATLAS_URI is not set. Check ./config.env")
        return
    }

    const client = new MongoClient(Db)

    try {
        await client.connect()
        console.log("Connected to MongoDB")
        const collections = await client.db("chatsitdb").collections()
        collections.forEach((collection) => console.log(collection.s.namespace.collection))

        // You can add database operations here
    } catch(e) {
        console.error("Connection error:", e.message)
        console.error("Full error:", e)
    } finally {
        await client.close()
    }

}

main()