
export async function deleteStudent(email: string): Promise<null> {
    const data = await (await fetch(`/api/authorize_student/delete/${email}`, {method: "DELETE"})).json();
    if (!data.success) {
      throw new Error(data.error);
    }
    return data;
}