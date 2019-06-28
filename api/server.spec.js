const supertest = require("supertest");
const server = require("./server.js");

describe("create route", () => {
    it ("201 with valid body", async () => {
        const response = await supertest(server).post("/api/hobbits").send({ name: "Gandalf" });
        expect(response.status).toBe(201);
    });
    it ("400 with invalid body", async () => {
        const response = await supertest(server).post("/api/hobbits").send({ somethingElse: "invalid data" });
        expect(response.status).toBe(400);
    });

    it("returns an id with post", async () => {
        const response = await supertest(server).post("/api/hobbits").send({ name: "Gandalf" });
        expect(response.body.length).toBe(1);
    });
});

describe("delete route", () => {
    it ("200 upon delte and body toEqual 1", async () => {
        const response = await supertest(server).delete("/api/hobbits/1");
        expect(response.status).toBe(200);
        expect(response.body).toBe(1);
    });
    it ("404 when hobbit doesnt exist", async () => {
        const response = await supertest(server).delete("/api/hobbits/6");
        expect(response.status).toBe(404);
    });
});