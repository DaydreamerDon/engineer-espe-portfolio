import { describe, expect, it } from 'vitest'

import { createContactEmail } from '../../plugins/portfolio/src/components/contactEmail'

describe('contact email draft', () => {
  it('preserves the message and reply details without treating their punctuation as URL parameters', () => {
    const fields = new FormData()
    fields.set('name', '  José & Co.  ')
    fields.set('email', '  jane+projects@example.com  ')
    fields.set('subject', '  Façade review & schedule? #1  ')
    fields.set('message', '  Hello,\nCan we discuss a 50% review? &bcc=someone@example.com  ')

    const draft = new URL(createContactEmail('owner@example.com', fields))

    expect(draft.protocol).toBe('mailto:')
    expect(draft.pathname).toBe('owner@example.com')
    expect([...draft.searchParams.keys()]).toEqual(['subject', 'body'])
    expect(draft.searchParams.get('subject')).toBe('Façade review & schedule? #1')
    expect(draft.searchParams.get('body')).toBe(
      'Hello,\nCan we discuss a 50% review? &bcc=someone@example.com\n\nFrom: José & Co.\nReply to: jane+projects@example.com',
    )
    expect(draft.hash).toBe('')
  })
})
