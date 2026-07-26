import { jest } from "@jest/globals";

const mockQuery = jest.fn();

jest.unstable_mockModule("../database/db.js", () => ({
  default: { query: mockQuery },
}));

const { getGoal } = await import("../controller/goalController.js");

const mockReqRes = (user = {}) => {
  const req = { user };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  return { req, res };
};

test("TEST 10: getGoal returns default 60 when no goal is set", async () => {
  mockQuery.mockResolvedValueOnce({ rows: [] });

  const { req, res } = mockReqRes({ id: 1 });

  await getGoal(req, res);

  expect(res.body.daily_goal).toBe(60);
});
