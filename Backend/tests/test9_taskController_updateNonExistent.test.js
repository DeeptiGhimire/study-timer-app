import { jest } from "@jest/globals";

const mockQuery = jest.fn();

jest.unstable_mockModule("../database/db.js", () => ({
  default: { query: mockQuery },
}));

const { updateTask } = await import("../controller/taskController.js");

const mockReqRes = (params = {}, body = {}, user = {}) => {
  const req = { params, body, user };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  return { req, res };
};

test("TEST 9: updateTask should return 404 for a non-existent task ID", async () => {
  mockQuery.mockResolvedValueOnce({ rows: [] });

  const { req, res } = mockReqRes(
    { id: 9999 },
    { title: "Updated title", subject: "Math", priority: "high", status: "pending" },
    { id: 1 }
  );

  await updateTask(req, res);

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toBe("Task not found");
});
