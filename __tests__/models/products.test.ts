import controller from "../../src/models/products";

describe("getProducts", () => {
    it("should return all products when called", async() => {
        const products = await controller.getProducts();

        expect(products).toBeInstanceOf(Object);
        expect(async () => {
            await controller.getProducts();
        }).not.toThrow();
    });
});

describe("createProduct", () => {
    it("should create a product when passed in proper data", async () => {
        const testProduct = {
            name: "Water",
            price: 2.99,
            category: "essentials"
        }

        const product = await controller.createProduct(testProduct);

        expect(product).toBeInstanceOf(Object);
        expect(async () => {
            await controller.createProduct(testProduct);
        }).not.toThrow();
    });
})

describe("showProduct", () => {
    it("should return all products when called", async() => {
        const product = await controller.showProduct(1);

        expect(product).toBeInstanceOf(Object);
        expect(async () => {
            await controller.showProduct(1);
        }).not.toThrow();
    });
});

describe("showProduct", () => {
    it("should return all products when called", async() => {
        const products = await controller.deleteProduct(1);

        expect(products).toBeInstanceOf(Object);
        expect(async () => {
            await controller.deleteProduct(2);
        }).not.toThrow();
    });
});