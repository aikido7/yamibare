#!/bin/bash
# ヤミバレ デモ動画ビルダー(ナレーションなし・テロップ焼き込み)
# 使い方: bash make-video.sh   出力: video/yamibare-demo.mp4
# 前提: http://localhost:8955/site/ が配信中(launch.json の yamibare)
# 方式: アプリ画面をChromeで撮影 → テロップ付き縦1080x1920フレームをHTMLで合成して再撮影 → ffmpegで連結
#       (このffmpegはdrawtext非搭載のため、文字はHTML側で描画している)
set -e
cd "$(dirname "$0")"
source ./capture.sh
BASE="http://localhost:8955/site"
OUT=video
mkdir -p $OUT/frames $OUT/comp
rm -f $OUT/frames/*.png $OUT/comp/*.png $OUT/comp/*.html

echo "▶ アプリ画面をキャプチャ中..."
capture_phone "$OUT/frames/01-top.png"      "$BASE/"                            390 844 2
capture_phone "$OUT/frames/02-manga.png"    "$BASE/?demo=manga"                 390 844 2
capture_phone "$OUT/frames/03-mangaend.png" "$BASE/?demo=manga&focus=end"       390 844 2
capture_phone "$OUT/frames/04-yaba.png"     "$BASE/?demo=yamibaito"             390 844 2
capture_phone "$OUT/frames/05-alert.png"    "$BASE/?demo=yamibaito&focus=alert" 390 844 2
capture_phone "$OUT/frames/06-adfraud.png"  "$BASE/?demo=adfraud"               390 844 2
capture_phone "$OUT/frames/07-machi.png"    "$BASE/?demo=machi&area=新宿区"      390 844 2
capture_phone "$OUT/frames/08-sos.png"      "$BASE/?demo=sos"                   390 844 2

# ファイル名|表示秒|見出し|説明
CAPS=(
"01-top|3.5|届いたら、貼るだけ。|若者を狙う詐欺・闇バイトのチェッカー"
"02-manga|4|まず「知る」。今日の手口マンガ|実際の手口を4コマで、毎日1本"
"03-mangaend|3.5|読んだ直後に、その手口を試せる|「知る」と「確かめる」が地続きに"
"04-yaba|4|怪しいDMを、貼るだけ|ヤバ度90。引っかかった言葉を根拠つきで表示"
"05-alert|4.5|闇バイトには専用の警告|「もう応募していても、今なら戻れる」#9110へ1タップ"
"06-adfraud|4.5|国が8月7日に5社へ要請した手口も判定|入口はYouTubeが27.1%(警察庁 令和7年)"
"07-machi|4|オープンデータで「自分の街」の話に|新宿区の詐欺認知件数 688件(警視庁)"
"08-sos|3.5|迷ったら、相談先まで1タップ|#9110 / ヤング・テレホン / 188"
)

echo "▶ テロップを合成中..."
rm -f $OUT/parts.txt
i=0
for c in "${CAPS[@]}"; do
  IFS='|' read -r name dur l1 l2 <<< "$c"
  i=$((i+1)); n=$(printf "%02d" $i)
  b64=$(base64 -i "$OUT/frames/$name.png")
  cat > "$OUT/comp/$n.html" <<HTML
<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:#070912;overflow:hidden;
 font-family:"Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;position:relative}
.glow{position:absolute;top:-180px;left:50%;transform:translateX(-50%);width:900px;height:600px;
 background:radial-gradient(ellipse,rgba(255,213,77,.16),rgba(255,213,77,0) 70%)}
.shot{position:absolute;top:96px;left:50%;transform:translateX(-50%);width:820px;
 border-radius:34px;box-shadow:0 26px 70px rgba(0,0,0,.75);border:3px solid #2A3155}
.cap{position:absolute;left:0;bottom:0;width:100%;padding:52px 64px 68px;
 background:linear-gradient(180deg,rgba(13,16,32,0) 0%,#0d1020 26%)}
.l1{color:#FFD54D;font-size:56px;font-weight:900;line-height:1.28;letter-spacing:.5px}
.l2{color:#EEF1FF;font-size:37px;font-weight:500;line-height:1.5;margin-top:16px}
.brand{position:absolute;top:34px;left:64px;color:#FFD54D;font-size:34px;font-weight:900}
.url{position:absolute;top:40px;right:64px;color:#9AA3C7;font-size:27px}
</style></head><body>
<div class="glow"></div>
<div class="brand">🔦 ヤミバレ</div><div class="url">yamibare.pages.dev</div>
<img class="shot" src="data:image/png;base64,$b64">
<div class="cap"><div class="l1">$l1</div><div class="l2">$l2</div></div>
</body></html>
HTML
  capture_page "$OUT/comp/$n.png" "file://$PWD/$OUT/comp/$n.html" 1080 1920
  ffmpeg -y -loop 1 -i "$OUT/comp/$n.png" -t "$dur" \
    -vf "scale=1080:1920,fade=t=in:st=0:d=0.35" \
    -r 30 -c:v libx264 -pix_fmt yuv420p -loglevel error "$OUT/part$n.mp4"
  echo "file 'part$n.mp4'" >> $OUT/parts.txt
done

echo "▶ 連結中..."
ffmpeg -y -f concat -safe 0 -i $OUT/parts.txt -c copy -loglevel error $OUT/yamibare-demo.mp4
rm -f $OUT/part*.mp4 $OUT/parts.txt
echo "✅ 完成: $OUT/yamibare-demo.mp4"
ffprobe -v error -show_entries format=duration,size -of default=nw=1 $OUT/yamibare-demo.mp4
