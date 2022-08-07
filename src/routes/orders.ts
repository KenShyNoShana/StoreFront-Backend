import express, { Request, Response } from "express";
import controller from "../models/orders";
import verifyAuthToken from "../utils/verifyAuthToken";

async function index(req: Request, res: Response): Promise<Response>
{
    try{
        const orders = await controller.getAllOrders();
        return res.status(200).send(orders);
    }

    catch(err)
    {
        throw err;
    }
}

async function getAllOrderProducts(req: Request, res: Response): Promise<Response>
{
    try{
        const orders = await controller.getAllOrderProducts();
        return res.status(200).send(orders);
    }

    catch(err)
    {
        throw err;
    }
}

async function create(req: Request, res: Response): Promise<Response>
{
    try{
        const { user_id, order_status } = req.body;
        const order = await controller.createOrder({user_id, order_status});

        if(typeof order === "string")
        {
            return res.status(404).send(order);
        }

        return res.status(201).send(`Order was created successfully`);
    }

    catch(err)
    {
        throw err;
    }
}

async function addProductToOrder(req: Request, res: Response): Promise<Response>
{
    try{
        const { product_id, quantity, order_id} = req.body;
        const order = await controller.getOrder(parseInt(order_id));

        if(Object.keys(order).length === 0)
        {
            return res.status(404).send(`The Order with id ${order_id} does not exist`);
        }

        if(order.order_status === "complete")
        {
            return res.status(404).send("This Order has already been complete");
        }

        const addProduct = await controller.addProductToOrder({product_id, quantity, order_id});

        if(typeof addProduct === "string")
        {
            return res.status(404).send(addProduct);
        }

        return res.status(201).send(`Product was successfully added to Order`);
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
        const order = await controller.getOrder(parseInt(id));
        return res.status(200).send(order);
    }

    catch(err)
    {
        throw err;
    }
}

async function getOrderByUserId(req: Request, res: Response): Promise<Response>
{
    try{
        const { id } = req.params;
        const order = await controller.getOrderByUserId(parseInt(id));
        return res.status(200).send(order);
    }

    catch(err)
    {
        throw err;
    }
}

async function getOrderProducts(req: Request, res: Response): Promise<Response>
{
    try{
        const { id } = req.params;
        const order = await controller.getOrderProducts(parseInt(id));
        return res.status(200).send(order);
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteOrder(req: Request, res: Response): Promise<Response>
{
    try{
        const { id } = req.params;
        const order = await controller.deleteOrder(parseInt(id));
        return res.status(202).send(`Order was deleted successfully`);
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteOrderProductById(req: Request, res: Response): Promise<Response>
{
    try{
        const { id, prod_id } = req.params;
        const order = await controller.deleteOrderProductById(parseInt(id), parseInt(prod_id));
        return res.status(202).send(`Order was deleted successfully`);
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteOrderProducts(req: Request, res: Response): Promise<Response>
{
    try{
        const { id } = req.params;
        const order = await controller.deleteOrderProducts(parseInt(id));
        return res.status(202).send(`Order was deleted successfully`);
    }

    catch(err)
    {
        throw err;
    }
}

async function getActiveOrderByUserId(req: Request, res: Response): Promise<Response>
{
    try{
        const { id } = req.params;
        const order = await controller.getActiveOrderByUserId(parseInt(id));
        return res.status(200).send(order);
    }

    catch(err)
    {
        throw err;
    }
}

async function getCompleteOrderByUserId(req: Request, res: Response): Promise<Response>
{
    try{
        const { id } = req.params;
        const order = await controller.getCompleteOrderByUserId(parseInt(id));
        return res.status(200).send(order);
    }

    catch(err)
    {
        throw err;
    }
}

function ordersRouter(app: express.Application)
{
    app.get("/orders", verifyAuthToken, index);
    app.get("/orders/article", verifyAuthToken, getAllOrderProducts);
    app.get("/orders/:id", verifyAuthToken, show);
    app.get("/orders/article/:id", verifyAuthToken, getOrderProducts);
    app.get("/orders/user/:id", verifyAuthToken, getOrderByUserId);
    app.post("/orders", verifyAuthToken, create);
    app.post("/orders/article", verifyAuthToken, addProductToOrder);
    app.delete("/orders/:id", verifyAuthToken, deleteOrder);
    app.delete("/orders/article/:id/:prod_id", verifyAuthToken, deleteOrderProductById);
    app.delete("/orders/article/:id", verifyAuthToken, deleteOrderProducts);
    app.get("/orders/active/:id", verifyAuthToken, getActiveOrderByUserId);
    app.get("/orders/complete/:id", verifyAuthToken, getCompleteOrderByUserId);
}

export default ordersRouter;