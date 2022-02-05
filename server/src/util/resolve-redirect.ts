// @ts-ignore
import fetch from "node-fetch";

export default async function resolveRedirect(url: string, original: string, depth: number = 0): Promise<string> {
  if (depth > 10) {
    throw new Error(`Too many redirects: ${url}`);
  }
  let response;
  try {
    response = await fetch(url, {
      timeout: 5000,
    });
  } catch (e) {
    console.log(url, (e as any).message);
    throw new Error(`${url} doesn't seem like a valid site.`);
  }
  if (response.url.startsWith("https://nush.link")) {
    throw new Error(`Cannot redirect to nush.link URL`);
  }

  if (response.status === 301 || response.status === 302) {
    return resolveRedirect(response.url, original, depth + 1);
  }

  return original;
}

