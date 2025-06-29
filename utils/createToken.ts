import { User } from "@/shared/types";

export function createToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      userId: user.id,
      name: user.name,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    })
  );
  const signature = btoa("mock_signature");

  return `${header}.${payload}.${signature}`;
}
