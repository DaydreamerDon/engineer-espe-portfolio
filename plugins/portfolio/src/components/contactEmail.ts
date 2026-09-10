export function createContactEmail(email: string, fields: FormData): string {
  const name = String(fields.get('name') ?? '').trim()
  const replyTo = String(fields.get('email') ?? '').trim()
  const subject = String(fields.get('subject') ?? '').trim()
  const message = String(fields.get('message') ?? '').trim()
  const body = `${message}\n\nFrom: ${name}\nReply to: ${replyTo}`

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
