export class StudentData {
  id: number;
  studentEmail: string;
  creator: string;
  creatorEmail: string;
  createdOn: string;

  constructor(id: number, studentEmail: string, creator: string, creatorEmail: string, createdOn: string) {
    this.id = id;
    this.studentEmail = studentEmail;
    this.creator = creator;
    this.creatorEmail = creatorEmail;
    this.createdOn = createdOn;
  }
}
