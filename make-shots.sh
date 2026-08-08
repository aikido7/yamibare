#!/bin/bash
# エントリー/提出フォーム用のスクリーンショットを作る
# 使い方: bash make-shots.sh   出力: shots/*.png (780x1688 = iPhone実寸の2倍)
set -e
cd "$(dirname "$0")"
source ./capture.sh
BASE="http://localhost:8955/site"
mkdir -p shots

echo "▶ スクショ撮影中..."
capture_phone shots/shot1-soreyaba.png  "$BASE/?demo=yamibaito"             390 844 2
capture_phone shots/shot2-alert.png     "$BASE/?demo=yamibaito&focus=alert" 390 844 2
capture_phone shots/shot3-wagamachi.png "$BASE/?demo=machi&area=新宿区"      390 844 2
capture_phone shots/shot4-manga.png     "$BASE/?demo=manga&story=adfraud"   390 844 2
capture_phone shots/shot5-adfraud.png   "$BASE/?demo=adfraud"               390 844 2
echo "✅ 完成:"; ls -1 shots/*.png
