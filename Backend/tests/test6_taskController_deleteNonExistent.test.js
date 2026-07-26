import { jest } from "@jest/globals";

const mockQuery = jest.fn();

jest.unstable_mockModule("../database/db.js", () => ({
  default: { query: mockQuery },
}));

const { deleteTask } = await import("../controller/taskController.js");

const mockReqRes = (params = {}, user = {}) => {
  const req = { params, user };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  return { req, res };
};

test("TEST 6: deleteTask should return 404 for a non-existent task ID", async () => {
  mockQuery.mockResolvedValueOnce({ rowCount: 0 });

  const { req, res } = mockReqRes({ id: 9999 }, { id: 1 });

  await deleteTask(req, res);

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toBe("Task not found");
});
