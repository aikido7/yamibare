#!/bin/bash
# ヤミバレ 画面キャプチャ共通ライブラリ
#
# 【重要】Chromeヘッドレスの罠:
#   --force-device-scale-factor=N と --window-size=W,H を併用すると、
#   ページは W とは異なる幅(例: 390指定→実測500px)でレイアウトされるのに
#   撮影範囲は W のままになり、右端が切れる。
#   → 対策: 実寸の iframe を大きなページに埋めて CSS transform で拡大し、
#     等倍(dsf=1)で撮影する。レイアウト幅を確実に固定でき、拡大しても鮮明。
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# capture_phone <出力png> <URL> <CSS幅> <CSS高> <拡大率>
capture_phone () {
  local out="$1" url="$2" cw="$3" ch="$4" sc="$5"
  local pw=$(python3 -c "print(int($cw*$sc))") ph=$(python3 -c "print(int($ch*$sc))")
  local tmp="${out%.png}.tmp.html"
  case "$tmp" in /*) local abs="$tmp";; *) local abs="$PWD/$tmp";; esac
  cat > "$tmp" <<HTML
<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0}html,body{width:${pw}px;height:${ph}px;overflow:hidden;background:#070912}
iframe{width:${cw}px;height:${ch}px;border:0;transform:scale($sc);transform-origin:top left}
</style></head><body><iframe src="$url"></iframe></body></html>
HTML
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="$pw","$ph" --virtual-time-budget=9000 \
    --screenshot="$out" "file://$abs" 2>/dev/null
  rm -f "$tmp"
}

# capture_page <出力png> <URL|file://> <幅> <高>  (等倍・そのまま撮影)
capture_page () {
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="$3","$4" --virtual-time-budget=9000 \
    --screenshot="$1" "$2" 2>/dev/null
}
