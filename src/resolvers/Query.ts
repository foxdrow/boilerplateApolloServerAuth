import getUserId from "../utils/getUserId";
import Args from "../types/Args";

const Query = {
  users(parent: any, args: Args, { prisma, request }: any, info: any) {
    if (!args.query)
      return prisma.user.findMany({
        include: {
          post: true,
          comment: true,
        },
      });

    return prisma.user.findMany({
      where: {
        name: {
          contains: args.query,
        },
      },
      include: {
        post: true,
        comment: true,
      },
    });
  },
  async me(parent: any, args: Args, { prisma, request }: any, info: any) {
    const userId = await getUserId(request);

    const me = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return me;
  },
};

export { Query as default };
