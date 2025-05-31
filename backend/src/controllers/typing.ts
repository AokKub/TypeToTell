import type { Context } from "hono";
import { toggleSuccess } from "../models/typing";

const successTyping = async (c: Context) => {
  const { userId, typingSessionId } = await c.req.json();
  if (!userId) {
    return c.json(
      {
        status: false,
        message: "User ID is required",
      },
      400,
    );
  }

  const succeed = await toggleSuccess(Number(userId), Number(typingSessionId));
  if (!succeed) {
    return c.json({ status: false, message: "can't update typing status." });
  }

  return c.json({
    status: true,
    message: "Typing route is working!",
  });
};

export { successTyping };
