# gtm-01-second-brain-ingest

Drive poll → chunk → embed → Qdrant. Context layer feeding later GTM workflows.
Migrated from standalone `gtm-second-brain-ingest` (GitLab) — `workflow.json` unchanged.

## Trigger

Schedule poll (hourly, node 1) → Drive fileFolder search (node 2, default My Drive root, `trashed = false`, files only).

## Inputs

Docs dropped in the watched Drive folder. Re-dropping the same file overwrites same point IDs (sha256 dedupe) — zero new points.

## Credentials / env

- Nodes 2+3: any Google credential (OAuth2 or service account), attached in n8n UI.
- Node 7: Bearer Auth credential with raw Jina API key (`credentials.httpBearerAuth`, empty stub in JSON by design).
- Qdrant reachable from n8n container (default `http://qdrant:6333`, see Reachability).
- No secrets in repo — verified (`active: false`, empty stubs only).

## Setup

1. Import `workflows/gtm-01-second-brain-ingest.json` into n8n (inactive by default).
2. Attach Google credential to nodes 2+3, Jina Bearer key to node 7.
3. Create collection: `./scripts/gtm-01-create-collection.sh` (default `gtm-01`, 1024-dim cosine — rename via `WF_COLLECTION` + node 9 URL for `gtm-01` naming).
4. Reachability: `./scripts/gtm-01-join-network.sh` (or re-point node 9 URL).
5. Activate + test run.

Prereqs: self-hosted n8n, Qdrant, Chonkie custom node (`n8n-nodes-chonkie`), Jina key.

## Record shape (v1)

`text` (distilled chunk) · `source` (`drive` | `gitlab` | `linkedin`) · `fileId` · `section` · `chunkIndex` · `fileHash` (dedupe key) · `ingestedAt`. Vector: Jina `v5-text-small` 1024-dim `retrieval.passage`. Pipeline: extract → clean → chunk (Chonkie recursive, 512) → metadata → batch embed (one API call/run) → upsert deterministic IDs.

## Tuneables

Node 2 query/folder · node 5 `chunkSize` · node 6 model/dims · node 9 collection name.

## Test steps

1. `make check` green.
2. Import into n8n, attach creds, run `./scripts/gtm-01-create-collection.sh` against dev Qdrant.
3. Drop a doc in watched folder → manual execute → verify points in Qdrant, re-drop → zero new points.
4. Failures land on node 10 (`{error, message, time}`) — wire Slack/email for prod.

## Not migrated

`linkedin.md` (local draft), `data/`, `docs/architecture.jpg` — left in source repo.
