import { Hono } from "hono";
import { userRouter, userSecureRouter } from "./routes/user";
import { typingSessionRouter } from "./routes/typingSession";
import { cors } from "hono/cors";
const app = new Hono();

app.use("*", cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/user/api", userRouter);
app.route("/user/sucure/api", userSecureRouter);
app.route("typing/seure/api", typingSessionRouter);
export default app;
