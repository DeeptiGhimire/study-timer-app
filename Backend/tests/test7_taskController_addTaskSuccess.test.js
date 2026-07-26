import { jest } from "@jest/globals";

const mockQuery = jest.fn();

jest.unstable_mockModule("../database/db.js", () => ({
  default: { query: mockQuery },
}));

const { addTask } = await import("../controller/taskController.js");

const mockReqRes = (body = {}, user = {}) => {
  const req = { body, user };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  return { req, res };
};

test("TEST 7: addTask successfully creates a new task", async () => {
  mockQuery.mockResolvedValueOnce({
    rows: [{ id: 1, title: "Revise Chapter 3", subject: "Math", priority: "medium" }],
  });

  const { req, res } = mockReqRes(
    { title: "Revise Chapter 3", subject: "Math" },
    { id: 1 }
  );

  await addTask(req, res);

  expect(res.statusCode).toBe(201);
  expect(res.body.message).toBe("Task added");
  expect(res.body.task).toBeDefined();
});
