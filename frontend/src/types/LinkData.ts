export class LinkData {
  id: number;
  url: string;
  creator: string;
  creatorEmail: string;
  createdOn: string;
  alias: string;

  constructor(id: number, url: string, creator: string, creatorEmail: string, createdOn: string, alias: string) {
    this.id = id;
    this.url = url;
    this.creator = creator;
    this.creatorEmail = creatorEmail;
    this.createdOn = createdOn;
    this.alias = alias;
  }
}
