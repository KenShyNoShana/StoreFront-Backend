import request from "supertest";
import {app as router} from "../../src/server";

describe("index", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const users = await request(router).get("/");

        expect(users.status).toBe(401);
        expect(async() => {
            await request(router).get("/");
        }).not.toThrow();
    });
});

describe("create", () => {
    it("should return 201 status code", async() => {
        const testUser = {
            firstname: "Peter",
            lastname: "Schneider",
            username: "PeterSchneider",
            password: "123test"
        }
        const user = await request(router).post("/").send(testUser);

        expect(user.status).toEqual(201);
        expect(async() => {
            await request(router).post("/").send(testUser);
        }).not.toThrow();
    });
});

describe("show", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const user = await request(router).get("/1");

        expect(user.status).toEqual(401);
        expect(async() => {
            await request(router).get("/1");
        }).not.toThrow();
    });
});

describe("delete", () => {
    it("should return 401 status code since no verification token is provided", async() => {
        const user = await request(router).delete("/1");

        expect(user.status).toEqual(401);
        expect(async() => {
            await request(router).get("/1");
        }).not.toThrow();
    });
});
