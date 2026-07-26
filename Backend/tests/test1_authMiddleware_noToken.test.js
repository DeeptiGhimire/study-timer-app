import { jest } from "@jest/globals";
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

test("TEST 1: authMiddleware rejects a request with no token (401)", () => {
  const { req, res, next } = mockReqRes({});
  authMiddleware(req, res, next);
  expect(res.statusCode).toBe(401);
  expect(res.body.message).toBe("No token provided");
  expect(next).not.toHaveBeenCalled();
});
