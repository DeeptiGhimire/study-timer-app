import "dotenv/config";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const mockReqRes = (headers = {}) => {
  const req = { headers };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  const next = jest.fn();
  return { req, res, next };
};

test("TEST 3: authMiddleware allows a valid token through", () => {
  const validToken = jwt.sign({ id: 1, email: "test@example.com" }, process.env.JWT_SECRET);
  const { req, res, next } = mockReqRes({ authorization: `Bearer ${validToken}` });
  authMiddleware(req, res, next);
  expect(next).toHaveBeenCalled();
  expect(res.statusCode).toBe(null);
  expect(req.user).toBeDefined();
});
