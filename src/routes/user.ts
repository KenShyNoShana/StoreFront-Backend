import express, { Request, Response } from "express";
import controller from "../models/user";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../utils/verifyAuthToken";

interface Auth {
    username: string,
    password: string
}

const { TOKEN_SECRET } = process.env;

async function index(req: Request, res: Response)
{
    try{
        const users = await controller.index();
        res.status(200).send(users);
    }

    catch(err)
    {
        throw err;
    }
}

async function create(req: Request, res: Response)
{
    try{
        const {firstname, lastname, username, password} = req.body;
        const user = await controller.create({firstname, lastname, username, password});
        const jwtToken = jwt.sign({user: user}, TOKEN_SECRET as string);
        res.status(201).send(`User was created successfully, token: ${jwtToken}`);
    }

    catch(err)
    {
        throw err;
    }
}

async function show(req: Request, res: Response): Promise<Response>
{
    try{
        const { id } = req.params;
        const user = await controller.show(parseInt(id));
        return res.status(200).send(user);
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteUser(req: Request, res: Response): Promise<Response>
{
    try{
        const { id } = req.params;
        await controller.deleteUser(parseInt(id));
        return res.status(202).send("user was successfully deleted");
    }

    catch(err)
    {
        throw err;
    }
}

async function authenticateUser(req: Request, res: Response)
{
    const user: Auth = {
        username: req.body.username,
        password: req.body.password
    }

    try{
        const actualUser = await controller.authenticate(user.username, user.password);
        if(actualUser !== null)
        {
            const jwtToken = jwt.sign({user: actualUser}, TOKEN_SECRET as string);
            return res.status(200).send(jwtToken);
        }
        else
        {
            res.status(401).send("Your username or password is wrong");
        }
    }

    catch(err)
    {
        throw err;
    }
}

function userRouter(app: express.Application)
{
    app.get("/", verifyAuthToken, index);
    app.post("/", create);
    app.get("/:id", verifyAuthToken, show);
    app.delete("/:id", verifyAuthToken, deleteUser);
    app.post("/auth", authenticateUser);
}

export default userRouter;