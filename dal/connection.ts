import {Db, MongoClient, ServerApiVersion} from "mongodb"

// console.log(process.env)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
if (!process.env.MONGO_URI) {
    throw new Error('Mongo URI undefined')
}
const client: MongoClient = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const establishDBConnection = async (): Promise<Db> => {
    try {
        await client.connect();
        await client.db(process.env.DATABASE_NAME).command({ ping: 1 });
        return client.db(process.env.DATABASE_NAME);
    } catch (error: any) {
        console.error(`Error connecting to DB: ${error.stack}`);
        throw error;
    }
};