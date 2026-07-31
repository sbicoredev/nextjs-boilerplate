import { headers } from "next/headers";

export async function getIP() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for")?.split(",")[0];
  return forwardedFor ?? "anonymous";
}
