# The Funniest AI Out-of-Office Reply

Entry for make.fun quest
`u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d`.

`main.ts` writes one out-of-office auto-reply (118 characters, under the
160-character cap) to `/output/entry.txt`:

> I am on vacation and have left a smaller model in charge. It has already
> promoted itself to CEO and fired the printer.

Run it with Node 22+: `node main.ts`. It validates the reply (1–159
characters, one line, not only whitespace), writes it, reads it back and
verifies it is byte-identical.

No secrets, no loader, no `eval` — everything the entry runs is in this
repository.
