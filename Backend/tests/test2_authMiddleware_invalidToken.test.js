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

test("TEST 2: authMiddleware rejects an invalid token (401)", () => {
  const { req, res, next } = mockReqRes({ authorization: "Bearer someinvalidtoken123" });
  authMiddleware(req, res, next);
  expect(res.statusCode).toBe(401);
  expect(res.body.message).toBe("Invalid token");
  expect(next).not.toHaveBeenCalled();
});
