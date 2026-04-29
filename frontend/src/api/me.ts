import {UserData} from "@/types/UserData";
import {LinkData} from "@/types/LinkData";

export class TimeoutError extends Error {
  constructor(message: string = "Request timeout") {
    super(message);
    this.name = "TimeoutError";
  }
}

export async function getUserData(timeoutMs: number = 5000): Promise<UserData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    const req = await fetch("/api/me", { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (req.status === 401) {
      throw new TimeoutError("Authentication timeout - redirecting to backup");
    }
    if (req.status != 200) return null;
    return req.json();
  } catch (e) {
    if (e instanceof TimeoutError) {
      throw e;
    }
    if (e instanceof Error && (e.name === "AbortError" || e.message.includes("timeout"))) {
      throw new TimeoutError("Connection timeout");
    }
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
