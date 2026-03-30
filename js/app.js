/* ============================================================
   Hong Kong Memory Match — Main Application
   Card-matching game with multiple modes:
     • zh-pic:    Chinese + Picture  (pairs)
     • en-pic:    English + Picture  (pairs)
     • zh-en-pic: Chinese + English + Picture (triplets)
     • zh-en:     Chinese + English  (pairs)
   ============================================================ */

const audio = new AudioManager();

const App = (() => {
  /* ── State ── */
  let lang = 'zh';
  let gameMode = 'zh-en-pic';
  let currentScene = null;
  let cards = [];
  let flippedIndices = [];
  let matchedItemIds = new Set();
  let wrongCount = 0;
  let consecutiveWrongs = 0;
  let totalAttempts = 0;
  let isProcessing = false;
  let colorHintsOn = false;
  let startTime = 0;
  let timerHandle = null;
  let hintCooldown = false;

  /* ── Helpers ── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const t = (key) => I18N[lang][key];

  function showScreen(id) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    const screen = $(`#${id}`);
    if (screen) screen.classList.add('active');
  }

  function updateUIText() {
    document.title = t('siteTitle');
    $('#lobby-title').textContent = t('lobbyTitle');
    $('#back-btn-text').textContent = t('backToLobby');
    $('#color-hint-label').textContent = t('colorHints');
    $('#hint-btn-text').textContent = t('hintBtn');
    $('#lang-switch-btn').textContent = t('langSwitch');
    $('#win-time-label').textContent = t('winTime');
    $('#win-attempts-label').textContent = t('winAttempts');
    $('#win-accuracy-label').textContent = t('winAccuracy');
    $('#replay-btn').textContent = t('replay');
    $('#lobby-btn').textContent = t('backToLobbyBtn');
  }

  /* ═══════════════════════════════════════════
     Language Screen
     ═══════════════════════════════════════════ */
  function initLangScreen() {
    $$('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        audio.init();
        lang = btn.dataset.lang;
        updateUIText();
        renderLobby();
        showScreen('lobby-screen');
      });
    });
  }

  /* ═══════════════════════════════════════════
     Lobby — Scene Selection
     ═══════════════════════════════════════════ */
  function renderLobby() {
    const grid = $('#scene-grid');
    grid.innerHTML = '';

    // Update mode selector text
    $('#mode-title').textContent = t('modeTitle');
    const modes = t('modes');
    $$('.mode-btn').forEach(btn => {
      const m = btn.dataset.mode;
      if (modes[m]) btn.querySelector('.mode-label').textContent = modes[m];
      btn.classList.toggle('active', m === gameMode);
    });

    SCENES.forEach(scene => {
      const card = document.createElement('div');
      card.className = 'scene-card';
      card.innerHTML = `
        <div class="scene-icon">${scene.icon}</div>
        <h3 class="scene-name">${lang === 'zh' ? scene.zhName : scene.enName}</h3>
        <p class="scene-desc">${lang === 'zh' ? scene.zhDesc : scene.enDesc}</p>
        <span class="scene-badge">10 ${t('items')}</span>
        <button class="scene-play-btn">${t('scenePlay')}</button>
      `;
      card.querySelector('.scene-play-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        startGame(scene.id);
      });
      card.addEventListener('click', () => startGame(scene.id));
      grid.appendChild(card);
    });
  }

  /* ═══════════════════════════════════════════
     Game Setup
     ═══════════════════════════════════════════ */
  function getCardTypes() {
    switch (gameMode) {
      case 'zh-pic':    return ['picture', 'chinese'];
      case 'en-pic':    return ['picture', 'english'];
      case 'zh-en':     return ['chinese', 'english'];
      case 'zh-en-pic': return ['picture', 'chinese', 'english'];
      default:          return ['picture', 'chinese', 'english'];
    }
  }

  function getCardsPerMatch() {
    return getCardTypes().length;
  }

  function startGame(sceneId) {
    currentScene = SCENES.find(s => s.id === sceneId);
    if (!currentScene) return;

    cards = generateCards(currentScene);
    shuffle(cards);
    flippedIndices = [];
    matchedItemIds = new Set();
    wrongCount = 0;
    consecutiveWrongs = 0;
    totalAttempts = 0;
    isProcessing = false;
    hintCooldown = false;
    startTime = Date.now();

    $('#match-count').textContent = `0/${currentScene.items.length}`;
    $('#wrong-count').textContent = '0';
    hideHintBanner();

    renderBoard();
    showScreen('game-screen');
    startTimer();
    audio.startBGM();
  }

  function generateCards(scene) {
    const result = [];
    const types = getCardTypes();
    scene.items.forEach((item, idx) => {
      const color = ITEM_COLORS[idx % ITEM_COLORS.length];
      types.forEach(type => {
        let display, label;
        if (type === 'picture') {
          display = item.emoji;
          label = t('cardTypes').picture;
        } else if (type === 'chinese') {
          display = item.zhName;
          label = t('cardTypes').chinese;
        } else {
          display = item.enName;
          label = t('cardTypes').english;
        }
        result.push({ type, itemId: item.id, display, color, label });
      });
    });
    return result;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  /* ═══════════════════════════════════════════
     Board Rendering
     ═══════════════════════════════════════════ */
  function renderBoard() {
    const grid = $('#card-grid');
    grid.innerHTML = '';

    // Dynamic columns: 6 for triplets (30 cards), 5 for pairs (20 cards)
    const cols = gameMode === 'zh-en-pic' ? 6 : 5;
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    cards.forEach((card, idx) => {
      const el = document.createElement('div');
      el.className = 'card';
      el.dataset.index = idx;

      // Build front content
      let frontContent;
      if (card.type === 'picture') {
        frontContent = `<span class="card-content card-emoji">${card.display}</span>`;
      } else {
        frontContent = `<span class="card-content">${card.display}</span>`;
      }

      el.innerHTML = `
        <div class="card-inner">
          <div class="card-back" style="${colorHintsOn ? `background-color:${card.color}` : ''}">
            <span class="card-back-icon">🃏</span>
          </div>
          <div class="card-front card-type-${card.type}">
            <span class="card-type-badge">${card.label}</span>
            ${frontContent}
          </div>
        </div>
      `;

      // Try loading custom image for picture cards
      if (card.type === 'picture') {
        const sceneId = currentScene.id;
        const img = new Image();
        img.className = 'card-img';
        img.src = `data/images/${sceneId}/${card.itemId}.png`;
        img.onload = () => {
          const emojiSpan = el.querySelector('.card-emoji');
          if (emojiSpan) {
            emojiSpan.style.display = 'none';
            emojiSpan.parentNode.insertBefore(img, emojiSpan);
          }
        };
        // On error: just keep the emoji, do nothing
      }

      el.addEventListener('click', () => onCardClick(idx));
      grid.appendChild(el);
    });
  }

  /* ═══════════════════════════════════════════
     Card Interaction
     ═══════════════════════════════════════════ */
  function onCardClick(idx) {
    if (isProcessing) return;
    if (flippedIndices.includes(idx)) return;
    if (matchedItemIds.has(cards[idx].itemId)) return;

    // Flip the card
    flippedIndices.push(idx);
    flipCardElement(idx, true);
    try { audio.playFlip(); } catch(e) {}

    // Speak the card content
    const card = cards[idx];
    if (card.type === 'chinese') {
      try { audio.speak(card.display, 'zh', card.itemId); } catch(e) {}
    } else if (card.type === 'english') {
      try { audio.speak(card.display, 'en', card.itemId); } catch(e) {}
    }

    // Check when required number of cards are flipped
    const needed = getCardsPerMatch();
    if (flippedIndices.length === needed) {
      isProcessing = true;
      totalAttempts++;
      checkMatch();
    }
  }

  function flipCardElement(idx, faceUp) {
    const el = $(`.card[data-index="${idx}"]`);
    if (!el) return;
    if (faceUp) {
      el.classList.add('flipped');
    } else {
      el.classList.remove('flipped');
    }
  }

  /* ═══════════════════════════════════════════
     Match Logic
     ═══════════════════════════════════════════ */
  function checkMatch() {
    const indices = [...flippedIndices];
    const matchCards = indices.map(i => cards[i]);

    const sameItem = matchCards.every(c => c.itemId === matchCards[0].itemId);
    const types = new Set(matchCards.map(c => c.type));
    const allDifferent = types.size === matchCards.length;

    if (sameItem && allDifferent) {
      // ✅ Correct match
      matchedItemIds.add(matchCards[0].itemId);
      consecutiveWrongs = 0;

      setTimeout(() => {
        indices.forEach(i => {
          const el = $(`.card[data-index="${i}"]`);
          if (el) el.classList.add('matched');
        });
        try { audio.playMatch(); } catch(e) {}

        // Show meaning toast
        const item = currentScene.items.find(it => it.id === matchCards[0].itemId);
        if (item) {
          showMeaningToast(item);
        }

        $('#match-count').textContent = `${matchedItemIds.size}/${currentScene.items.length}`;
        flippedIndices = [];
        isProcessing = false;

        if (matchedItemIds.size === currentScene.items.length) {
          setTimeout(gameWin, 800);
        }
      }, 400);
    } else {
      // ❌ Wrong — flip cards back after delay
      wrongCount++;
      consecutiveWrongs++;
      $('#wrong-count').textContent = wrongCount;
      try { audio.playWrong(); } catch(e) {}

      try { maybeShowHint(); } catch(e) {}

      setTimeout(() => {
        indices.forEach(i => flipCardElement(i, false));
        flippedIndices = [];
        isProcessing = false;
      }, 1200);
    }
  }

  /* ═══════════════════════════════════════════
     Meaning Toast (on match)
     ═══════════════════════════════════════════ */
  function showMeaningToast(item) {
    const existing = $('.meaning-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'meaning-toast';
    toast.innerHTML = `
      <span class="toast-emoji">${item.emoji}</span>
      <div class="toast-text">
        <strong>${item.zhName} — ${item.enName}</strong><br>
        <small>${lang === 'zh' ? item.zhMeaning : item.enMeaning}</small>
      </div>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  /* ═══════════════════════════════════════════
     Hint System
     ═══════════════════════════════════════════ */
  function maybeShowHint() {
    if (consecutiveWrongs >= 6 && !hintCooldown) {
      showStrongHint();
    } else if (consecutiveWrongs >= 3) {
      showTextHint();
    }
  }

  function showTextHint() {
    const msgs = t('hintMessages');
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    showHintBanner(msg);
  }

  function showStrongHint() {
    hintCooldown = true;
    showHintBanner(t('strongHint'));

    // Find an unmatched item and flash its cards
    const unmatchedItem = currentScene.items.find(it => !matchedItemIds.has(it.id));
    if (unmatchedItem) {
      cards.forEach((card, idx) => {
        if (card.itemId === unmatchedItem.id) {
          const el = $(`.card[data-index="${idx}"]`);
          if (el) el.classList.add('hint-flash');
        }
      });

      setTimeout(() => {
        $$('.card.hint-flash').forEach(el => el.classList.remove('hint-flash'));
        hintCooldown = false;
      }, 2000);
    }

    audio.playHint();
    consecutiveWrongs = 0;
  }

  function onManualHint() {
    if (hintCooldown) return;
    if (matchedItemIds.size >= currentScene.items.length) return;

    // Brief reveal: flash an unmatched set
    hintCooldown = true;
    const unmatchedItem = currentScene.items.find(it => !matchedItemIds.has(it.id));
    if (!unmatchedItem) return;

    const indices = [];
    cards.forEach((card, idx) => {
      if (card.itemId === unmatchedItem.id) indices.push(idx);
    });

    indices.forEach(i => {
      flipCardElement(i, true);
      const el = $(`.card[data-index="${i}"]`);
      if (el) el.classList.add('hint-flash');
    });

    audio.playHint();

    setTimeout(() => {
      indices.forEach(i => {
        if (!matchedItemIds.has(cards[i].itemId)) {
          flipCardElement(i, false);
        }
        const el = $(`.card[data-index="${i}"]`);
        if (el) el.classList.remove('hint-flash');
      });
      hintCooldown = false;
    }, 1500);
  }

  function showHintBanner(text) {
    const banner = $('#hint-banner');
    banner.textContent = text;
    banner.classList.remove('hidden');
    setTimeout(() => banner.classList.add('hidden'), 3500);
  }

  function hideHintBanner() {
    $('#hint-banner').classList.add('hidden');
  }

  /* ═══════════════════════════════════════════
     Color Hints Toggle
     ═══════════════════════════════════════════ */
  function toggleColorHints(on) {
    colorHintsOn = on;
    cards.forEach((card, idx) => {
      const backEl = $(`.card[data-index="${idx}"] .card-back`);
      if (backEl) {
        backEl.style.backgroundColor = on ? card.color : '';
      }
    });
  }

  /* ═══════════════════════════════════════════
     Timer
     ═══════════════════════════════════════════ */
  function startTimer() {
    stopTimer();
    timerHandle = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      $('#timer').textContent = `${m}:${s}`;
    }, 250);
  }

  function stopTimer() {
    if (timerHandle) {
      clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  function getElapsedTime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  /* ═══════════════════════════════════════════
     Win Screen
     ═══════════════════════════════════════════ */
  function gameWin() {
    stopTimer();
    audio.stopBGM();
    audio.playWin();

    const time = getElapsedTime();
    const accuracy = totalAttempts > 0
      ? Math.round((currentScene.items.length / totalAttempts) * 100) + '%'
      : '100%';

    $('#win-title').textContent = t('winTitle');
    $('#win-time').textContent = time;
    $('#win-attempts').textContent = totalAttempts;
    $('#win-accuracy').textContent = accuracy;
    $('#win-time-label').textContent = t('winTime');
    $('#win-attempts-label').textContent = t('winAttempts');
    $('#win-accuracy-label').textContent = t('winAccuracy');
    $('#replay-btn').textContent = t('replay');
    $('#lobby-btn').textContent = t('backToLobbyBtn');

    showScreen('win-screen');
  }

  /* ═══════════════════════════════════════════
     Navigation
     ═══════════════════════════════════════════ */
  function goToLobby() {
    stopTimer();
    audio.stopBGM();
    isProcessing = false;
    flippedIndices = [];
    updateUIText();
    renderLobby();
    showScreen('lobby-screen');
  }

  /* ═══════════════════════════════════════════
     How to Play Modal
     ═══════════════════════════════════════════ */
  function showHowToPlay() {
    const existing = $('#how-to-play-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'how-to-play-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <h2>${t('howToPlay')}</h2>
        <ul>
          ${t('howToPlayText').map(line => `<li>${line}</li>`).join('')}
        </ul>
        <button class="primary-btn modal-close">${t('gotIt')}</button>
      </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('show'));
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      }
    });
  }

  /* ═══════════════════════════════════════════
     Bind All Events
     ═══════════════════════════════════════════ */
  function bindEvents() {
    // Language screen
    initLangScreen();

    // Lobby controls
    $('#lang-switch-btn').addEventListener('click', () => {
      lang = lang === 'zh' ? 'en' : 'zh';
      updateUIText();
      renderLobby();
    });

    $('#bgm-toggle-btn').addEventListener('click', () => {
      audio.init();
      const on = audio.toggleBGM();
      $('#bgm-toggle-btn').textContent = on ? t('bgmOn') : t('bgmOff');
    });

    // How to play button
    $('#how-to-play-btn').addEventListener('click', showHowToPlay);

    // Game screen controls
    $('#back-to-lobby').addEventListener('click', goToLobby);

    $('#color-hint-checkbox').addEventListener('change', (e) => {
      toggleColorHints(e.target.checked);
    });

    $('#hint-btn').addEventListener('click', onManualHint);

    $('#bgm-game-toggle').addEventListener('click', () => {
      const on = audio.toggleBGM();
      $('#bgm-game-toggle').textContent = on ? t('bgmOn') : t('bgmOff');
    });

    // Game mode selector
    $$('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        gameMode = btn.dataset.mode;
        $$('.mode-btn').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    // Win screen
    $('#replay-btn').addEventListener('click', () => {
      if (currentScene) startGame(currentScene.id);
    });

    $('#lobby-btn').addEventListener('click', goToLobby);
  }

  /* ═══════════════════════════════════════════
     Boot
     ═══════════════════════════════════════════ */
  function init() {
    bindEvents();
    showScreen('lang-screen');
  }

  return { init };
})();

/* ── Start ── */
document.addEventListener('DOMContentLoaded', App.init);
