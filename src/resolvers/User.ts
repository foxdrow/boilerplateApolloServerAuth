import getUserId from "../utils/getUserId";
import Args from "../types/Args";

const User = {
  email: {
    resolve(parent: any, args: Args, { prisma, request }: any, info: any) {
      const userId = getUserId(request, false);

      if (userId === parent.id) return parent.email;
      else return undefined;
    },
  },
};

export { User as default };
