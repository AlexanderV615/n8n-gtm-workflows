# Agent Workflow Guide

For AI agents working in this n8n mono-repo.

## Structure

- `workflows/gtm-XX-slug.json` — n8n export, no `credentials` values
- `docs/workflows/gtm-XX-slug.md` — trigger, inputs, env vars, creds, how to test
- `docs/architecture.md` — funnel map (which workflow triggers which)
- `scripts/validate-workflows.mjs` — validator run by `make check`

## Rules

1. Never commit secrets: no `.env`, no credential values, no API keys in JSON.
2. One workflow = one JSON + one doc. Name: `gtm-<nn>-<slug>.json`.
3. Export from n8n UI → save → run `make check` before commit.
4. Conventional commits required: `feat:`, `fix:`, `chore:`, `docs:`.
5. Prove it: `make check` output + screenshot/JSON snippet in PR.

## Local gates

```bash
make check   # validate JSON + no creds + docs exist
make test    # same as check (no runner yet)
make doctor  # report node version
```
