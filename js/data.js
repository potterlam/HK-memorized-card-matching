/* ============================================================
   Hong Kong Memory Match — Game Data
   5 Scenes × 10 Items each
   ============================================================

   📝 HOW TO EDIT THIS FILE
   ─────────────────────────
   • To change a word:  edit the zhName or enName field below
   • To change meaning: edit the zhMeaning or enMeaning field
   • To change emoji:   edit the emoji field

   🖼️ CUSTOM IMAGES (optional — replaces emoji on cards)
   ─────────────────────────────────────────────────────
   Save image as:  data/images/<scene-id>/<item-id>.png
   Example:        data/images/dimsum/hargow.png
   Supported:      .png .jpg .webp

   🔊 CUSTOM AUDIO (optional — replaces text-to-speech)
   ────────────────────────────────────────────────────
   Save audio as:  data/audio/zh/<item-id>.mp3   (Chinese)
                   data/audio/en/<item-id>.mp3   (English)
   Example:        data/audio/zh/hargow.mp3

   ============================================================ */

// 10 visually distinct colours for the colour-hint feature
const ITEM_COLORS = [
  '#E53935',  // 1  Red
  '#1E88E5',  // 2  Blue
  '#43A047',  // 3  Green
  '#FDD835',  // 4  Yellow
  '#8E24AA',  // 5  Purple
  '#FB8C00',  // 6  Orange
  '#D81B60',  // 7  Pink
  '#00ACC1',  // 8  Cyan
  '#6D4C41',  // 9  Brown
  '#546E7A',  // 10 Blue-Grey
];

const SCENES = [
  /* ──────────────────────────────────────────
     Scene 1 — 港式點心  Dim Sum
     ────────────────────────────────────────── */
  {
    id: 'dimsum',
    zhName: '港式點心',
    enName: 'Dim Sum',
    zhDesc: '認識香港傳統點心文化',
    enDesc: 'Discover traditional Hong Kong dim sum',
    icon: '🥟',
    items: [
      {
        id: 'hargow',
        emoji: '🥟',
        zhName: '蝦餃',
        enName: 'Har Gow',
        zhMeaning: '港式點心之王，以透明蝦餃皮包裹鮮蝦',
        enMeaning: 'King of dim sum — fresh shrimp in translucent wrapper',
        color: ITEM_COLORS[0]
      },
      {
        id: 'siumai',
        emoji: '🧆',
        zhName: '燒賣',
        enName: 'Siu Mai',
        zhMeaning: '開口豬肉鮮蝦餃，頂部常綴以蟹黃',
        enMeaning: 'Open-topped pork & shrimp dumpling, often with crab roe',
        color: ITEM_COLORS[1]
      },
      {
        id: 'charsiubao',
        emoji: '🫓',
        zhName: '叉燒包',
        enName: 'Char Siu Bao',
        zhMeaning: '鬆軟白包內藏甜蜜叉燒餡',
        enMeaning: 'Fluffy steamed bun filled with sweet BBQ pork',
        color: ITEM_COLORS[2]
      },
      {
        id: 'cheungfun',
        emoji: '🌯',
        zhName: '腸粉',
        enName: 'Cheung Fun',
        zhMeaning: '滑嫩米漿卷，可包蝦、牛肉或叉燒',
        enMeaning: 'Silky rice noodle roll with shrimp, beef or BBQ pork',
        color: ITEM_COLORS[3]
      },
      {
        id: 'eggtart',
        emoji: '🥧',
        zhName: '蛋撻',
        enName: 'Egg Tart',
        zhMeaning: '酥脆撻皮配香滑蛋漿，港式經典',
        enMeaning: 'Crispy pastry shell with smooth egg custard filling',
        color: ITEM_COLORS[4]
      },
      {
        id: 'fengzhua',
        emoji: '🐔',
        zhName: '鳳爪',
        enName: 'Phoenix Claws',
        zhMeaning: '豉汁蒸雞爪，口感軟糯入味',
        enMeaning: 'Steamed chicken feet in black bean sauce',
        color: ITEM_COLORS[5]
      },
      {
        id: 'turnip',
        emoji: '🟫',
        zhName: '蘿蔔糕',
        enName: 'Turnip Cake',
        zhMeaning: '由蘿蔔絲和米漿製成，香煎至金黃',
        enMeaning: 'Pan-fried cake made with shredded radish and rice flour',
        color: ITEM_COLORS[6]
      },
      {
        id: 'lavabun',
        emoji: '🟡',
        zhName: '流沙包',
        enName: 'Lava Custard Bun',
        zhMeaning: '鹹蛋黃奶黃流心包，咬開金黃流沙',
        enMeaning: 'Steamed bun with molten salted egg yolk custard',
        color: ITEM_COLORS[7]
      },
      {
        id: 'springroll',
        emoji: '🌮',
        zhName: '春卷',
        enName: 'Spring Roll',
        zhMeaning: '酥脆炸春卷，內餡鮮蔬肉絲',
        enMeaning: 'Crispy deep-fried roll with vegetables and meat',
        color: ITEM_COLORS[8]
      },
      {
        id: 'lomaigai',
        emoji: '🍃',
        zhName: '糯米雞',
        enName: 'Lo Mai Gai',
        zhMeaning: '荷葉包裹糯米飯，內有雞肉冬菇',
        enMeaning: 'Sticky rice with chicken & mushroom in lotus leaf',
        color: ITEM_COLORS[9]
      }
    ]
  },

  /* ──────────────────────────────────────────
     Scene 2 — 香港地標  Landmarks
     ────────────────────────────────────────── */
  {
    id: 'landmarks',
    zhName: '香港地標',
    enName: 'HK Landmarks',
    zhDesc: '探索香港著名地標景點',
    enDesc: 'Explore iconic Hong Kong landmarks',
    icon: '🏙️',
    items: [
      {
        id: 'harbour',
        emoji: '🌊',
        zhName: '維多利亞港',
        enName: 'Victoria Harbour',
        zhMeaning: '世界三大天然良港之一，香港標誌性海港',
        enMeaning: 'One of the world\'s finest natural harbours, iconic HK waterfront',
        color: ITEM_COLORS[0]
      },
      {
        id: 'peak',
        emoji: '⛰️',
        zhName: '太平山頂',
        enName: 'Victoria Peak',
        zhMeaning: '香港最高點，俯瞰維港全景的最佳地點',
        enMeaning: 'Highest point on HK Island with panoramic harbour views',
        color: ITEM_COLORS[1]
      },
      {
        id: 'buddha',
        emoji: '🧘',
        zhName: '天壇大佛',
        enName: 'Tian Tan Buddha',
        zhMeaning: '大嶼山寶蓮寺的巨型青銅佛像',
        enMeaning: 'Giant bronze Buddha statue at Po Lin Monastery, Lantau',
        color: ITEM_COLORS[2]
      },
      {
        id: 'stars',
        emoji: '⭐',
        zhName: '星光大道',
        enName: 'Avenue of Stars',
        zhMeaning: '尖沙咀海濱長廊，向香港電影致敬',
        enMeaning: 'Tsim Sha Tsui waterfront promenade honouring HK cinema',
        color: ITEM_COLORS[3]
      },
      {
        id: 'wongtaisin',
        emoji: '🛕',
        zhName: '黃大仙祠',
        enName: 'Wong Tai Sin Temple',
        zhMeaning: '香港最著名的道教廟宇，有求必應',
        enMeaning: 'Most famous Taoist temple in HK, known for granting wishes',
        color: ITEM_COLORS[4]
      },
      {
        id: 'clocktower',
        emoji: '🕐',
        zhName: '尖沙咀鐘樓',
        enName: 'Clock Tower',
        zhMeaning: '建於1915年，前九廣鐵路總站遺跡',
        enMeaning: 'Built in 1915, remnant of the old Kowloon-Canton Railway terminus',
        color: ITEM_COLORS[5]
      },
      {
        id: 'wheel',
        emoji: '🎡',
        zhName: '香港摩天輪',
        enName: 'HK Observation Wheel',
        zhMeaning: '中環海濱的巨型摩天輪，飽覽維港景色',
        enMeaning: 'Giant Ferris wheel on Central harbourfront with stunning views',
        color: ITEM_COLORS[6]
      },
      {
        id: 'bauhinia',
        emoji: '🌺',
        zhName: '金紫荊廣場',
        enName: 'Golden Bauhinia Square',
        zhMeaning: '紀念香港回歸的金色紫荊花雕塑廣場',
        enMeaning: 'Square with golden Bauhinia sculpture commemorating the handover',
        color: ITEM_COLORS[7]
      },
      {
        id: 'stanley',
        emoji: '🏪',
        zhName: '赤柱市集',
        enName: 'Stanley Market',
        zhMeaning: '港島南區著名露天市集，充滿異國風情',
        enMeaning: 'Famous open-air market on the south side of HK Island',
        color: ITEM_COLORS[8]
      },
      {
        id: 'nanlian',
        emoji: '🏯',
        zhName: '南蓮園池',
        enName: 'Nan Lian Garden',
        zhMeaning: '鑽石山仿唐式園林，寧靜優雅',
        enMeaning: 'Tang-dynasty-style garden in Diamond Hill, serene and elegant',
        color: ITEM_COLORS[9]
      }
    ]
  },

  /* ──────────────────────────────────────────
     Scene 3 — 香港交通  Transportation
     ────────────────────────────────────────── */
  {
    id: 'transport',
    zhName: '香港交通',
    enName: 'HK Transport',
    zhDesc: '認識香港獨特的交通工具',
    enDesc: 'Discover Hong Kong\'s unique transportation',
    icon: '🚋',
    items: [
      {
        id: 'tram',
        emoji: '🚋',
        zhName: '叮叮',
        enName: 'Ding Ding Tram',
        zhMeaning: '全球唯一全線雙層電車系統，行走港島北岸',
        enMeaning: 'World\'s only fully double-decker tram fleet along HK Island',
        color: ITEM_COLORS[0]
      },
      {
        id: 'starferry',
        emoji: '⛴️',
        zhName: '天星小輪',
        enName: 'Star Ferry',
        zhMeaning: '自1888年起穿梭維多利亞港的標誌性渡輪',
        enMeaning: 'Iconic ferry crossing Victoria Harbour since 1888',
        color: ITEM_COLORS[1]
      },
      {
        id: 'mtr',
        emoji: '🚇',
        zhName: '港鐵',
        enName: 'MTR',
        zhMeaning: '香港高效快捷的地鐵和鐵路系統',
        enMeaning: 'Hong Kong\'s efficient rapid transit railway system',
        color: ITEM_COLORS[2]
      },
      {
        id: 'minibus',
        emoji: '🚐',
        zhName: '小巴',
        enName: 'Minibus',
        zhMeaning: '紅色或綠色小型巴士，遍佈大街小巷',
        enMeaning: 'Red or green public light buses serving every neighbourhood',
        color: ITEM_COLORS[3]
      },
      {
        id: 'doubledecker',
        emoji: '🚌',
        zhName: '雙層巴士',
        enName: 'Double-decker Bus',
        zhMeaning: '行走全港的雙層巴士，上層景觀極佳',
        enMeaning: 'Ubiquitous double-decker buses with great top-deck views',
        color: ITEM_COLORS[4]
      },
      {
        id: 'taxi',
        emoji: '🚕',
        zhName: '的士',
        enName: 'Taxi',
        zhMeaning: '紅色市區的士、綠色新界的士、藍色大嶼山的士',
        enMeaning: 'Red (urban), green (New Territories) and blue (Lantau) taxis',
        color: ITEM_COLORS[5]
      },
      {
        id: 'peaktram',
        emoji: '🚞',
        zhName: '山頂纜車',
        enName: 'Peak Tram',
        zhMeaning: '自1888年運行的登山纜車，通往太平山頂',
        enMeaning: 'Funicular railway to Victoria Peak, running since 1888',
        color: ITEM_COLORS[6]
      },
      {
        id: 'sampan',
        emoji: '🚣',
        zhName: '舢舨',
        enName: 'Sampan',
        zhMeaning: '傳統木製小船，常見於避風塘和漁村',
        enMeaning: 'Traditional wooden boat common in typhoon shelters and villages',
        color: ITEM_COLORS[7]
      },
      {
        id: 'np360',
        emoji: '🚡',
        zhName: '昂坪360',
        enName: 'Ngong Ping 360',
        zhMeaning: '連接東涌至昂坪的觀光纜車',
        enMeaning: 'Scenic cable car linking Tung Chung to Ngong Ping',
        color: ITEM_COLORS[8]
      },
      {
        id: 'escalator',
        emoji: '🏗️',
        zhName: '半山自動扶梯',
        enName: 'Mid-Levels Escalator',
        zhMeaning: '全球最長戶外有蓋自動扶梯系統',
        enMeaning: 'World\'s longest outdoor covered escalator system',
        color: ITEM_COLORS[9]
      }
    ]
  },

  /* ──────────────────────────────────────────
     Scene 4 — 香港節慶  Festivals
     ────────────────────────────────────────── */
  {
    id: 'festivals',
    zhName: '香港節慶',
    enName: 'HK Festivals',
    zhDesc: '體驗香港傳統節慶文化',
    enDesc: 'Experience traditional Hong Kong festivals',
    icon: '🏮',
    items: [
      {
        id: 'cny',
        emoji: '🧧',
        zhName: '農曆新年',
        enName: 'Lunar New Year',
        zhMeaning: '最重要的傳統節日，舞獅花車煙花慶祝',
        enMeaning: 'The biggest traditional festival — lion dances, parades & fireworks',
        color: ITEM_COLORS[0]
      },
      {
        id: 'midautumn',
        emoji: '🥮',
        zhName: '中秋節',
        enName: 'Mid-Autumn Festival',
        zhMeaning: '賞月吃月餅提燈籠的團圓節日',
        enMeaning: 'Festival of reunion — moon-gazing, mooncakes & lanterns',
        color: ITEM_COLORS[1]
      },
      {
        id: 'dragonboat',
        emoji: '🐉',
        zhName: '端午節',
        enName: 'Dragon Boat Festival',
        zhMeaning: '紀念屈原，賽龍舟吃粽子',
        enMeaning: 'Dragon boat races and rice dumplings in honour of Qu Yuan',
        color: ITEM_COLORS[2]
      },
      {
        id: 'bunfest',
        emoji: '🧁',
        zhName: '長洲太平清醮',
        enName: 'Cheung Chau Bun Festival',
        zhMeaning: '長洲島獨特的搶包山及飄色巡遊活動',
        enMeaning: 'Unique bun-scrambling competition & parade on Cheung Chau Island',
        color: ITEM_COLORS[3]
      },
      {
        id: 'lantern',
        emoji: '🏮',
        zhName: '元宵節',
        enName: 'Lantern Festival',
        zhMeaning: '農曆新年最後一天，賞花燈猜燈謎',
        enMeaning: 'Final day of New Year celebrations with lantern displays & riddles',
        color: ITEM_COLORS[4]
      },
      {
        id: 'ghost',
        emoji: '👻',
        zhName: '盂蘭節',
        enName: 'Hungry Ghost Festival',
        zhMeaning: '農曆七月祭祀先人，燒衣紙及盂蘭勝會',
        enMeaning: 'Seventh lunar month — offerings and operas for wandering spirits',
        color: ITEM_COLORS[5]
      },
      {
        id: 'chungyang',
        emoji: '🏔️',
        zhName: '重陽節',
        enName: 'Chung Yeung Festival',
        zhMeaning: '農曆九月初九登高望遠，敬老祭祖',
        enMeaning: 'Double Ninth Festival — hill climbing and ancestor worship',
        color: ITEM_COLORS[6]
      },
      {
        id: 'tinhau',
        emoji: '⛵',
        zhName: '天后誕',
        enName: 'Tin Hau Festival',
        zhMeaning: '紀念海上守護神天后娘娘的漁民節日',
        enMeaning: 'Fishermen\'s festival honouring Tin Hau, Goddess of the Sea',
        color: ITEM_COLORS[7]
      },
      {
        id: 'parade',
        emoji: '🎭',
        zhName: '花車巡遊',
        enName: 'Cathay Night Parade',
        zhMeaning: '農曆新年晚間花車巡遊，載歌載舞',
        enMeaning: 'Spectacular Lunar New Year night parade with floats & performers',
        color: ITEM_COLORS[8]
      },
      {
        id: 'firedragon',
        emoji: '🔥',
        zhName: '大坑舞火龍',
        enName: 'Tai Hang Fire Dragon',
        zhMeaning: '中秋期間大坑區的舞火龍傳統儀式',
        enMeaning: 'Fire dragon dance ritual in Tai Hang during Mid-Autumn Festival',
        color: ITEM_COLORS[9]
      }
    ]
  },

  /* ──────────────────────────────────────────
     Scene 5 — 港式街頭小食  Street Food
     ────────────────────────────────────────── */
  {
    id: 'streetfood',
    zhName: '港式街頭小食',
    enName: 'HK Street Food',
    zhDesc: '品嚐香港地道街頭美食',
    enDesc: 'Taste authentic Hong Kong street snacks',
    icon: '🍢',
    items: [
      {
        id: 'fishball',
        emoji: '🟠',
        zhName: '咖喱魚蛋',
        enName: 'Curry Fish Balls',
        zhMeaning: '以咖喱汁浸泡的彈牙魚蛋，街頭經典',
        enMeaning: 'Bouncy fish balls soaked in curry sauce — the ultimate street snack',
        color: ITEM_COLORS[0]
      },
      {
        id: 'eggwaffle',
        emoji: '🧇',
        zhName: '雞蛋仔',
        enName: 'Egg Waffle',
        zhMeaning: '蛋漿烤成的球狀格子餅，外脆內軟',
        enMeaning: 'Spherical egg batter waffle — crispy outside, soft inside',
        color: ITEM_COLORS[1]
      },
      {
        id: 'pineapplebun',
        emoji: '🍞',
        zhName: '菠蘿包',
        enName: 'Pineapple Bun',
        zhMeaning: '酥脆甜皮配鬆軟麵包，並無菠蘿成分',
        enMeaning: 'Sweet crunchy-topped bun — no actual pineapple inside!',
        color: ITEM_COLORS[2]
      },
      {
        id: 'sharkfin',
        emoji: '🥣',
        zhName: '碗仔翅',
        enName: 'Imitation Shark Fin Soup',
        zhMeaning: '以粉絲木耳代替魚翅的平民美食',
        enMeaning: 'Affordable street soup with vermicelli & mushroom, no real shark fin',
        color: ITEM_COLORS[3]
      },
      {
        id: 'stinkytofu',
        emoji: '🧈',
        zhName: '臭豆腐',
        enName: 'Stinky Tofu',
        zhMeaning: '發酵豆腐油炸至金黃，聞臭食香',
        enMeaning: 'Deep-fried fermented tofu — smells bad, tastes amazing',
        color: ITEM_COLORS[4]
      },
      {
        id: 'hkwaffle',
        emoji: '🔲',
        zhName: '格仔餅',
        enName: 'Hong Kong Waffle',
        zhMeaning: '格子狀鬆餅塗上花生醬牛油和煉乳',
        enMeaning: 'Grid-shaped waffle with peanut butter, butter & condensed milk',
        color: ITEM_COLORS[5]
      },
      {
        id: 'friedtrio',
        emoji: '🍢',
        zhName: '煎釀三寶',
        enName: 'Deep-fried Trio',
        zhMeaning: '茄子、青椒、豆腐釀入魚肉漿後油炸',
        enMeaning: 'Eggplant, pepper & tofu stuffed with fish paste then fried',
        color: ITEM_COLORS[6]
      },
      {
        id: 'beefoffal',
        emoji: '🥘',
        zhName: '牛雜',
        enName: 'Beef Offal',
        zhMeaning: '以柱侯醬炆煮的牛內臟，濃郁惹味',
        enMeaning: 'Braised beef organs in savoury chu hou sauce',
        color: ITEM_COLORS[7]
      },
      {
        id: 'putchaiko',
        emoji: '🍮',
        zhName: '砵仔糕',
        enName: 'Put Chai Ko',
        zhMeaning: '小碗蒸紅豆糕，口感煙韌軟糯',
        enMeaning: 'Small steamed red bean pudding, chewy and sweet',
        color: ITEM_COLORS[8]
      },
      {
        id: 'cartnoodles',
        emoji: '🍜',
        zhName: '車仔麵',
        enName: 'Cart Noodles',
        zhMeaning: '自選配料和醬汁的街頭麵檔',
        enMeaning: 'Build-your-own noodles with toppings and sauces from a cart',
        color: ITEM_COLORS[9]
      }
    ]
  }
];
