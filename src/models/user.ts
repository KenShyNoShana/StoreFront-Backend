import client from "../database";
import bcrypt from "bcrypt";

const { PEPPER, SALTROUNDS } = process.env;

interface User {
    id?: number,
    firstname: string,
    lastname: string,
    username: string,
    password: string
}

async function index(): Promise<User[]>
{
    try{
        const connection = await client.connect();
        const result = await connection.query("SELECT * FROM users");

        await connection.release();
        return result.rows;
    }

    catch(err)
    {
        throw err;
    }
}

async function create(obj: User): Promise<User> {
    try{
        const connection = await client.connect();
        const password = bcrypt.hashSync(obj.password + PEPPER, parseInt(SALTROUNDS as unknown as string))
        const newUser = await connection.query("INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *", [obj.firstname, obj.lastname, obj.username, password]);

        connection.release();
        return newUser.rows[0];
    }

    catch(err)
    {
        throw err;
    }
}

async function show(id: number): Promise<User>{
    try{
        const connection = await client.connect();
        const user = await connection.query("SELECT * FROM users WHERE id=$1", [id]);

        connection.release();
        return user.rows[0];
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteUser(id: number): Promise<User>{
    try{
        const connection = await client.connect();
        const user = await connection.query("DELETE FROM users WHERE id = $1", [id]);

        connection.release();
        return user.rows;
    }

    catch(err)
    {
        throw err;
    }
}

async function authenticate(username: string, password: string): Promise<User | null>
{
    try{
        const connection = await client.connect();
        const user = await connection.query("SELECT * FROM users WHERE username = $1", [username]);

        connection.release();

        if(user.rows.length > 0)
        {
            if(bcrypt.compareSync(password + PEPPER, user.rows[0].password))
            {
                return user.rows[0];
            }
        }

        return null;
    }

    catch(err)
    {
        throw `error in authenticate: ${err}`;
    }
}

export default {index, create, show, deleteUser, authenticate};