#!/usr/bin/env bash
set -euo pipefail

# `next start` does not work with `output: "standalone"` (next.config.ts) —
# it prints a warning and serves nothing. The standalone build needs
# public/ and .next/static copied alongside server.js, the same assembly
# the Dockerfile does in its runner stage. This script does that assembly
# for local/CI use so `pnpm start` behaves the way `next start` normally
# would, without duplicating the standalone output on every `next build`.
cp -r public .next/standalone/public
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/static

exec node .next/standalone/server.js
