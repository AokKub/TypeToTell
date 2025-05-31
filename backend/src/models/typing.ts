import { db } from "../services/prisma";

const toggleSuccess = async (sessionId: number, userId: number) => {
  await db.typingSession.update({
    where: {
      userId,
      id: sessionId,
    },
    data: {
      status: true,
    },
  });
  return true;
};

export { toggleSuccess };
