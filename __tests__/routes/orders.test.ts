import request from "supertest";
import {app as router} from "../../src/server";

describe("index", () => {
    it("should return all orders", async() => {
        const testUser = {
            "firstname": "Laura",
            "lastname": "Fischer",
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const user = await request(router).post("/").send(testUser);
        const token = user.text.split(" ");

        const orders = await request(router).get("/orders").set({"authorization": token[5], 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders").set({"authorization": token[5], 'Content-Type': 'application/json'});
        }).not.toThrow();
    });
});

describe("getAllOrderProducts", () => {
    it("should return all order-products", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const orders = await request(router).get("/orders/article").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/article").set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });
});

describe("show", () => {
    it("should return 200 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const orders = await request(router).get("/orders/3").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/3").set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });
});

describe("getOrderByUserId", () => {
    it("should return 200 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const orders = await request(router).get("/orders/article/3").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/article/3").set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });
});

describe("getOrderProducts", () => {
    it("should return 200 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const orders = await request(router).get("/orders/article/1").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/article/1").set({"authorization": token.text, 'Content-Type': 'application/json'});
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

    it("should return 201 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const testOrder = {
            user_id: 3,
            order_status: "active"
        };
        const orders = await request(router).post("/orders").send(testOrder).set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(201);
        expect(async() => {
            await request(router).get("/orders").send(testOrder).set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });
});

describe("addProductToOrder", () => {
    it("should return 201 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const testOrder = {
            product_id: 2,
            quantity: 4,
            order_id: 4
        };
        const orders = await request(router).post("/orders/article").send(testOrder).set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(201);
        expect(async() => {
            await request(router).get("/orders/article").send(testOrder).set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });

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
    it("should return 202 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const orders = await request(router).delete("/orders/1").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(202);
        expect(async() => {
            await request(router).get("/orders/1").set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });

    it("should return 401 status code since no verification token is provided", async() => {
        const orders = await request(router).delete("/orders/1");

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/1");
        }).not.toThrow();
    });
});

describe("deleteOrderProductById", () => {
    it("should return 202 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const orders = await request(router).delete("/orders/article/1/3").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(202);
        expect(async() => {
            await request(router).get("/orders/article/1/3").set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });

    it("should return 401 status code since no verification token is provided", async() => {
        const orders = await request(router).delete("/orders/article/1/3");

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/article/1/3");
        }).not.toThrow();
    });
});

describe("deleteOrderProducts", () => {
    it("should return 202 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const orders = await request(router).delete("/orders/article/1").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(orders.status).toEqual(202);
        expect(async() => {
            await request(router).get("/orders/article/1").set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });

    it("should return 401 status code since no verification token is provided", async() => {
        const orders = await request(router).delete("/orders/article/1");

        expect(orders.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/article/1");
        }).not.toThrow();
    });
});

describe("getActiveOrderById", () => {
    it("should return 200 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const order = await request(router).get("/orders/active/2").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(order.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/active/2").set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });

    it("should return 401 status code since no verification token is provided", async() => {
        const order = await request(router).get("/orders/active/2");

        expect(order.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/active/2");
        }).not.toThrow();
    });
});

describe("getCompleteOrderById", () => {
    it("should return 200 status code", async() => {
        const user = {
            "username": "LauraFischer",
            "password": "LauraFischer"
        }
        const token = await request(router).post("/auth").send(user);

        const order = await request(router).get("/orders/complete/2").set({"authorization": token.text, 'Content-Type': 'application/json'});

        expect(order.status).toEqual(200);
        expect(async() => {
            await request(router).get("/orders/complete/2").set({"authorization": token.text, 'Content-Type': 'application/json'});
        }).not.toThrow();
    });

    it("should return 401 status code since no verification token is provided", async() => {
        const order = await request(router).get("/orders/complete/2");

        expect(order.status).toEqual(401);
        expect(async() => {
            await request(router).get("/orders/complete/2");
        }).not.toThrow();
    });
});