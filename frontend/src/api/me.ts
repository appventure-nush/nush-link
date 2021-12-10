import {UserData} from "@/types/UserData";
import {LinkData} from "@/types/LinkData";

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

export async function getUserLinks(): Promise<LinkData[] | null> {
  try {
    const req = await fetch("/api/me/links");
    if (req.status != 200) return null;
    return (await req.json()).links;
  } catch (e) {
    console.log(e);
    return null;
  }
}
