import client from "../database";

interface Order {
    user_id: number,
    order_status: string
}

interface Order_Products {
    product_id: number,
    quantity: number,
    order_id: number
}

async function getAllOrders(): Promise<Order[]>
{
    try{
        const connection = await client.connect();
        const orders = await connection.query("SELECT * FROM orders");
        connection.release();

        return orders.rows;
    }

    catch(err)
    {
        throw err;
    }
}

async function getAllOrderProducts(): Promise<Order_Products[]>
{
    try{
        const connection = await client.connect();
        const orders = await connection.query("SELECT * FROM order_products");
        connection.release();

        return orders.rows;
    }

    catch(err)
    {
        throw err;
    }
}

async function createOrder(obj: Order): Promise<Order | String>
{
    try{
        const connection = await client.connect();
        const user = await connection.query("SELECT * FROM users WHERE id = $1", [obj.user_id]);

        if(user.rowCount === 0)
        {
            return `user at id ${obj.user_id} does not exist`;
        }

        const order = await connection.query(`INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *`, [obj.user_id, obj.order_status]);
        return order;
    }
    catch(err)
    {
        throw err;
    }
}

async function addProductToOrder(obj: Order_Products): Promise<Order_Products | String>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("SELECT * FROM orders WHERE id = $1", [obj.order_id]);
        const prod = await connection.query("SELECT * FROM products WHERE id = $1", [obj.product_id]);

        if(order.rowCount === 0)
        {
            return `order at id ${obj.order_id} does not exist`;
        }

        if(prod.rowCount === 0)
        {
            return `product at id ${obj.product_id} does not exist`;
        }

        const orders = await connection.query("INSERT INTO order_products (product_id, quantity, order_id) VALUES ($1, $2, $3) RETURNING *",
                                            [obj.product_id, obj.quantity, obj.order_id]);
        connection.release();

        return orders;
    }

    catch(err)
    {
        throw err;
    }
}

async function getOrder(id: number): Promise<Order>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("SELECT * FROM orders WHERE id = $1", [id]);
        connection.release();

        return order.rows[0];
    }

    catch(err)
    {
        throw err;
    }
}

async function getOrderByUserId(id: number): Promise<Order | String>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("SELECT * FROM orders WHERE user_id = $1 AND order_status = 'active'", [id]);

        if(order.rowCount === 0)
        {
            return `This user currently has no active orders`;
        }

        connection.release();

        return order.rows;
    }

    catch(err)
    {
        throw err;
    }
}

async function getOrderProducts(id: number): Promise<Order>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("SELECT * FROM order_products WHERE order_id = $1", [id]);
        connection.release();

        return order.rows;
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteOrder(id: number): Promise<Order>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("DELETE FROM orders WHERE id = $1", [id]);
        connection.release();

        return order.command;
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteOrderProductById(id: number, prod_id: number): Promise<Order>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("DELETE FROM order_products WHERE order_id = $1 AND product_id = $2", [id, prod_id]);
        connection.release();

        return order.command;
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteOrderProducts(id: number): Promise<Order>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("DELETE FROM order_products WHERE order_id IN ($1)", [id]);
        connection.release();

        return order.command;
    }

    catch(err)
    {
        throw err;
    }
}

async function getActiveOrderByUserId(id: number): Promise<Order | String>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("SELECT * FROM orders WHERE user_id = $1 AND order_status = 'active'", [id]);
        connection.release();

        if(order.rowCount === 0)
        {
            return "This user currently has no active orders";
        }

        return order.rows[0];
    }

    catch(err)
    {
        throw err;
    }
}

async function getCompleteOrderByUserId(id: number): Promise<Order | String>
{
    try{
        const connection = await client.connect();
        const order = await connection.query("SELECT * FROM orders WHERE user_id = $1 AND order_status = 'complete'", [id]);
        connection.release();

        if(order.rowCount === 0)
        {
            return "This user currently has no complete orders";
        }

        return order.rows[0];
    }

    catch(err)
    {
        throw err;
    }
}

export default {
    getAllOrders,
    getAllOrderProducts,
    createOrder,
    addProductToOrder,
    getOrder,
    getOrderByUserId,
    getOrderProducts,
    deleteOrder,
    deleteOrderProductById,
    deleteOrderProducts,
    getActiveOrderByUserId,
    getCompleteOrderByUserId
};