import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DIST_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env

let client: any;

if(ENV === "dist")
{
    client = new Pool({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        host: POSTGRES_HOST,
        database: POSTGRES_DIST_DB
    });
}

if(ENV === "test")
{
    client = new Pool({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB
    });
}

export default client;