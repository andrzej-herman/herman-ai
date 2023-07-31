import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

// CHECK IF USER IS PRO (BOOLEAN)
export const checkIfPro = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const geniusUser = await prismadb.geniusUser.findUnique({
    where: {
      userId,
    },
  });

  if (!geniusUser) {
    return false;
  }

  return geniusUser.isPro;
};

// model GeniusUser {
//   id String @id @default(cuid())
//   userId String @unique
//   freeTokensUsed Int @default(0)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   isPro Boolean @default(false)
//   subscriptionType String?
//   stripePriceId String?
//   proTokenPurchased Int @default(0)
//   proTokensUsed Int @default(0)
//   proPurchaseDate DateTime?
// }

// INCREASE USED TOKENS AFTER EACH PROMPT (VOID)
export const increaseUsedTokens = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const geniusUser = await prismadb.geniusUser.findUnique({
    where: {
      userId,
    },
  });

  // EXISTS
  if (geniusUser) {
    // IS PRO
    if (geniusUser.isPro) {
      if (geniusUser.proTokensUsed === geniusUser.proTokenPurchased - 1) {
        await prismadb.geniusUser.update({
          where: { userId: userId },
          data: {
            proTokensUsed: 0,
            proTokenPurchased: 0,
            isPro: false,
            stripePriceId: null,
            subscriptionType: null,
            proPurchaseDate: null,
          },
        });
      } else {
        await prismadb.geniusUser.update({
          where: { userId: userId },
          data: { proTokensUsed: geniusUser.proTokensUsed + 1 },
        });
      }
    } else {
      await prismadb.geniusUser.update({
        where: { userId: userId },
        data: { freeTokensUsed: geniusUser.freeTokensUsed + 1 },
      });
    }
  } // NOT EXISTS
  else {
    await prismadb.geniusUser.create({
      data: { userId: userId, freeTokensUsed: 1 },
    });
  }
};

// CHECK IF CAN GENERATE CHAT, IMAGE AND CODE (BOOL)
export const checkIfCanGenerate = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const geniusUser = await prismadb.geniusUser.findUnique({
    where: {
      userId,
    },
  });

  if (!geniusUser) {
    return true;
  } else {
    if (geniusUser.isPro) {
      return true;
    } else {
      return geniusUser.freeTokensUsed < MAX_FREE_COUNTS;
    }
  }
};

// CHECK IF CAN GENERATE VIDEO AND MUSIC (STRING)
export const checkIfCanGenerateVideoAndMusic = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const geniusUser = await prismadb.geniusUser.findUnique({
    where: {
      userId,
    },
  });

  if (!geniusUser) {
    return false;
  } else {
    if (geniusUser.isPro) {
      return true;
    } else {
      return false;
    }
  }
};

// GET USED FREE TOKENS (INT)
export const freeTokensUsed = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const geniusUser = await prismadb.geniusUser.findUnique({
    where: {
      userId,
    },
  });

  if (!geniusUser) {
    return 0;
  } else {
    return geniusUser.freeTokensUsed;
  }
};

// GET USED PR0 TOKENS (INT)
export const proTokensUsed = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const geniusUser = await prismadb.geniusUser.findUnique({
    where: {
      userId,
    },
  });

  if (!geniusUser) {
    return 0;
  } else {
    return geniusUser.proTokensUsed;
  }
};

// GET PURCHASED TOKENS (INT)
export const proTokensPurchased = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const geniusUser = await prismadb.geniusUser.findUnique({
    where: {
      userId,
    },
  });

  if (!geniusUser) {
    return 0;
  } else {
    return geniusUser.proTokenPurchased;
  }
};
