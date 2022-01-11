const { isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";
import Args from "../types/Args";

const Mutation = {
  async createUser(parent: any, args: Args, { prisma }: any, info: any) {
    const emailTaken = await prisma.user
      .findUnique({
        where: { email: args.data.email },
      })
      .then((user: any) => {
        if (user) throw new Error("Email taken");
      });

    if (!isStrongPassword(args.data.password))
      throw new Error("Password not strong enough");

    const password = await bcrypt.hash(args.data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...args.data,
        password,
      },
    });
    return {
      user,
      token: jwt.sign({ userId: user.id }, "secret", { expiresIn: "7 days" }),
    };
  },
  async login(parent: any, args: Args, { prisma }: any, info: any) {
    const user = await prisma.user.findUnique({
      where: { email: args.data.email },
    });
    if (!user) throw new Error("User not found");

    const isValidPassword = await bcrypt.compare(
      args.data.password,
      user.password
    );
    if (!isValidPassword) throw new Error("Unable to login");

    return {
      user,
      token: jwt.sign({ userId: user.id }, "secret", { expiresIn: "7 days" }),
    };
  },
  async deleteUser(
    parent: any,
    args: Args,
    { prisma, request }: any,
    info: any
  ) {
    const userId = getUserId(request);

    const userExists = await prisma.user
      .findUnique({
        where: { id: userId },
      })
      .then((user: any) => {
        if (!user) throw new Error("User not found");
      });

    return prisma.user.delete({
      where: { id: userId },
    });
  },
  async updateUser(
    parent: any,
    args: Args,
    { prisma, request }: any,
    info: any
  ) {
    const userId = getUserId(request);

    return prisma.user.update({
      where: {
        id: userId,
      },
      data: args.data,
    });
  },
};
export { Mutation as default };
