import { Hono } from "hono";
import { userRouter, userSecureRouter } from "./routes/user";
import { typingSessionRouter } from "./routes/typingSession";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/user/api", userRouter);
app.route("/user/sucure/api", userSecureRouter);
app.route("typing/seure/api", typingSessionRouter);
export default app;
