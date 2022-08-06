import client from "../database";

export interface Product{
    name: string,
    price: number,
    category: string
}

async function createProduct(obj: Product): Promise<Product>
{
    try{
        const connection = await client.connect();
        const product = await connection.query("INSERT INTO products (name, price, category) VALUES ($1, $2, $3)", [obj.name, obj.price, obj.category]);
        connection.release();

        return product;
    }

    catch(err)
    {
        throw err;
    }
}

async function getProducts(): Promise<Product[]>
{
    try{
        const connection = await client.connect();
        const products = await connection.query("SELECT * FROM products");
        connection.release();

        return products.rows;
    }

    catch(err)
    {
        throw err;
    }
}

async function showProduct(id: number): Promise<Product>
{
    try{
        const connection = await client.connect();
        const product = await connection.query("SELECT * FROM products WHERE id = $1", [id]);
        connection.release();

        return product.rows[0];
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteProduct(id: number): Promise<Product>
{
    try{
        const connection = await client.connect();
        const product = await connection.query("DELETE FROM products WHERE id = $1", [id]);
        connection.release();

        return product;
    }

    catch(err)
    {
        throw err;
    }
}

export default {createProduct, getProducts, showProduct, deleteProduct};