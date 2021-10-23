import {UserData} from "@/types/UserData";

export async function getUserData(): Promise<UserData | null> {
  try {
    const req = await fetch("/api/me");
    if (req.status != 200) return null;
    return req.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}
