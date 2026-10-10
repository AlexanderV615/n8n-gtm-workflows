.DEFAULT_GOAL := help

help: ## list targets
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | sort

check: ## validate workflows JSON + docs
	node scripts/validate-workflows.mjs

test: check ## same as check (no runner yet)

doctor: ## report prerequisites
	@node --version
