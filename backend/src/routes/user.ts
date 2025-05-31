import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth";
import { login, signup, editUserProfile } from "../controllers/user";
import { geminiCreateStory } from "../controllers/gemini";
import { tokenValidation } from "../middlewares/tokenValidation";

const userRouter = new Hono();
const userSecureRouter = new Hono();

userSecureRouter.use(authMiddleware);
userSecureRouter.post("/generate-story", geminiCreateStory);
userSecureRouter.post("edit-profile/:id", editUserProfile);

userRouter.get("/token-validation", tokenValidation);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/", (c) => {
  return c.text("User route is working!");
});

export { userRouter, userSecureRouter };
