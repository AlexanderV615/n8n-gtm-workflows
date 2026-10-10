# Contributing

## Add / change a workflow

1. Build in n8n, export JSON to `workflows/gtm-XX-slug.json`.
2. Strip credentials: exports must not contain secret values.
3. Add `docs/workflows/gtm-XX-slug.md`: trigger, inputs, required env vars / n8n credentials, how to test.
4. Run `make check`, commit with conventional message.

## Commits

`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `ci:`, `perf:`.
PR titles use the same types — validated by CI.

Single-phase: PR straight to `main`, squash merge preferred.
