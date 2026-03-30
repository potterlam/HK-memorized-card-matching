# 🃏 香港記憶配對 HK Memory Match

A bilingual (中文 / English) card-matching memory game featuring Hong Kong culture.

https://potterlam.github.io/HK-memorized-card-matching/

## 🎮 How to Play

1. **Choose your language** — 中文 or English
2. **Pick a game mode** — 4 modes available:
   - 中文 & 圖片 (Chinese & Pic) — match pairs
   - Eng & 圖片 (English & Pic) — match pairs
   - 中文 & Eng & 圖片 (Chinese & Eng & Pic) — match triplets
   - 中文 & English (Chinese & English) — match pairs
3. **Pick a scene** — Dim Sum, Landmarks, Transport, Festivals or Street Food
4. **Flip cards** to find matching sets
5. Match all 10 sets to win!

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

## 📝 Customising Content

### Edit Words & Meanings
Open `js/data.js` in any text editor. Each item has clear fields:
```
zhName: '蝦餃',        ← Chinese name
enName: 'Har Gow',     ← English name
zhMeaning: '...',       ← Chinese description
enMeaning: '...',       ← English description
emoji: '🥟',            ← fallback emoji
```

### Custom Images
Replace the emoji with a picture by saving an image to:
```
data/images/<scene-id>/<item-id>.png
```
Example: `data/images/dimsum/hargow.png`

### Custom Audio
Replace text-to-speech with your own recordings:
```
data/audio/zh/<item-id>.mp3   (Chinese pronunciation)
data/audio/en/<item-id>.mp3   (English pronunciation)
```

## 🔊 Audio

- **BGM** — Procedural pentatonic ambient music (Web Audio API)
- **SFX** — Card flip, match, wrong, win sounds
- **Speech** — Custom audio files → Web Speech API fallback

## 🛠️ Tech

Pure HTML / CSS / JavaScript — no frameworks, no build step.  
Open `index.html` in any modern browser.

## 📁 Structure

```
├── index.html
├── css/style.css
├── js/
│   ├── data.js       # 5 scenes × 10 items (human-editable)
│   ├── i18n.js       # Bilingual UI strings
│   ├── audio.js      # BGM + SFX + TTS
│   └── app.js        # Game logic
├── data/
│   ├── images/       # Custom card images (optional)
│   │   ├── dimsum/
│   │   ├── landmarks/
│   │   ├── transport/
│   │   ├── festivals/
│   │   └── streetfood/
│   └── audio/        # Custom pronunciation (optional)
│       ├── zh/
│       └── en/
└── README.md
```
