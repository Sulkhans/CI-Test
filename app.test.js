const { add, subtract, multiply, divide, app } = require("./app");
const request = require("supertest");

// Unit tests for calculator functions
describe("Calculator Functions", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("subtracts 5 - 3 to equal 2", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test("multiplies 4 * 3 to equal 12", () => {
    expect(multiply(4, 3)).toBe(12);
  });

  test("divides 10 / 2 to equal 5", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("throws error when dividing by zero", () => {
    expect(() => {
      divide(10, 0);
    }).toThrow("Cannot divide by zero");
  });
});

// API endpoint tests
describe("API Endpoints", () => {
  test("GET /health should return OK status", async () => {
    const res = await request(app).get("/health").expect(200);

    expect(res.body.status).toBe("OK");
    expect(res.body.message).toBe("Server is running");
  });

  test("POST /add should return sum of two numbers", async () => {
    const res = await request(app)
      .post("/add")
      .send({ a: 5, b: 3 })
      .expect(200);

    expect(res.body.result).toBe(8);
  });

  test("POST /divide should return error for division by zero", async () => {
    const res = await request(app)
      .post("/divide")
      .send({ a: 10, b: 0 })
      .expect(400);

    expect(res.body.error).toBe("Cannot divide by zero");
  });
});
