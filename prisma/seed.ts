import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example',
      avatarUrl: 'https:github.com/psmxcvii.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Exaple Pool',
      code: 'BOL123',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-10T13:00:00.289Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-10T13:00:00.289Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });
}

main();