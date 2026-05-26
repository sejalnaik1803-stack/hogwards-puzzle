import {
  PuzzleArtwork,
  PuzzleThemeType,
  StarParam,
  CloudParam,
  FlowerParam,
  MushroomParam,
  RibbonParam,
} from "../types";

export interface SceneMetadata {
  index: number;
  title: string;
  subtitle: string;
  theme: PuzzleThemeType;
  description: string;
  imageUrl?: string;
}

export const COZY_SCENES: SceneMetadata[] = [
  { index: 0, title: "The Wand Repair Station", subtitle: "Sparks fly at train platform Track 3", theme: "cozy-slumber", description: "A dusty wand-maker's workbench inside a quiet compartment near Track 3, smelling of cedarwood, glowing gaslights, and active magical currents.", imageUrl: "/src/assets/images/wand_repair_station_1779641192802.png" },
  { index: 1, title: "The Floating Puzzle Table", subtitle: "Enchanted blueprints and floating scrolls", theme: "cozy-celestial", description: "A secret, circular, high-arched celestial chamber where parchment scrolls drift gently around a stone table displaying a glowing star-sharded jigsaw board.", imageUrl: "/src/assets/images/floating_puzzle_table_1779641222518.png" },
  { index: 2, title: "The Astronomical Observatory", subtitle: "Midnight stardust and spinning brass charts", theme: "cozy-celestial", description: "A magical observatory tower containing giant heavy brass telescopes, starry maps, drifting candles, and high gothic arches framing a swirling galaxy.", imageUrl: "/src/assets/images/astronomical_observatory_1779641241307.png" },
  { index: 3, title: "The Hall of Pensieves", subtitle: "Luminescent memory mists swirling in stone", theme: "meadow-magic", description: "An ancient subterranean dungeon chapel with heavy brick arches hosting stone basins filled with glowing silvery wisps of liquid memories.", imageUrl: "/src/assets/images/hall_of_pensieves_1779641258393.png" },
  { index: 4, title: "The Enchanted Forest Pond", subtitle: "Neon mushrooms reflected in moonlit waters", theme: "meadow-magic", description: "A secret glade in the night woodlands featuring soft purple fog under a full moon, with stardust hovering above a still forest pond.", imageUrl: "/src/assets/images/enchanted_forest_pond_1779641274715.png" },
  { index: 5, title: "The Midnight Owlry Balcony", subtitle: "Snowy owls perched under mountain moonbeams", theme: "cozy-celestial", description: "High, quiet castle battlements overlooking a distant misty castle under the bright full moon, where pristine owls doze quietly next to mail chest towers.", imageUrl: "/src/assets/images/midnight_owlry_1779641291834.png" },
  { index: 6, title: "The Dark Forest Runic Path", subtitle: "Ethereal runic stones and forest paths", theme: "meadow-magic", description: "A deep violet-lit pathway through dense gnarled trees, accompanied by ancient stone monoliths carved with glowing magical symbols.", imageUrl: "/src/assets/images/dark_forest_runic_path_1779641309575.png" },
  { index: 7, title: "The Lake of Patronuses", subtitle: "Ethereal animal spirits guarding water shorelines", theme: "cozy-celestial", description: "A beautiful highland lake where glowing blue stags, foxes, and wild birds play on the water surface underneath a giant bright moonlit sky.", imageUrl: "/src/assets/images/lake_of_patronuses_1779641325742.png" },
  { index: 8, title: "Potions Classroom Desk", subtitle: "Bubbling cauldrons and open spellbooks", theme: "meadow-magic", description: "An open copy of Advanced Potion Making next to a bubbling cauldron, cluttered with mystical emerald glass vials, candles, and dried potion herbs on a rustic workbench.", imageUrl: "/src/assets/images/potions_desk_1779641354099.png" },
  { index: 9, title: "The Glass Greenhouse", subtitle: "Cozy lanterns and rainy wisteria vines", theme: "star-tea", description: "A Victorian ironwork greenhouse filled with lush ferns and purple wisteria plants, illuminated by warm gold lamps amid a cozy nighttime rainstorm.", imageUrl: "/src/assets/images/glass_greenhouse_1779641373212.png" },
  { index: 10, title: "The Grand Magical Archives", subtitle: "Towering bookshelves and books in flight", theme: "cozy-slumber", description: "A vast multistory library hall with soaring academic galleries, lit candles, and self-flying leather-bound tomes gliding through the air.", imageUrl: "/src/assets/images/grand_archives_1779641390981.png" },
  { index: 11, title: "The Blue Fire Great Hall", subtitle: "Grand columns and cobalt-glowing basins", theme: "cozy-celestial", description: "A cinematic castle great hall flanked by standard house crest banners and high arches, casting blue fire flame shadows onto reflective dark wet stone tiles.", imageUrl: "/src/assets/images/blue_fire_throne_room_1779641411479.png" },
  { index: 12, title: "The Fireside Armchair", subtitle: "Warm hearth and snowy towers outdoors", theme: "cozy-slumber", description: "A highly cozy velvet armchair nestled in a tower common room by a blazing fire, with floating candles above and silent snow drifting past glass windows.", imageUrl: "/src/assets/images/fireside_armchair_1779641426595.png" },
  { index: 13, title: "The Underwater Ruins", subtitle: "Flooded chambers of runic magic", theme: "meadow-magic", description: "A mystical underwater runic temple hall where glowing ancient symbols shimmer beneath still water pools under a circular lunar portal window.", imageUrl: "/src/assets/images/underwater_ruins_1779641442285.png" },
  { index: 14, title: "The Golden Wand on Desk", subtitle: "Intricate wand and celestial drawing scripts", theme: "star-tea", description: "A close-up of a twisted golden wand resting of a dark velvet cushion on an academic wood desk scattered with astronomical graphs, stardust, and warm lamps.", imageUrl: "/src/assets/images/golden_wand_on_desk_1779641460913.png" },
];

const POETRIES_COSMIC = [
  "Expecto Patronum! Radiant silver vapor fills the sky...",
  "Lumos Maxima! Bright golden stardust expels the shadows...",
  "Aura Revelio! Unveil the secrets of the ancient stars...",
  "Wingardium Leviosa! Shards of light rise high in the air...",
  "Mischief Managed! Safe under the starry map...",
  "Follow the silver stag where hope leads...",
];

const POETRIES_MEADOW = [
  "Alohomora! Aligning the mossy runic locks...",
  "Herbivicus! Let the magical green sprouts grow...",
  "Secrets whispered by the mandrake leaves in the damp greenhouse...",
  "A soft glowing light to guide you through the forbidden paths...",
  "Ancient runes carved in emerald stone columns...",
  "Listen to the quiet melody of the Black Lake water...",
];

const POETRIES_TEA = [
  "Cast Aguamenti! Pure spring water brews sweet wishes...",
  "Sipping butterbeer under warm copper lamps...",
  "A potion of warm ginger and stardust spices...",
  "Let the mist carry laughter to the Great Hall...",
  "Rest in Hufflepuff's warm wood-barrel kitchen...",
  "Chamomile infusions to soothe the spellcaster's thoughts...",
];

const POETRIES_SLUMBER = [
  "Expecto Patronum! A silver shield wraps you in peace...",
  "Wrapped in red Gryffindor velvet and golden blankets...",
  "Quiet hooting of snowy owls in the misty tower...",
  "Cradle your spells under soft parchment clouds...",
  "Sleep well, the Hogwarts castle wards are watching...",
  "Warm embers dance on the library rugs...",
];

function makeId() {
  return Math.random().toString(36).substring(2, 9);
}

function randomChoose<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateArtwork(sceneIndex: number): PuzzleArtwork {
  const metadata = COZY_SCENES[sceneIndex % COZY_SCENES.length];
  const { theme, title, subtitle } = metadata;

  let bgColorStart = "#1E1E38";
  let bgColorEnd = "#3B2D54";
  let accentColor = "#FFD166";
  let coreType: "moon" | "mushroom" | "teapot" | "cupcake" = "moon";
  let coreColor = "#FFF8E7";
  let coreSecondaryColor = "#E0C3FC";
  let poetry = "";

  // Dynamic Ghibli-palette selection tailored to themes
  switch (theme) {
    case "cozy-celestial":
      bgColorStart = "#1A1938"; // Moonlight night blue
      bgColorEnd = "#44355B";   // Lilac mist night
      accentColor = "#FFEA79";  // Candle gold
      coreType = "moon";
      coreColor = "#FFFBF0";    // Warm cream moon
      coreSecondaryColor = "#F1E3FC"; // Sky hat lavender
      poetry = randomChoose(POETRIES_COSMIC);
      break;

    case "meadow-magic":
      bgColorStart = "#D6E2C9"; // Sage green
      bgColorEnd = "#EBDDC7";   // Sand wood brown
      accentColor = "#E07A5F";  // Pumpkin terracotta
      coreType = "mushroom";
      coreColor = "#F4A261";    // Creamy orange
      coreSecondaryColor = "#FFE3D8"; // Sprout mist cream
      poetry = randomChoose(POETRIES_MEADOW);
      break;

    case "star-tea":
      bgColorStart = "#FBEBE1"; // Peach butter
      bgColorEnd = "#E8C1C5";   // Dusty rose
      accentColor = "#A4C3B2";  // Tea sage green
      coreType = "teapot";
      coreColor = "#CCDDAA";    // Soft jade pottery
      coreSecondaryColor = "#3D5A80"; // Muted navy lines
      poetry = randomChoose(POETRIES_TEA);
      break;

    case "cozy-slumber":
      bgColorStart = "#E0EEFF"; // Sweet baby blue
      bgColorEnd = "#FFF0F5";   // Lavender blossom blush
      accentColor = "#FFCCD5";  // Pink lace bows
      coreType = "cupcake";
      coreColor = "#F7CAD0";    // Flower bud pink
      coreSecondaryColor = "#FFB3C1"; // Soft rose box
      poetry = randomChoose(POETRIES_SLUMBER);
      break;
  }

  // Adjust palettes further for certain specific scene indices to keep them incredibly rich!
  if (sceneIndex === 0) { // Overgrown Conservatory
    bgColorStart = "#DCE4D3";
    bgColorEnd = "#CDC8A5";
    accentColor = "#E29578";
  } else if (sceneIndex === 6) { // Rain on Lantern Street
    bgColorStart = "#251B33";
    bgColorEnd = "#4B3B60";
    accentColor = "#FFB380";
  } else if (sceneIndex === 22) { // Snowbound Fireplace
    bgColorStart = "#2C3E50";
    bgColorEnd = "#34495E";
    accentColor = "#E74C3C";
    coreColor = "#FFD166";
  } else if (sceneIndex === 25) { // Giant Pumpkin
    bgColorStart = "#8D5B4C";
    bgColorEnd = "#DF9273";
    accentColor = "#4A5D4E";
  }

  // Stars (ambient sky sparkles)
  const starsCount = randomInt(11, 16);
  const stars: StarParam[] = [];
  for (let i = 0; i < starsCount; i++) {
    let cx = randomRange(20, 400);
    let cy = randomRange(20, 400);
    // Move away from the immediate center
    const dist = Math.sqrt(Math.pow(cx - 210, 2) + Math.pow(cy - 210, 2));
    if (dist < 80) {
      const angle = Math.random() * Math.PI * 2;
      cx = 210 + Math.cos(angle) * randomRange(90, 160);
      cy = 210 + Math.sin(angle) * randomRange(90, 160);
    }
    stars.push({
      id: makeId(),
      cx,
      cy,
      size: randomRange(4, 15),
      opacity: randomRange(0.45, 0.9),
      sparkleSpeed: randomRange(2, 5),
      rotation: randomRange(0, 45),
    });
  }

  // Clouds (drifting background layers)
  const cloudsCount = randomInt(2, 4);
  const clouds: CloudParam[] = [];
  for (let i = 0; i < cloudsCount; i++) {
    clouds.push({
      id: makeId(),
      cx: randomRange(40, 380),
      cy: randomRange(30, 160),
      rx: randomRange(40, 70),
      ry: randomRange(20, 36),
      opacity: randomRange(0.2, 0.65),
      driftSpeed: randomRange(8, 16),
    });
  }

  // Bottom elements (cozy flowers)
  const flowersCount = randomInt(4, 8);
  const flowers: FlowerParam[] = [];
  const flowerColors = [
    "#F4978E", "#FBC4AB", "#F8AD9D", "#FFD166", "#D8E2DC",
    "#ECE4DB", "#B5E2FA", "#E8C1C5", "#C7F9CC", "#A2D2FF"
  ];
  for (let i = 0; i < flowersCount; i++) {
    flowers.push({
      id: makeId(),
      cx: randomRange(35, 385),
      cy: randomRange(340, 405),
      size: randomRange(13, 26),
      color: randomChoose(flowerColors),
      centerColor: "#FFEA79",
      petals: randomChoose([5, 6, 8, 12]),
      rotation: randomRange(0, 360),
    });
  }

  // Bottom sprouts (cozy mushrooms)
  const mushroomsCount = randomInt(2, 5);
  const mushrooms: MushroomParam[] = [];
  const capColors = ["#E63946", "#F4A261", "#E76F51", "#FFD166", "#98D8C8", "#B5E2FA"];
  for (let i = 0; i < mushroomsCount; i++) {
    const dotsCount = randomInt(3, 5);
    const mDots = [];
    for (let d = 0; d < dotsCount; d++) {
      mDots.push({
        x: randomRange(-10, 10),
        y: randomRange(-7, 3),
        r: randomRange(1.5, 3),
      });
    }
    mushrooms.push({
      id: makeId(),
      cx: randomRange(40, 380),
      cy: randomRange(355, 405),
      size: randomRange(14, 23),
      capColor: randomChoose(capColors),
      stemColor: "#FAF7EE",
      dots: mDots,
      rotation: randomRange(-12, 12),
    });
  }

  // Floating ribbons/vines
  const ribbonsCount = randomInt(1, 2);
  const ribbons: RibbonParam[] = [];
  const ribColors = ["#FFD166", "#FFF0F5", "#CCDDAA", "#F7CAD0", "#CCDDAA"];
  for (let i = 0; i < ribbonsCount; i++) {
    const startX = randomRange(40, 140);
    const startY = randomRange(180, 280);
    const endX = startX + randomRange(120, 240);
    const endY = startY + randomRange(-50, 50);
    const cp1x = startX + randomRange(35, 90);
    const cp1y = startY - randomRange(40, 100);
    const cp2x = endX - randomRange(35, 90);
    const cp2y = endY + randomRange(45, 100);

    ribbons.push({
      id: makeId(),
      path: `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
      color: randomChoose(ribColors),
      strokeWidth: randomRange(1.5, 3),
    });
  }

  return {
    theme,
    sceneIndex,
    title,
    subtitle,
    imageUrl: metadata.imageUrl,
    bgColorStart,
    bgColorEnd,
    accentColor,
    coreType,
    coreColor,
    coreSecondaryColor,
    stars,
    clouds,
    flowers,
    mushrooms,
    ribbons,
    poetry,
  };
}
