import express, { Request, Response } from "express";
import controller from "../models/products";
import verifyAuthToken from "../utils/verifyAuthToken";

async function index(req: Request, res: Response): Promise<Response>
{
    try{
        const products = await controller.getProducts();
        return res.status(200).send(products);
    }

    catch(err)
    {
        throw err;
    }
}

async function create(req: Request, res: Response): Promise<Response>
{
    try{
        const { name, price, category} = req.body;
        if(!name || !price || !category)
        {
            return res.send("Please provide name, price and category");
        }
        const product = await controller.createProduct({name, price, category });
        return res.status(201).send(`successfully created new product`);
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
        const product = await controller.showProduct(parseInt(id as unknown as string));
        return res.status(200).send(product);
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteProduct(req: Request, res: Response): Promise<Response>
{
    try{
        const { id }= req.params;
        const product = await controller.deleteProduct(parseInt(id as unknown as string));
        return res.status(202).send(`successfully deleted product`);
    }

    catch(err)
    {
        throw err;
    }
}

function productsRouter(app: express.Application)
{
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", verifyAuthToken, create);
    app.delete("/products/:id", verifyAuthToken, deleteProduct);
}

export default productsRouter;