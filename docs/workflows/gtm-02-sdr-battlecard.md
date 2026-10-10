# gtm-02-sdr-battlecard

SDR call-prep battlecard bot — agentic retrieval demo over LlamaCloud Index v2.
Retrieval half of gtm-01's ingest: SDR types `prospect + competitor`, gets a grounded brief with citations.
Migrated from `llama-harness/wf-sdr-battlecard` (MCP dump normalized to n8n export shape) — **mock v0, untested without live creds**.

## Trigger

Chat Trigger (`SDR Chat Entry`, streaming, private) → SDR Battlecard Agent.

## Inputs

`prospect + competitor` + context (e.g. `Acme, vs Competitor X, 50 seats, SOC2?`).
Memory: session window 5 via Chat Trigger `sessionId`.

## Topology

Chat Trigger → Agent (maxIterations 30, system `=Current date`) + Brief Writer Model (gpt-5-mini, retry 3x/1s) + Chat Memory + Retrieve battlecard passages (`retrieveIndex`, `topK 5`, retry 3x/1s). Reply inline; no Slack in v0. Deferred: grep/read HTTP tools, outputParser, ingest lane, Slack shell sub-workflow call.

## Credentials / env — all placeholder, none on file

- `openAiApi` (or swap model) → Brief Writer Model.
- `llamaParseApi` → Retrieve tool. 401/403 → check key + region.
- `indexId`: `mock-sdr-battlecard` → replace with real index ID (mode id) after corpus indexed.
- No secrets in repo — verified.

## Corpus (load into Index v2 first)

6–10 files: pricing onepager, 2 case studies, 2 competitor sheets, security FAQ, MEDDPICC discovery questions. Index `store_attachments: ['screenshots','items']` for page cites. `LLAMA_BASE` default `https://api.cloud.llamaindex.ai/api/v1`.

## Agent contract

Broad retrieve first (pains/differentiators), then grep for exact prices/clauses, read for context. Ground every claim, cite `file pp.start-end`, say absent when absent. Output markdown brief.

## Test steps (pending creds)

1. `make check` green.
2. Create creds + real index (§Corpus), replace `indexId`.
3. Matrix: 1) standard brief 2) exact-clause grep-style Q 3) unknown competitor → must say absent.
4. Publish only after TEST passes. Demo narration: retrieve → grep → read → cited brief.

## Status

`validate_workflow` valid (5 nodes), 4/4 connections verified pre-migration. TEST unrun — display only.
