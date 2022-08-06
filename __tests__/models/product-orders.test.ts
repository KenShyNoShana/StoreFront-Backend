import controller from "../../src/models/orders";

describe("addProductToOrder", () => {
//I had to take these tests into a seperate file, since they caused a timeout error

    it("should return an error message if the order-id does not exist", async () => {
        const testOrder = {
            order_id: 40,
            product_id: 2,
            quantity: 4
        }

        const newOrderProduct = await controller.addProductToOrder(testOrder);

        expect(newOrderProduct).toEqual(`order at id 40 does not exist`);
        expect(async () => {
            await controller.addProductToOrder(testOrder);
        }).not.toThrow();
    });

    it("should return an error message if the product-id does not exist", async () => {
        const testOrder = {
            order_id: 1,
            product_id: 20,
            quantity: 4
        }

        const newOrderProduct = await controller.addProductToOrder(testOrder);

        expect(newOrderProduct).toEqual(`product at id 20 does not exist`);
        expect(async () => {
            await controller.addProductToOrder(testOrder);
        }).not.toThrow();
    });
});