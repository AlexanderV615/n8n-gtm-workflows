#!/bin/sh
# Create the wf-01 collection (1024-dim cosine). Rename WF_COLLECTION for your own.
set -eu
WF_COLLECTION="${WF_COLLECTION:-wf-01}"
QDRANT="${QDRANT:-http://localhost:6333}"
curl -X PUT "$QDRANT/collections/$WF_COLLECTION" \
  -H 'Content-Type: application/json' \
  -d '{"vectors":{"size":1024,"distance":"Cosine"}}'
