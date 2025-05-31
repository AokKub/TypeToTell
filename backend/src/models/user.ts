import { hashPassword, comparePassword } from "../utils/hash"; // Assuming you have a utility to hash passwords
import { db } from "../services/prisma"; // Assuming you have a database module to interact with your database
import { assignToken } from "../middlewares/auth";
import { uploadToCloudinary } from "../services/cloudinary";

const signUp = async (username: string, email: string, password: string) => {
  try {
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return { status: false, msg: "user has existed" };
    }
    const hashedPassword = await hashPassword(password); // Hash the password before storing it
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        user_image:
          "https://res.cloudinary.com/drjdfs1p5/image/upload/v1746346924/products/sapztapbybwptc1k7ox2.jpg",
      },
    });

    return { status: true, newUser };
  } catch (err) {
    console.error(err);
    return { status: false, msg: "Internal server error" };
  }
};

const isLogin = async (email: string, password: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      status: false,
      msg: "Can't find user account!",
    };
  }
  const hashedPassword = user?.password;
  const isCorrect = await comparePassword(password, hashedPassword);
  console.log(isCorrect);
  if (!isCorrect) {
    return {
      status: false,
      msg: "Password is invalid.",
    };
  }

  const token = await assignToken(user.id, user.username, user.email);
  if (!token.status) {
    return { status: token.status, msg: "secretKey not found" };
  }

  return {
    status: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      img_url: user.user_image,
    },
  };
};

const createTypingSession = async (
  theme: string,
  userId: number,
  validStory: string,
  invalidStory: string,
) => {
  try {
    const session = await db.typingSession.create({
      data: {
        theme,
        userId,
        validStory,
        invalidStory,
        status: false,
      },
    });

    return session;
  } catch (error) {
    console.error("Failed to create typing session:", error);
    throw new Error("Could not create typing session");
  }
};

const editUser = async (
  userId: number,
  username: string,
  email: string,
  image: File,
) => {
  try {
    if (!image) {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          username,
          email,
        },
      });
      return {
        status: true,
        updatedUser,
      };
    } else {
      const image_url = await uploadToCloudinary(image);
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          username,
          email,
          user_image: image_url,
        },
      });
      return {
        status: true,
        updatedUser,
      };
    }
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return {
      status: false,
      msg: "Failed to update user profile",
    };
  }
};

export { signUp, isLogin, createTypingSession, editUser };
