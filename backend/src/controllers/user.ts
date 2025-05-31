import type { Context } from "hono";
import type { signupRequest } from "../types/user";
import { signUp, isLogin } from "../models/user";
import { editUser } from "../models/user";
const signup = async (c: Context) => {
  try {
    const { username, email, password }: signupRequest =
      await c.req.json<signupRequest>();

    console.log("User signup attempt:", { username, email, password });

    await signUp(username, email, password);
    // For this example, we will just return a success message
    return c.json({ status: true, message: "User signed up successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    return c.json({ error: "Failed to sign up user" }, 500);
  }
};

const login = async (c: Context) => {
  try {
    const { email, password }: { email: string; password: string } =
      await c.req.json<{ email: string; password: string }>();

    console.log("User login attempt:", { email, password });

    const userLogin = await isLogin(email, password);
    if (!userLogin) {
      return c.json({ error: "Invalid email or password" }, 401);
    }
    // For this example, we will just return a success message
    return c.json({ message: "User logged in successfully", userLogin });
  } catch (error) {
    console.error("Error during login:", error);
    return c.json({ error: "Failed to log in user" }, 500);
  }
};

const editUserProfile = async (c: Context) => {
  try {
    const userId = c.req.param("id");
    const body = await c.req.formData();
    const username = body.get("username") as string;
    const email = body.get("email") as string;
    const image = body.get("image") as File;

    if (!userId || !username || !email) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const editedUser = await editUser(Number(userId), username, email, image);

    if (!editedUser.status) {
      return c.json({ error: "Failed to edit user profile" }, 500);
    }

    return c.json({
      status: true,
      message: "User profile updated successfully",
      user: editedUser,
    });
  } catch (error) {
    console.error("Error editing user profile:", error);
    return c.json({ error: "An unexpected error occurred" }, 500);
  }
};

export { signup, login, editUserProfile };
