import request from "supertest";
import {app as router} from "../../src/server";

describe("index", () => {
    it("should return all orders", async() => {
        const orders = await request(router).get("/orders");

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders");
        }).not.toThrow();
    });
});

describe("getAllOrderProducts", () => {
    it("should return all order-products", async() => {
        const orders = await request(router).get("/orders/article");

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/article");
        }).not.toThrow();
    });
});

describe("show", () => {
    it("should return 200 status code", async() => {
        const orders = await request(router).get("/orders/3");

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/3");
        }).not.toThrow();
    });
});

describe("getOrderByUserId", () => {
    it("should return 200 status code", async() => {
        const orders = await request(router).get("/orders/article/3");

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/article/3");
        }).not.toThrow();
    });
});

describe("getOrderProducts", () => {
    it("should return 200 status code", async() => {
        const orders = await request(router).get("/orders/article/1");

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/article/1");
        }).not.toThrow();
    });
});

describe("create", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const testOrder = {
            user_id: 3,
            order_status: "active"
        };
        const orders = await request(router).post("/orders").send(testOrder);

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders").send(testOrder);
        }).not.toThrow();
    });
});

describe("addProductToOrder", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const testOrder = {
            product_id: 2,
            quantity: 4,
            order_id: 2
        };
        const orders = await request(router).post("/orders/article").send(testOrder);

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/article").send(testOrder);
        }).not.toThrow();
    });
});

describe("delete", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const orders = await request(router).delete("/orders/1");

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/1");
        }).not.toThrow();
    });
});

describe("deleteOrderProductById", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const orders = await request(router).delete("/orders/article/1/3");

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/article/1/3");
        }).not.toThrow();
    });
});

describe("deleteOrderProducts", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const orders = await request(router).delete("/orders/article/1");

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/article/1");
        }).not.toThrow();
    });
});

describe("getActiveOrderById", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const order = await request(router).get("/orders/active/2");

        expect(order.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/active/2");
        }).not.toThrow();
    });
});

describe("getCompleteOrderById", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const order = await request(router).get("/orders/complete/2");

        expect(order.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/complete/2");
        }).not.toThrow();
    });
});