import controller from "../../src/models/orders";

describe("getAllOrders", () => {
    it("should return all orders", async () => {
        const orders = await controller.getAllOrders();

        expect(orders).toBeInstanceOf(Array);
        expect(async () => {
            await controller.getAllOrders();
        }).not.toThrow();
    });
});

describe("getAllOrderProducts", () => {
    it("should return all order-products", async () => {
        const order_products = await controller.getAllOrderProducts();

        expect(order_products).toBeInstanceOf(Array);
        expect(async () => {
            await controller.getAllOrderProducts();
        }).not.toThrow();
    });
});

describe("createOrder", () => {
    it("should create an order when proper info is passed", async () => {
        const testOrder = {
            user_id: 3,
            order_status: "active"
        };
        const newOrder = await controller.createOrder(testOrder);

        expect(newOrder).toBeInstanceOf(Object);
        expect(async () => {
            await controller.createOrder(testOrder);
        }).not.toThrow();
    });

    it("should return an error message if the user-id does not exist", async () => {
        const testOrder = {
            user_id: 20,
            order_status: "active"
        };
        const newOrder = await controller.createOrder(testOrder);

        expect(newOrder).toEqual("user at id 20 does not exist");
        expect(async () => {
            await controller.createOrder(testOrder);
        }).not.toThrow();
    });

    it("should return an error message if the user-id does not exist", async () => {
        const testOrder = {
            user_id: 30,
            order_status: "active"
        };
        const newOrder = await controller.createOrder(testOrder);

        expect(newOrder).toEqual("user at id 30 does not exist");
        expect(async () => {
            await controller.createOrder(testOrder);
        }).not.toThrow();
    });
});

describe("addProductToOrder", () => {
    it("should create an order-product when proper info is passed", async () => {
        const testOrder = {
            order_id: 4,
            product_id: 2,
            quantity: 4
        }

        const newOrderProduct = await controller.addProductToOrder(testOrder);

        expect(newOrderProduct).toBeInstanceOf(Object);
        expect(async () => {
            await controller.addProductToOrder(testOrder);
        }).not.toThrow();
    });
});

describe("getOrder", () => {
    it("should return the specified order", async () => {
        const order = await controller.getOrder(2);

        expect(order).toBeInstanceOf(Object);
        expect(async () => {
            await controller.getOrder(1);
        }).not.toThrow();
    });
});

describe("getOrderByUserId", () => {
    it("should return the specified order", async () => {
        const order = await controller.getOrderByUserId(2);

        expect(order).toBeInstanceOf(Object);
        expect(async () => {
            await controller.getOrderByUserId(1);
        }).not.toThrow();
    });

    it("should return an error message if the user does not exist", async () => {
        const order = await controller.getOrderByUserId(20);

        expect(order).toEqual(`This user currently has no active orders`);
        expect(async () => {
            await controller.getOrderByUserId(20);
        }).not.toThrow();
    });
});

describe("getOrderProducts", () => {
    it("should return the specified order-products", async () => {
        const order = await controller.getOrderProducts(2);

        expect(order).toBeInstanceOf(Object);
        expect(async () => {
            await controller.getOrderProducts(1);
        }).not.toThrow();
    });
});

describe("deleteOrder", () => {
    it("should delete the specific order", async () => {
        const order = await controller.deleteOrder(1);

        expect(order).toEqual("DELETE");
        expect(async () => {
            await controller.deleteOrder(3);
        }).not.toThrow();
    });
});

describe("deleteOrderProductById", () => {
    it("should delete the specific order", async () => {
        const order = await controller.deleteOrderProductById(1, 2);

        expect(order).toEqual("DELETE");
        expect(async () => {
            await controller.deleteOrderProductById(4, 1);
        }).not.toThrow();
    });
});

describe("deleteOrderProducts", () => {
    it("should delete the specific order", async () => {
        const order = await controller.deleteOrderProducts(1);

        expect(order).toEqual("DELETE");
        expect(async () => {
            await controller.deleteOrderProducts(4);
        }).not.toThrow();
    });
});

describe("getActiveOrderByUserId", () => {
    it("should return the specified order", async () => {
        const order = await controller.getActiveOrderByUserId(2);

        expect(order).toBeInstanceOf(Object);
        expect(async () => {
            await controller.getActiveOrderByUserId(2);
        }).not.toThrow();
    });

    it("should return 'This user currently has no active orders'", async () => {
        const order = await(controller.getActiveOrderByUserId(20));

        expect(order).toEqual("This user currently has no active orders");
        expect(async () => {
            await controller.getActiveOrderByUserId(20);
        }).not.toThrow();
    });
});

describe("getCompleteOrderByUserId", () => {
    it("should return the specified order", async () => {
        const order = await controller.getCompleteOrderByUserId(2);

        expect(order).toBeInstanceOf(Object);
        expect(async () => {
            await controller.getCompleteOrderByUserId(2);
        }).not.toThrow();
    });

    it("should return 'This user currently has no complete orders'", async () => {
        const order = await(controller.getCompleteOrderByUserId(20));

        expect(order).toEqual("This user currently has no complete orders");
        expect(async () => {
            await controller.getCompleteOrderByUserId(20);
        }).not.toThrow();
    });
});