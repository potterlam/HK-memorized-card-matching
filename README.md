# 🃏 香港記憶配對 HK Memory Match

A bilingual (中文 / English) card-matching memory game featuring Hong Kong culture.

## 🎮 How to Play

1. **Choose your language** — 中文 or English
2. **Pick a scene** — Dim Sum, Landmarks, Transport, Festivals or Street Food
3. **Flip 3 cards** to find matching triplets: **Picture + 中文 name + English name**
4. Match all 10 sets to win!

### Helpers
- **Color Hints** — Toggle on to see grouping colours on card backs
- **Hint Button** 💡 — Briefly reveals one unmatched set
- **Auto-hints** — Appear after too many wrong attempts

## 🏙️ Scenes (5 × 10 items)

| Scene | 中文 | Items |
|-------|------|-------|
| Dim Sum | 港式點心 | 蝦餃, 燒賣, 叉燒包, 腸粉, 蛋撻 … |
| Landmarks | 香港地標 | 維多利亞港, 太平山頂, 天壇大佛 … |
| Transport | 香港交通 | 叮叮電車, 天星小輪, 港鐵 … |
| Festivals | 香港節慶 | 農曆新年, 中秋節, 端午節 … |
| Street Food | 港式街頭小食 | 咖喱魚蛋, 雞蛋仔, 菠蘿包 … |

## 🔊 Audio

- **BGM** — Procedural pentatonic ambient music (Web Audio API)
- **SFX** — Card flip, match, wrong, win sounds
- **Speech** — Chinese/English pronunciation via Web Speech API

## 🛠️ Tech

Pure HTML / CSS / JavaScript — no frameworks, no build step.  
Open `index.html` in any modern browser.

## 📁 Structure

```
├── index.html
├── css/style.css
├── js/
│   ├── data.js      # 5 scenes × 10 items
│   ├── i18n.js      # Bilingual UI strings
│   ├── audio.js     # BGM + SFX + TTS
│   └── app.js       # Game logic
└── README.md
```
