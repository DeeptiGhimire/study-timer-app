import { jest } from "@jest/globals";

const mockQuery = jest.fn();

jest.unstable_mockModule("../database/db.js", () => ({
  default: { query: mockQuery },
}));

const { registerUser } = await import("../controller/userController.js");

const mockReqRes = (body = {}) => {
  const req = { body };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  return { req, res };
};

test("TEST 4: registerUser rejects duplicate email registration (400)", async () => {
  mockQuery.mockResolvedValueOnce({ rows: [{ id: 1, email: "test@example.com" }] });

  const { req, res } = mockReqRes({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  });

  await registerUser(req, res);

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("User already exists");
});
