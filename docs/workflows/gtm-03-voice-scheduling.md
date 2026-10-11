# gtm-03-voice-scheduling

Voice appointment booking (Vapi → n8n → Cal.com). Buyer-facing booker: caller talks, Vapi tool-calls hit this webhook, n8n checks availability / books / looks up / cancels / reschedules against Cal.com v2.
Migrated from `llama-harness/wf-vapi-scheduling` (export sanitized: `active: false`, 54KB `pinData` stripped, credential IDs emptied) — **mock demo, write-branches untested against real Cal.com**.

## Trigger

`POST /webhook/calendar-book12` (header auth `X-Vapi-Secret`) → `Check voice tool-call` → `Route by function name` (Switch, fallback labeled). Vapi wiring: `PATCH /tool/{id}` → `server.url` = public tunnel URL + path; localhost unreachable from Vapi cloud — tunnel first (`cloudflared tunnel --url http://localhost:5678`).

## Inputs

Vapi tool-call args via `Extract tool-call args` Code node (`.args` aliases — `function.arguments` is sandbox-blocked). Fields: `EventTypeID`, phone, names, appointment_uid/time, dob.

## Topology (60 nodes, 8 stage groups)

Intake / Availability / Book / Lookup / Cancel / Reschedule / Failures / Unknown-functions. 16 webhook-responders, 13 Ifs, 12 dataTable ops (`Appointment Details`: phone, first/last_name, appointment_uid/time, dob), 6 Code, 5 Set, 5 Cal.com v2 HTTP (`2024-09-04`), 1 Switch, 1 NoOp. Per-stage 500 responders + 400 unknown-function fallback; Switch `fallbackOutput: extra`. Workflow-level errors → separate `Log workflow errors` workflow → `Workflow Errors` table (recreate on your instance; ref not in export).

## Credentials / env — all emptied, none in repo

- `Cal account` (`calApi`) on all 5 Cal.com HTTP nodes — create in n8n UI.
- `Vapi webhook secret` (`httpHeaderAuth`) on webhook.
- `EventTypeID` field everywhere (demo-remapped; keep your real map in `demo-event-ids.md` — TODO: add).
- UTC throughout (Luxon `zone:'utc'`, `ZZ` offsets). No secrets in repo — verified.

## Test steps (from source test log, pinned runs)

1. `make check` green.
2. Lookup-miss → `Respond no booking found` (proven).
3. Availability vs real Cal.com → v2 404 on foreign event ID → `Respond availability error` (error path proven live).
4. Error-workflow mapping with mock failure → row verified in table.
5. Untested: book/cancel/reschedule success (writes real Cal.com — use throwaway event type + your IDs).

## Status

Reshaped from broken 57-node VapiAI example (literal keys, v1 endpoints, dead refs) to validated 60-node build, zero warnings. TEST partial — display only until live booking test passes.
