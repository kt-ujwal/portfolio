#!/usr/bin/env bash
#
# === Static-site deploy script for ujwal.io ==========
# build → sync → invalidate  (React 19, CloudFront + S3 + OAC)
#
# Usage examples:
#   ./deploy.sh                    # normal deploy
#   DRY_RUN=1 ./deploy.sh          # show commands, don’t touch AWS
#   VERBOSE=1 ./deploy.sh          # chatty rsync
#   BUCKET=staging.example ./deploy.sh
#

set -euo pipefail
IFS=$'\n\t'

# ---------- config (env-overridable) --------------------------
BUILD_DIR="build"
BUCKET="${BUCKET:-ujwal.io}"          # S3 bucket
DIST_ID="${DIST_ID:-E2GX1U7BKO54UG}"  # CloudFront distribution
PROFILE="${AWS_PROFILE:-default}"     # AWS credential profile
CACHE_LONG="public,max-age=31536000,immutable"
CACHE_SHORT="public,max-age=300"      # 5 min for SW / manifest
# --------------------------------------------------------------

BLUE=$'\e[34m'; GREEN=$'\e[32m'; RED=$'\e[31m'; NC=$'\e[0m'
log()  { printf '%s•%s %s\n' "$BLUE" "$NC" "$*";  }
good() { printf '%s✔%s %s\n' "$GREEN" "$NC" "$*"; }
die()  { printf '%s✖%s %s\n' "$RED" "$NC" "$*"; exit 1; }
[[ "${VERBOSE:-0}" == 1 ]] && set -x
trap 'die "Error on line $LINENO"' ERR

log "1/3 Building React app…"
npm run build

log "2/3 Syncing static assets to s3://${BUCKET}/"
SYNC_OPTS=(--delete --cache-control "$CACHE_LONG" --profile "$PROFILE")
[[ "${VERBOSE:-0}" == 1 ]] && SYNC_OPTS+=(--size-only --human-readable)

if [[ "${DRY_RUN:-0}" == 1 ]]; then
  echo "DRY-RUN: aws s3 sync \"$BUILD_DIR/\" \"s3://${BUCKET}/\" ${SYNC_OPTS[*]}"
else
  aws s3 sync "$BUILD_DIR/" "s3://${BUCKET}/" "${SYNC_OPTS[@]}"
fi
good "Static files uploaded."

# ----- upload service-worker.js + manifest with short TTL -----
for f in service-worker.js asset-manifest.json manifest.json; do
  [[ -f "$BUILD_DIR/$f" ]] || continue
  CT="application/javascript"
  [[ $f == *.json ]] && CT="application/json"
  [[ $f == manifest.json ]] && CT="application/manifest+json"
  aws s3 cp "$BUILD_DIR/$f" "s3://${BUCKET}/$f" \
    --cache-control "$CACHE_SHORT" \
    --content-type "$CT" \
    --profile "$PROFILE" \
    ${DRY_RUN:+--dryrun}
done
good "PWA control files uploaded with short cache."

log "3/3 Creating CloudFront invalidation…"
if [[ "${DRY_RUN:-0}" == 1 ]]; then
  echo "DRY-RUN: aws cloudfront create-invalidation --distribution-id $DIST_ID --paths '/*'"
else
  INVALIDATION_ID=$(aws cloudfront create-invalidation \
      --distribution-id "$DIST_ID" \
      --paths "/*" \
      --profile "$PROFILE" \
      --query 'Invalidation.Id' \
      --output text)
  good "Invalidation started → ID: $INVALIDATION_ID"
fi

good "Deployment complete!"
