// ヤミバレ 2分ピッチ 7枚 (都知事杯オープンデータ・ハッカソン2026)
const pptxgen = require('pptxgenjs');

const C = {
  bg: '0D1020', panel: '1E2440', panel2: '232A4A', line: '2A3155',
  gold: 'FFD54D', red: 'FF4D5E', green: '06C755', white: 'EEF1FF', sub: '9AA3C7', blue: '4DC9FF',
};
const FONT = 'Yu Gothic';
const W = 13.33, H = 7.5;

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';

function baseSlide() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  return s;
}
function header(s, kicker, title) {
  s.addText(kicker, { x: 0.6, y: 0.42, w: 12.1, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: C.gold, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.82, w: 12.1, h: 0.95, fontFace: FONT, fontSize: 32, bold: true, color: C.white, margin: 0 });
}
function footer(s, n) {
  s.addText(`🔦 ヤミバレ — 届いたら、貼るだけ。   yamibare.pages.dev`, { x: 0.6, y: 7.02, w: 9.0, h: 0.35, fontFace: FONT, fontSize: 10, color: C.sub, margin: 0 });
  s.addText(`${n} / 7`, { x: 12.3, y: 7.02, w: 0.5, h: 0.35, fontFace: FONT, fontSize: 10, color: C.sub, align: 'right', margin: 0 });
}
function card(s, x, y, w, h, fill) {
  s.addShape('ROUNDED_RECTANGLE', { x, y, w, h, rectRadius: 0.12, fill: { color: fill || C.panel }, line: { color: C.line, width: 1 } });
}
function statCard(s, x, y, w, num, unit, label, color) {
  card(s, x, y, w, 3.1);
  s.addText([
    { text: num, options: { fontSize: 48, bold: true, color: color || C.gold } },
    { text: ' ' + unit, options: { fontSize: 18, bold: true, color: color || C.gold } },
  ], { x: x + 0.25, y: y + 0.35, w: w - 0.5, h: 1.0, fontFace: FONT, margin: 0 });
  s.addText(label, { x: x + 0.25, y: y + 1.45, w: w - 0.5, h: 1.5, fontFace: FONT, fontSize: 13, color: C.white, lineSpacing: 20, margin: 0, valign: 'top' });
}

/* ---------- S1 タイトル ---------- */
{
  const s = baseSlide();
  // ランプの光(ぼんやり円)
  s.addShape('ELLIPSE', { x: 4.9, y: 0.7, w: 3.5, h: 3.5, fill: { color: C.gold, transparency: 88 }, line: { type: 'none' } });
  s.addShape('ELLIPSE', { x: 5.6, y: 1.4, w: 2.1, h: 2.1, fill: { color: C.gold, transparency: 78 }, line: { type: 'none' } });
  s.addText('🔦', { x: 5.9, y: 1.7, w: 1.5, h: 1.5, fontSize: 60, align: 'center' });
  s.addText('ヤミバレ', { x: 1.5, y: 3.3, w: 10.33, h: 1.2, fontFace: FONT, fontSize: 66, bold: true, color: C.gold, align: 'center', margin: 0 });
  s.addText('届いたら、貼るだけ。', { x: 1.5, y: 4.55, w: 10.33, h: 0.7, fontFace: FONT, fontSize: 28, bold: true, color: C.white, align: 'center', margin: 0 });
  s.addText('若者を「被害者」にも「実行役」にもさせない、闇バイト・詐欺チェッカー', { x: 1.5, y: 5.3, w: 10.33, h: 0.5, fontFace: FONT, fontSize: 16, color: C.sub, align: 'center', margin: 0 });
  s.addText('都知事杯オープンデータ・ハッカソン2026  |  チーム ヤミバレ  |  yamibare.pages.dev', { x: 1.5, y: 6.35, w: 10.33, h: 0.45, fontFace: FONT, fontSize: 13, color: C.sub, align: 'center', margin: 0 });
}

/* ---------- S2 課題 ---------- */
{
  const s = baseSlide();
  header(s, '課題 — 令和7年・警察庁統計(実データ)', '「詐欺は高齢者の問題」は、もう古い。');
  statCard(s, 0.6, 2.1, 3.94, '30代', 'が最多', 'ニセ警察詐欺の被害件数。30代 2,239件、20代 1,718件で若い世代が上位2つを占める', C.red);
  statCard(s, 4.7, 2.1, 3.94, '8割', '超', '警察が約1年で保護した闇バイト応募者544人のうち、10〜30代の割合(20代45.2%・10代24.8%)', C.red);
  statCard(s, 8.8, 2.1, 3.94, '1,414', '億円', '特殊詐欺の年間被害額(前年のほぼ2倍)。SNS型投資詐欺は9,538件と約1.5倍に急増', C.gold);
  card(s, 0.6, 5.4, 12.14, 1.45, C.panel2);
  s.addText([
    { text: '若者は、騙される被害者にも、使い捨ての実行役にもなる。', options: { bold: true, color: C.white } },
    { text: '入口は日常のSNS広告だ。国は2026年8月7日、8省庁連名でGoogle・Meta・TikTok・X・LINEヤフーに「なりすまし詐欺広告」対策を要請した。', options: { color: C.sub } },
    { text: 'だがそれは事業者側の対策。いま自分に届いた広告を確かめる手段は、利用者にない。', options: { bold: true, color: C.gold } },
  ], { x: 0.95, y: 5.55, w: 11.5, h: 1.15, fontFace: FONT, fontSize: 14.5, lineSpacing: 23, margin: 0 });
  footer(s, 2);
}

/* ---------- S3 解決 ---------- */
{
  const s = baseSlide();
  header(s, '解決 — サービスデザイン', '貼るだけ、3秒。届いた瞬間の行動を変える');
  const steps = [
    ['1', '知る・貼る', '4コマ漫画で手口を知り、届いた怪しいDMはLINE風チャットにそのまま貼る。読む教材ではなく"使う道具"', C.green],
    ['2', 'ヤミがバレる', 'ヤバ度0〜99と「引っかかった言葉」を根拠つきで表示。9カテゴリ(闇バイト/ニセ警察/なりすまし広告/SNS投資他)', C.gold],
    ['3', '出口へつなぐ', '公的実データで「自分ごと化」→ #9110・ヤング・テレホン等へワンタップ発信', C.blue],
  ];
  steps.forEach((st, i) => {
    const x = 0.6 + i * 4.11;
    card(s, x, 2.1, 3.94, 2.9);
    s.addShape('ELLIPSE', { x: x + 0.25, y: 2.35, w: 0.55, h: 0.55, fill: { color: st[3] }, line: { type: 'none' } });
    s.addText(st[0], { x: x + 0.25, y: 2.35, w: 0.55, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: C.bg, align: 'center', valign: 'middle', margin: 0 });
    s.addText(st[1], { x: x + 0.95, y: 2.38, w: 2.8, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: C.white, margin: 0 });
    s.addText(st[2], { x: x + 0.25, y: 3.1, w: 3.44, h: 1.7, fontFace: FONT, fontSize: 12.5, color: C.sub, lineSpacing: 19, margin: 0, valign: 'top' });
  });
  card(s, 0.6, 5.35, 12.14, 1.35, '2A1420');
  s.addText([
    { text: '🕳️ 闇バイトには専用警告。', options: { bold: true, color: C.red } },
    { text: '「もう応募してしまっても、今なら戻れる(警察の保護実績544件)」— 脅すのではなく、出口を示す。', options: { color: C.white } },
  ], { x: 0.95, y: 5.55, w: 11.5, h: 0.95, fontFace: FONT, fontSize: 15, lineSpacing: 24, margin: 0 });
  footer(s, 3);
}

/* ---------- S4 デモ ---------- */
{
  const s = baseSlide();
  header(s, 'デモ — 公開中・全機能検証済み', 'スマホで開いて、貼って、3秒。');
  // 左: スマホモック
  s.addShape('ROUNDED_RECTANGLE', { x: 0.9, y: 2.0, w: 3.1, h: 4.8, rectRadius: 0.25, fill: { color: '070912' }, line: { color: C.line, width: 2 } });
  s.addText('🔦 ヤミバレ', { x: 1.1, y: 2.15, w: 2.7, h: 0.35, fontFace: FONT, fontSize: 12, bold: true, color: C.gold, margin: 0 });
  s.addShape('ROUNDED_RECTANGLE', { x: 1.5, y: 2.6, w: 2.3, h: 0.85, rectRadius: 0.1, fill: { color: C.green }, line: { type: 'none' } });
  s.addText('【急募】日給5万円 荷物を運ぶだけ。身分証を送って。詳細はTelegramで', { x: 1.6, y: 2.66, w: 2.1, h: 0.75, fontFace: FONT, fontSize: 8, color: '04240F', lineSpacing: 11, margin: 0 });
  s.addShape('ROUNDED_RECTANGLE', { x: 1.15, y: 3.6, w: 2.55, h: 1.5, rectRadius: 0.1, fill: { color: C.panel2 }, line: { color: C.red, width: 1.5 } });
  s.addText('🚨 ソレヤバ!!', { x: 1.3, y: 3.7, w: 2.3, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: C.red, margin: 0 });
  s.addText('ヤバ度 90/100 ・ 🕳️闇バイトの疑い\n⚠️「日給5万」「運ぶだけ」「身分証」「Telegram」', { x: 1.3, y: 4.12, w: 2.3, h: 0.9, fontFace: FONT, fontSize: 8.5, color: C.white, lineSpacing: 12, margin: 0 });
  s.addShape('ROUNDED_RECTANGLE', { x: 1.15, y: 5.25, w: 2.55, h: 0.85, rectRadius: 0.1, fill: { color: '2A1420' }, line: { color: C.red, width: 1 } });
  s.addText('⚠️ それ、闇バイトの入口です\n📞 #9110に電話(タップ)', { x: 1.3, y: 5.35, w: 2.3, h: 0.7, fontFace: FONT, fontSize: 9, color: C.white, lineSpacing: 13, margin: 0 });
  s.addShape('ROUNDED_RECTANGLE', { x: 1.15, y: 6.25, w: 2.55, h: 0.4, rectRadius: 0.08, fill: { color: '0B0E1C' }, line: { color: C.line, width: 1 } });
  s.addText('貼るだけで判定…', { x: 1.3, y: 6.28, w: 2.2, h: 0.34, fontFace: FONT, fontSize: 8.5, color: C.sub, margin: 0 });
  // 右: 説明
  const feats = [
    ['📰 今日の手口マンガ', '実際の手口を4コマで。読んだ直後に同じ手口を判定で試せる(全6本・日替わり)'],
    ['🚩 根拠を見せる判定', '「どの言葉が危険か」を1つずつ提示。ヤバ度メーターで直感的に'],
    ['📊 実データで自分ごと化', '「あなたの年代で急増」「あなたの区で688件」— 公的統計が根拠'],
    ['🆘 相談まで1タップ', '#9110・ヤング・テレホン・188へ発信。誰にも知られず相談できる'],
    ['📸 シェアカード', '判定結果をPNGカード化。友達に回して「守る側」を増やす'],
  ];
  feats.forEach((f, i) => {
    const y = 2.0 + i * 0.99;
    card(s, 4.6, y, 8.1, 0.87);
    s.addText(f[0], { x: 4.9, y: y + 0.08, w: 7.6, h: 0.36, fontFace: FONT, fontSize: 14, bold: true, color: C.gold, margin: 0 });
    s.addText(f[1], { x: 4.9, y: y + 0.44, w: 7.6, h: 0.38, fontFace: FONT, fontSize: 11.5, color: C.sub, margin: 0 });
  });
  footer(s, 4);
}

/* ---------- S5 データ活用 ---------- */
{
  const s = baseSlide();
  header(s, 'オープンデータ活用 — 判定根拠はすべて公的実データ', '「今・ここ・あなたの年代」に刺さる根拠');
  const rows = [
    ['警視庁', '区市町村の町丁別・手口別認知件数(令和7年CSV)', '59区市町村+町丁TOP3を自動集計して内蔵。「わがまち」を選ぶと判定根拠が自分の街の実数に変わる(都内計10,521件)', '利用中', C.gold],
    ['警察庁', '特殊詐欺・SNS型投資/ロマンス詐欺 認知・検挙状況(令和7年確定値)', '年代別・手口別の実数を判定カードに表示。「30代最多・20代2位」など若者への根拠提示の核', '利用中', C.gold],
    ['8省庁', 'SNS等におけるなりすまし詐欺広告に関する対策の強化について(要請)/令和8年8月7日', '詐欺の入口となった広告の割合(YouTube27.1%・Instagram16.3%・TikTok10.4%他)を判定根拠に搭載。国の要請=事業者側の対策、ヤミバレ=利用者側の防御', '利用中', C.gold],
    ['国税庁', '法人番号公表サイト Web-API', 'バイト求人の会社が実在するかチェック。要請が求める「商業登記電子証明書による法人の本人確認」と同じ方向', '本選実装', C.blue],
  ];
  rows.forEach((r, i) => {
    const y = 2.0 + i * 1.18;
    card(s, 0.6, y, 12.14, 1.06);
    s.addText(r[0], { x: 0.9, y: y + 0.1, w: 1.5, h: 0.38, fontFace: FONT, fontSize: 14.5, bold: true, color: C.white, margin: 0 });
    s.addShape('ROUNDED_RECTANGLE', { x: 0.9, y: y + 0.55, w: 1.1, h: 0.36, rectRadius: 0.08, fill: { color: r[4] }, line: { type: 'none' } });
    s.addText(r[3], { x: 0.9, y: y + 0.55, w: 1.1, h: 0.36, fontFace: FONT, fontSize: 10, bold: true, color: C.bg, align: 'center', valign: 'middle', margin: 0 });
    s.addText(r[1], { x: 2.45, y: y + 0.1, w: 10.1, h: 0.4, fontFace: FONT, fontSize: 12.5, bold: true, color: C.gold, margin: 0 });
    s.addText(r[2], { x: 2.45, y: y + 0.5, w: 10.1, h: 0.5, fontFace: FONT, fontSize: 11, color: C.sub, lineSpacing: 15, margin: 0 });
  });
  s.addText('ほか利用予定: 東京都 消費生活相談データ / 金融庁 登録業者一覧 / 東京都 行政区域・人口データ 等', { x: 0.6, y: 6.75, w: 12.1, h: 0.3, fontFace: FONT, fontSize: 10.5, color: C.sub, margin: 0 });
  footer(s, 5);
}

/* ---------- S6 技術 ---------- */
{
  const s = baseSlide();
  header(s, '技術 × 安全設計', '「怖い話」を扱うからこそ、安心して使える作りに');
  const items = [
    ['📱 単一HTML・依存ゼロ', 'URLひとつでどのスマホでも即動作。Cloudflare Pages配信。啓発現場(学校・店頭)でそのまま使える', C.gold],
    ['🔒 端末内判定・外部送信ゼロ', '貼った文面はどこにも送らない=誰にも知られず確認できる。相談ハードルを最小化', C.green],
    ['⚖️ 「安全」と断定しない原則', '誤判定リスクに正面から対応。低スコアでも必ず注意喚起+相談導線を表示', C.blue],
    ['🤖 本選: Claude APIで三段構え', 'ルール判定 × 生成AIの文脈理解(新手口対応・教育目的の安全枠厳守) × オープンデータ根拠へ拡張', C.red],
  ];
  items.forEach((it, i) => {
    const x = 0.6 + (i % 2) * 6.17, y = 2.1 + Math.floor(i / 2) * 1.95;
    card(s, x, y, 5.97, 1.75);
    s.addText(it[0], { x: x + 0.3, y: y + 0.18, w: 5.4, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: it[2], margin: 0 });
    s.addText(it[1], { x: x + 0.3, y: y + 0.72, w: 5.4, h: 0.9, fontFace: FONT, fontSize: 12.5, color: C.white, lineSpacing: 19, margin: 0, valign: 'top' });
  });
  card(s, 0.6, 6.15, 12.14, 0.75, C.panel2);
  s.addText([
    { text: '実行力: ', options: { bold: true, color: C.gold } },
    { text: '「若者を守る」への原点回帰から24時間で、統計の事実確認→実装→全機能検証→公開まで到達(企画者1名+AIエージェントのハイブリッドチーム)', options: { color: C.white } },
  ], { x: 0.95, y: 6.3, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 13, margin: 0 });
  footer(s, 6);
}

/* ---------- S7 インパクト ---------- */
{
  const s = baseSlide();
  header(s, 'ソーシャルインパクト', '「守られる側」から、「守る側」へ。');
  const chain = ['届く', '貼る', '気づく', 'シェアする', '友達も守る'];
  chain.forEach((c, i) => {
    const x = 0.75 + i * 2.5;
    s.addShape('ELLIPSE', { x, y: 2.25, w: 1.85, h: 1.85, fill: { color: i === 4 ? C.gold : C.panel2 }, line: { color: i === 4 ? C.gold : C.line, width: 1.5 } });
    s.addText(c, { x, y: 2.25, w: 1.85, h: 1.85, fontFace: FONT, fontSize: 16, bold: true, color: i === 4 ? C.bg : C.white, align: 'center', valign: 'middle', margin: 0 });
    if (i < 4) s.addText('→', { x: x + 1.86, y: 2.85, w: 0.65, h: 0.6, fontFace: FONT, fontSize: 22, bold: true, color: C.gold, align: 'center', margin: 0 });
  });
  const pts = [
    ['🫂 拡散が防犯になる', 'シェアカードで「ヤミバレしとけば?」が若者の合言葉に。啓発が友達経由で届く'],
    ['🏠 家族まで守る', '若者が家庭の防犯ハブに。祖父母世代のニセ警察・還付金詐欺も同じ入口でチェック'],
    ['🗾 東京から全国へ', '警察庁統計+各県警データで横展開可能。判定エンジンとデータ層は分離設計'],
  ];
  pts.forEach((p, i) => {
    const x = 0.6 + i * 4.11;
    card(s, x, 4.55, 3.94, 1.75);
    s.addText(p[0], { x: x + 0.25, y: 4.72, w: 3.44, h: 0.45, fontFace: FONT, fontSize: 14.5, bold: true, color: C.gold, margin: 0 });
    s.addText(p[1], { x: x + 0.25, y: 5.2, w: 3.44, h: 1.0, fontFace: FONT, fontSize: 11.5, color: C.sub, lineSpacing: 17, margin: 0, valign: 'top' });
  });
  s.addText('🔦 闇は、光を当てればバレる。  —  yamibare.pages.dev', { x: 0.6, y: 6.55, w: 12.1, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: C.gold, align: 'center', margin: 0 });
}

pres.writeFile({ fileName: '/Users/aikido/2026/yamibare/yamibare-pitch.pptx' }).then(() => console.log('written'));
