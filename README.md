# n8n GTM Workflows

Mono-repo for n8n GTM workflows. Each workflow is an exported JSON in `workflows/` plus a doc in `docs/workflows/`.

## Import

1. Clone: `git clone https://github.com/AlexanderV615/n8n-gtm-workflows.git`
2. In n8n: Workflows → … → Import from file → pick `workflows/gtm-XX-slug.json`
3. Copy `.env.example` to `.env`, fill creds (never commit `.env`)
4. Recreate credentials in n8n (Google OAuth, Jina Bearer key, OpenAI, LlamaCloud, Cal.com, webhook header secret — see each workflow doc) — exports never contain secrets

## Layout

- `workflows/` — `gtm-01-slug.json` exports, no credentials
- `docs/` — index + architecture + per-workflow setup
- `scripts/validate-workflows.mjs` — JSON + no-creds + docs check
- `.github/workflows/ci.yml` — runs `make check` on PRs

See `AGENTS.md` for agent workflow, `CONTRIBUTING.md` for commits/PRs.
