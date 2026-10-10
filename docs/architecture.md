# Architecture

Funnel map goes here. List the 3 GTM workflows, triggers, and handoffs:

- `gtm-01-second-brain-ingest` — trigger: schedule Drive poll → outputs to: Qdrant `wf-01` (context layer)
- `gtm-02-sdr-battlecard` — trigger: chat → outputs to: cited brief (retrieval over LlamaCloud index; mock v0, display only)
- `gtm-03-xxx` — …
