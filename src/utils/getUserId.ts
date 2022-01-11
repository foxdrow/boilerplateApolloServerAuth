import jwt from "jsonwebtoken";

const getUserId = (request : any, requireAuth = true) => {
  const header = request.request.headers.authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded : any = jwt.verify(token, "secret");
    return decoded.userId;
  }
  if (requireAuth) throw new Error("Auth required");

  return undefined;
};

export { getUserId as default };
