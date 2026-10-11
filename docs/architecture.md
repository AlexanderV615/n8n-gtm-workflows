# Architecture

Funnel map goes here. List the 3 GTM workflows, triggers, and handoffs:

- `gtm-01-second-brain-ingest` — trigger: schedule Drive poll → outputs to: Qdrant `wf-01` (context layer)
- `gtm-02-sdr-battlecard` — trigger: chat → outputs to: cited brief (agentic retrieval over LlamaCloud index; demo build, bring your own creds)
- `gtm-03-voice-scheduling` — trigger: Vapi webhook tool-call → outputs to: Cal.com booking + confirmation (validated paths; connect live creds to run)
