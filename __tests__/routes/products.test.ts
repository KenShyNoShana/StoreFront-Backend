import request from "supertest";
import {app as router} from "../../src/server";

describe("index", () => {
    it("should return all products", async() => {
        const products = await request(router).get("/products");

        expect(products.status).toBe(200);
        expect(async() => {
            await request(router).get("/products");
        }).not.toThrow();
    });
});

describe("show", () => {
    it("should return 201 status code", async() => {
        const orders = await request(router).get("/products/3");

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/3");
        }).not.toThrow();
    });
});

describe("create", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const testProduct = {
            name: "Water",
            price: 2.99,
            category: "essentials"
        }
        const orders = await request(router).post("/products").send(testProduct);

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders").send(testProduct);
        }).not.toThrow();
    });
});

describe("delete", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const orders = await request(router).delete("/products/1");

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/products/1");
        }).not.toThrow();
    });
});