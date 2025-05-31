import { Hono } from "hono";
import { userRouter, userSecureRouter } from "./routes/user";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/user/api", userRouter);
app.route("/user/sucure/api", userSecureRouter);

export default app;
