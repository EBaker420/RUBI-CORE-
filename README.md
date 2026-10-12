# RUBI Core

Persistent intelligence runtime and controlled AI execution infrastructure.

## Current frontier
This repository is the deployable application layer for RUBI's authenticated controlled-host route.

Security invariants:
- Supabase service-role credentials never enter browser code.
- `rubi-owned-host` remains JWT protected.
- CEO zero-new-spend lock remains authoritative.
- No model execution is certified without ingress receipt and readback evidence.
- No secrets are committed to this repository.
