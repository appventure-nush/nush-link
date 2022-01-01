import {LinkData} from "@/types/LinkData";

export async function getLinkData(alias: string): Promise<LinkData> {
  const data = await (await fetch(`/${alias}/data`)).json();
  if (!data.success) {
    throw new Error(data.error);
  }
  data.alias = alias;
  return data as LinkData;
}

export async function deleteLink(id: number): Promise<null> {
  const data = await (await fetch(`/api/delete/${id}`, { method:"DELETE" })).json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data;
}


