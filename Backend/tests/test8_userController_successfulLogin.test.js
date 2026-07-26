import "dotenv/config";
import { jest } from "@jest/globals";

const mockQuery = jest.fn();

jest.unstable_mockModule("../database/db.js", () => ({
  default: { query: mockQuery },
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: { compare: jest.fn().mockResolvedValue(true) },
}));

const { loginUser } = await import("../controller/userController.js");

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

test("TEST 8: loginUser succeeds with correct email and password", async () => {
  mockQuery.mockResolvedValueOnce({
    rows: [{ id: 1, email: "test@example.com", password: "hashedpassword123" }],
  });

  const { req, res } = mockReqRes({
    email: "test@example.com",
    password: "correctpassword",
  });

  await loginUser(req, res);

  expect(res.body.message).toBe("Login successful");
  expect(res.body.token).toBeDefined();
  expect(res.body.user).toBeDefined();
});
