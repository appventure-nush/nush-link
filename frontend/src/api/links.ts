import {LinkData} from "@/types/LinkData";

export async function getLinkData(alias: string): Promise<LinkData> {
  const data = await (await fetch(`/${alias}/data`)).json();
  if (!data.success) {
    throw new Error(data.error);
  }
  data.alias = alias;
  return data as LinkData;
}
