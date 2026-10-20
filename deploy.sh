#!/usr/bin/env bash
# NextGain frontend deploy: kodni yangilaydi va dist/ ni qayta build qiladi.
# PM2 kerak emas — nginx dist/ papkasini to'g'ridan-to'g'ri beradi.
# Ishlatish: ./deploy.sh [branch]   (default: master)
set -euo pipefail

BRANCH="${1:-master}"

cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "XATO: .env fayli topilmadi (VITE_API_URL=https://api.nextgain.shop)" >&2
  exit 1
fi

if ! command -v yarn >/dev/null 2>&1; then
  echo "Yarn o'rnatilmoqda..."
  npm install -g yarn
fi

echo "==> Kod yangilanmoqda ($BRANCH)"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "==> Paketlar o'rnatilmoqda"
yarn install --frozen-lockfile

# Avval dist-new ga build qilinadi, keyin dist bilan almashtiriladi:
# build paytida ham, build yiqilsa ham sayt eski versiyada ishlab turadi.
echo "==> Build"
rm -rf dist-new
yarn build --outDir dist-new --emptyOutDir

rm -rf dist-old
[ -d dist ] && mv dist dist-old
mv dist-new dist
rm -rf dist-old

echo "==> Deploy tugadi: $(git rev-parse --short HEAD)"
