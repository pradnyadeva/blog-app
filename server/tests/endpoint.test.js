import dotenv from 'dotenv';
import request from "supertest";

import app from "../index.js"

// Define a variable to hold the server instance
let server;

// Start the server before running tests
beforeAll((done) => {
  server = app.listen(3200, () => {
    console.log(`Server is listening on port 3200`);
    done();
  });
});

// Close the server after all tests have finished
afterAll((done) => {
  server.close(() => {
    console.log(`Server has been closed`);
    done();
  });
});

// Write your tests here
describe("GET /getarticle", () => {
    it("should return all article", async () => {
      const res = await request(app).get("/getblog");
      expect(res.statusCode).toBe(201);

    }, 10000);
});

describe("GET /getarticle", () => {
    it("should return unauthorized", async () => {
      const res = await request(app).post("/verify");
      expect(res.statusCode).toBe(401);

    }, 10000);
});
