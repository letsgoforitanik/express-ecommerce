import { MongoClient, Db } from "mongodb";

let db: Db;

export default async function getDb() {
    if (!db) {
        const connectionString = "mongodb://127.0.0.1:27017";
        const client = await MongoClient.connect(connectionString);
        db = client.db("shop");
    }

    return db;
}
