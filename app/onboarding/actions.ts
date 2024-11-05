"use server"

type Payload = {
  email: string
  type: "student" | "funder"
}

export default async function createAccount(form: FormData) {
  const payload: Payload = {
    email: form.get("email") as string,
    type: form.get("role") as "student" | "funder",
  }
  // TODO: Create account logic here
  console.log(payload)
}
