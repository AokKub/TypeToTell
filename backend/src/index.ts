import { Hono } from "hono";
import { geminiTalk } from "./controllers/gemini";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/talk", geminiTalk);

export default app;
