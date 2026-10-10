#!/bin/sh
# Put Qdrant on the n8n network so node 9 (http://qdrant:6333) resolves.
# Adjust names to your compose project.
set -eu
N8N_NET="${N8N_NET:-n8n-self-hosted_default}"
docker network connect "$N8N_NET" qdrant 2>/dev/null || echo "already connected or container name differs — check 'docker network ls'"
