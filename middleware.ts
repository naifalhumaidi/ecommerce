import { NextRequest, NextResponse } from "next/server";

// const hashPassword = async (password: string) => {
//   const arrayBuffer =  await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password));
//   // console.log((await Buffer.from(arrayBuffer).toString("base64")));
//   return (await Buffer.from(arrayBuffer).toString("base64"));
// };

const isValidUsername = (username: string) =>
  username === process.env.ADMIN_USERNAME;

const isValidPassword = async (password: string) =>
  password === process.env.ADMIN_HASHED_PASSWORD;

const isValidAdmin = (username: string, password: string) =>
  isValidUsername(username) && isValidPassword(password);

const getAuthHeader = (req: NextRequest) =>
  req.headers.get("Authorization") || req.headers.get("authorization");

const isAuthenticated = async (req: NextRequest) => {
  const authHeader = getAuthHeader(req);

  if (authHeader == null) return false;
  const [username, password] = await Buffer.from(
    authHeader.split(" ")[1],
    "base64"
  )
    .toString()
    .split(":");
  return isValidAdmin(username, password);
};

const reAuthenticate = () =>
  new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": "Basic" },
  });

const middleware = async (req: NextRequest) => {
  if (!(await isAuthenticated(req))) return reAuthenticate();
};

const config = { matcher: "/admin/:path*" };

export { config, middleware };
