import controller from "../../src/models/user";

describe("index", () => {
    it("should return all users", async() => {
        const users = await controller.index();

        expect(users).toBeInstanceOf(Object);
        expect(async() => {
            await controller.index();
        }).not.toThrow();
    });
});

describe("create", () => {
    it("should return specified user", async() => {
        const testUser = {
            firstname: "Peter",
            lastname: "Schneider",
            username: "PeterSchneider",
            password: "123test"
        }
        const user = await controller.create(testUser);

        expect(user).toBeInstanceOf(Object);
        expect(async() => {
            await controller.create(testUser);
        }).not.toThrow();
    });
});

describe("show", () => {
    it("should return specified user", async() => {
        const users = await controller.show(1);

        expect(users).toBeInstanceOf(Object);
        expect(async() => {
            await controller.show(1);
        }).not.toThrow();
    });
});

describe("deleteUser", () => {
    it("should return specified user", async() => {
        const users = await controller.deleteUser(1);

        expect(users).toBeInstanceOf(Object);
        expect(async() => {
            await controller.deleteUser(2);
        }).not.toThrow();
    });
});