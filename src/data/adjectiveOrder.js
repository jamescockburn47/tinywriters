export const CATEGORIES = {
  opinion: { label: "Opinion", color: "#f472b6", example: "lovely, ugly" },
  size: { label: "Size", color: "#34d399", example: "big, tiny" },
  age: { label: "Age", color: "#fbbf24", example: "old, new" },
  shape: { label: "Shape", color: "#fb923c", example: "round, flat" },
  color: { label: "Colour", color: "#a78bfa", example: "red, blue" },
  origin: { label: "Origin", color: "#60a5fa", example: "French, wooden" },
  material: { label: "Material", color: "#9ca3af", example: "wooden, metal" },
  purpose: { label: "Purpose", color: "#f87171", example: "sleeping, running" }
}

export default [
  // Difficulty 1 — 2 adjectives
  {
    noun: "dog",
    adjectives: [
      { word: "brown", category: "color" },
      { word: "big", category: "size" }
    ],
    correctOrder: ["big", "brown"],
    difficulty: 1
  },
  {
    noun: "cat",
    adjectives: [
      { word: "little", category: "size" },
      { word: "lovely", category: "opinion" }
    ],
    correctOrder: ["lovely", "little"],
    difficulty: 1
  },
  {
    noun: "ball",
    adjectives: [
      { word: "red", category: "color" },
      { word: "round", category: "shape" }
    ],
    correctOrder: ["round", "red"],
    difficulty: 1
  },
  {
    noun: "house",
    adjectives: [
      { word: "old", category: "age" },
      { word: "big", category: "size" }
    ],
    correctOrder: ["big", "old"],
    difficulty: 1
  },
  {
    noun: "flower",
    adjectives: [
      { word: "pretty", category: "opinion" },
      { word: "pink", category: "color" }
    ],
    correctOrder: ["pretty", "pink"],
    difficulty: 1
  },
  {
    noun: "car",
    adjectives: [
      { word: "new", category: "age" },
      { word: "blue", category: "color" }
    ],
    correctOrder: ["new", "blue"],
    difficulty: 1
  },
  {
    noun: "teddy bear",
    adjectives: [
      { word: "soft", category: "opinion" },
      { word: "small", category: "size" }
    ],
    correctOrder: ["soft", "small"],
    difficulty: 1
  },
  {
    noun: "tree",
    adjectives: [
      { word: "green", category: "color" },
      { word: "tall", category: "size" }
    ],
    correctOrder: ["tall", "green"],
    difficulty: 1
  },
  {
    noun: "book",
    adjectives: [
      { word: "tiny", category: "size" },
      { word: "old", category: "age" }
    ],
    correctOrder: ["tiny", "old"],
    difficulty: 1
  },
  {
    noun: "bird",
    adjectives: [
      { word: "beautiful", category: "opinion" },
      { word: "blue", category: "color" }
    ],
    correctOrder: ["beautiful", "blue"],
    difficulty: 1
  },
  {
    noun: "shoes",
    adjectives: [
      { word: "new", category: "age" },
      { word: "nice", category: "opinion" }
    ],
    correctOrder: ["nice", "new"],
    difficulty: 1
  },
  {
    noun: "chair",
    adjectives: [
      { word: "wooden", category: "material" },
      { word: "old", category: "age" }
    ],
    correctOrder: ["old", "wooden"],
    difficulty: 1
  },
  {
    noun: "cake",
    adjectives: [
      { word: "round", category: "shape" },
      { word: "large", category: "size" }
    ],
    correctOrder: ["large", "round"],
    difficulty: 1
  },
  {
    noun: "scarf",
    adjectives: [
      { word: "long", category: "size" },
      { word: "woolly", category: "material" }
    ],
    correctOrder: ["long", "woolly"],
    difficulty: 1
  },
  {
    noun: "hat",
    adjectives: [
      { word: "silly", category: "opinion" },
      { word: "big", category: "size" }
    ],
    correctOrder: ["silly", "big"],
    difficulty: 1
  },
  {
    noun: "blanket",
    adjectives: [
      { word: "warm", category: "opinion" },
      { word: "blue", category: "color" }
    ],
    correctOrder: ["warm", "blue"],
    difficulty: 1
  },
  {
    noun: "rabbit",
    adjectives: [
      { word: "white", category: "color" },
      { word: "tiny", category: "size" }
    ],
    correctOrder: ["tiny", "white"],
    difficulty: 1
  },
  {
    noun: "bridge",
    adjectives: [
      { word: "stone", category: "material" },
      { word: "old", category: "age" }
    ],
    correctOrder: ["old", "stone"],
    difficulty: 1
  },
  {
    noun: "dress",
    adjectives: [
      { word: "gorgeous", category: "opinion" },
      { word: "long", category: "size" }
    ],
    correctOrder: ["gorgeous", "long"],
    difficulty: 1
  },
  {
    noun: "fish",
    adjectives: [
      { word: "orange", category: "color" },
      { word: "small", category: "size" }
    ],
    correctOrder: ["small", "orange"],
    difficulty: 1
  },
  // Difficulty 2 — 2-3 adjectives
  {
    noun: "table",
    adjectives: [
      { word: "wooden", category: "material" },
      { word: "round", category: "shape" },
      { word: "large", category: "size" }
    ],
    correctOrder: ["large", "round", "wooden"],
    difficulty: 2
  },
  {
    noun: "dragon",
    adjectives: [
      { word: "green", category: "color" },
      { word: "enormous", category: "size" },
      { word: "terrifying", category: "opinion" }
    ],
    correctOrder: ["terrifying", "enormous", "green"],
    difficulty: 2
  },
  {
    noun: "cottage",
    adjectives: [
      { word: "stone", category: "material" },
      { word: "little", category: "size" },
      { word: "charming", category: "opinion" }
    ],
    correctOrder: ["charming", "little", "stone"],
    difficulty: 2
  },
  {
    noun: "kitten",
    adjectives: [
      { word: "fluffy", category: "opinion" },
      { word: "young", category: "age" },
      { word: "grey", category: "color" }
    ],
    correctOrder: ["fluffy", "young", "grey"],
    difficulty: 2
  },
  {
    noun: "sword",
    adjectives: [
      { word: "long", category: "size" },
      { word: "ancient", category: "age" },
      { word: "metal", category: "material" }
    ],
    correctOrder: ["long", "ancient", "metal"],
    difficulty: 2
  },
  {
    noun: "castle",
    adjectives: [
      { word: "old", category: "age" },
      { word: "grey", category: "color" },
      { word: "magnificent", category: "opinion" }
    ],
    correctOrder: ["magnificent", "old", "grey"],
    difficulty: 2
  },
  {
    noun: "bicycle",
    adjectives: [
      { word: "red", category: "color" },
      { word: "shiny", category: "opinion" },
      { word: "new", category: "age" }
    ],
    correctOrder: ["shiny", "new", "red"],
    difficulty: 2
  },
  {
    noun: "jumper",
    adjectives: [
      { word: "woolly", category: "material" },
      { word: "cosy", category: "opinion" },
      { word: "blue", category: "color" }
    ],
    correctOrder: ["cosy", "blue", "woolly"],
    difficulty: 2
  },
  {
    noun: "boat",
    adjectives: [
      { word: "wooden", category: "material" },
      { word: "small", category: "size" },
      { word: "old", category: "age" }
    ],
    correctOrder: ["small", "old", "wooden"],
    difficulty: 2
  },
  {
    noun: "ring",
    adjectives: [
      { word: "gold", category: "material" },
      { word: "beautiful", category: "opinion" },
      { word: "round", category: "shape" }
    ],
    correctOrder: ["beautiful", "round", "gold"],
    difficulty: 2
  },
  {
    noun: "bag",
    adjectives: [
      { word: "leather", category: "material" },
      { word: "brown", category: "color" },
      { word: "big", category: "size" }
    ],
    correctOrder: ["big", "brown", "leather"],
    difficulty: 2
  },
  {
    noun: "window",
    adjectives: [
      { word: "glass", category: "material" },
      { word: "huge", category: "size" },
      { word: "square", category: "shape" }
    ],
    correctOrder: ["huge", "square", "glass"],
    difficulty: 2
  },
  {
    noun: "coat",
    adjectives: [
      { word: "lovely", category: "opinion" },
      { word: "new", category: "age" },
      { word: "red", category: "color" }
    ],
    correctOrder: ["lovely", "new", "red"],
    difficulty: 2
  },
  {
    noun: "pony",
    adjectives: [
      { word: "young", category: "age" },
      { word: "sweet", category: "opinion" },
      { word: "brown", category: "color" }
    ],
    correctOrder: ["sweet", "young", "brown"],
    difficulty: 2
  },
  {
    noun: "tower",
    adjectives: [
      { word: "tall", category: "size" },
      { word: "stone", category: "material" },
      { word: "ancient", category: "age" }
    ],
    correctOrder: ["tall", "ancient", "stone"],
    difficulty: 2
  },
  {
    noun: "lamp",
    adjectives: [
      { word: "brass", category: "material" },
      { word: "old", category: "age" },
      { word: "small", category: "size" }
    ],
    correctOrder: ["small", "old", "brass"],
    difficulty: 2
  },
  {
    noun: "teddy",
    adjectives: [
      { word: "cuddly", category: "opinion" },
      { word: "brown", category: "color" }
    ],
    correctOrder: ["cuddly", "brown"],
    difficulty: 2
  },
  {
    noun: "pencil",
    adjectives: [
      { word: "yellow", category: "color" },
      { word: "long", category: "size" },
      { word: "wooden", category: "material" }
    ],
    correctOrder: ["long", "yellow", "wooden"],
    difficulty: 2
  },
  {
    noun: "garden",
    adjectives: [
      { word: "beautiful", category: "opinion" },
      { word: "big", category: "size" },
      { word: "green", category: "color" }
    ],
    correctOrder: ["beautiful", "big", "green"],
    difficulty: 2
  },
  {
    noun: "clock",
    adjectives: [
      { word: "round", category: "shape" },
      { word: "old", category: "age" },
      { word: "wooden", category: "material" }
    ],
    correctOrder: ["old", "round", "wooden"],
    difficulty: 2
  },
  // Difficulty 3 — 3-4 adjectives
  {
    noun: "box",
    adjectives: [
      { word: "wooden", category: "material" },
      { word: "beautiful", category: "opinion" },
      { word: "small", category: "size" },
      { word: "square", category: "shape" }
    ],
    correctOrder: ["beautiful", "small", "square", "wooden"],
    difficulty: 3
  },
  {
    noun: "vase",
    adjectives: [
      { word: "Chinese", category: "origin" },
      { word: "lovely", category: "opinion" },
      { word: "old", category: "age" },
      { word: "blue", category: "color" }
    ],
    correctOrder: ["lovely", "old", "blue", "Chinese"],
    difficulty: 3
  },
  {
    noun: "chair",
    adjectives: [
      { word: "comfortable", category: "opinion" },
      { word: "leather", category: "material" },
      { word: "brown", category: "color" },
      { word: "big", category: "size" }
    ],
    correctOrder: ["comfortable", "big", "brown", "leather"],
    difficulty: 3
  },
  {
    noun: "painting",
    adjectives: [
      { word: "Italian", category: "origin" },
      { word: "wonderful", category: "opinion" },
      { word: "old", category: "age" },
      { word: "large", category: "size" }
    ],
    correctOrder: ["wonderful", "large", "old", "Italian"],
    difficulty: 3
  },
  {
    noun: "door",
    adjectives: [
      { word: "oak", category: "material" },
      { word: "heavy", category: "opinion" },
      { word: "old", category: "age" },
      { word: "brown", category: "color" }
    ],
    correctOrder: ["heavy", "old", "brown", "oak"],
    difficulty: 3
  },
  {
    noun: "shield",
    adjectives: [
      { word: "round", category: "shape" },
      { word: "metal", category: "material" },
      { word: "ancient", category: "age" },
      { word: "incredible", category: "opinion" }
    ],
    correctOrder: ["incredible", "ancient", "round", "metal"],
    difficulty: 3
  },
  {
    noun: "rug",
    adjectives: [
      { word: "Persian", category: "origin" },
      { word: "rectangular", category: "shape" },
      { word: "gorgeous", category: "opinion" },
      { word: "red", category: "color" }
    ],
    correctOrder: ["gorgeous", "rectangular", "red", "Persian"],
    difficulty: 3
  },
  {
    noun: "necklace",
    adjectives: [
      { word: "silver", category: "material" },
      { word: "old", category: "age" },
      { word: "stunning", category: "opinion" },
      { word: "long", category: "size" }
    ],
    correctOrder: ["stunning", "long", "old", "silver"],
    difficulty: 3
  },
  {
    noun: "statue",
    adjectives: [
      { word: "marble", category: "material" },
      { word: "Greek", category: "origin" },
      { word: "tall", category: "size" },
      { word: "ancient", category: "age" }
    ],
    correctOrder: ["tall", "ancient", "Greek", "marble"],
    difficulty: 3
  },
  {
    noun: "bowl",
    adjectives: [
      { word: "ceramic", category: "material" },
      { word: "round", category: "shape" },
      { word: "pretty", category: "opinion" },
      { word: "blue", category: "color" }
    ],
    correctOrder: ["pretty", "round", "blue", "ceramic"],
    difficulty: 3
  },
  {
    noun: "knife",
    adjectives: [
      { word: "sharp", category: "opinion" },
      { word: "steel", category: "material" },
      { word: "small", category: "size" },
      { word: "Japanese", category: "origin" }
    ],
    correctOrder: ["sharp", "small", "Japanese", "steel"],
    difficulty: 3
  },
  {
    noun: "blanket",
    adjectives: [
      { word: "cosy", category: "opinion" },
      { word: "old", category: "age" },
      { word: "woolly", category: "material" },
      { word: "blue", category: "color" }
    ],
    correctOrder: ["cosy", "old", "blue", "woolly"],
    difficulty: 3
  },
  {
    noun: "mirror",
    adjectives: [
      { word: "oval", category: "shape" },
      { word: "gold", category: "material" },
      { word: "magnificent", category: "opinion" },
      { word: "old", category: "age" }
    ],
    correctOrder: ["magnificent", "old", "oval", "gold"],
    difficulty: 3
  },
  {
    noun: "teapot",
    adjectives: [
      { word: "Chinese", category: "origin" },
      { word: "delicate", category: "opinion" },
      { word: "tiny", category: "size" },
      { word: "white", category: "color" }
    ],
    correctOrder: ["delicate", "tiny", "white", "Chinese"],
    difficulty: 3
  },
  {
    noun: "helmet",
    adjectives: [
      { word: "Roman", category: "origin" },
      { word: "heavy", category: "opinion" },
      { word: "bronze", category: "material" },
      { word: "old", category: "age" }
    ],
    correctOrder: ["heavy", "old", "Roman", "bronze"],
    difficulty: 3
  },
  // Additional entries with purpose, origin, and longer chains
  {
    noun: "bag",
    adjectives: [
      { word: "sleeping", category: "purpose" },
      { word: "blue", category: "color" }
    ],
    correctOrder: ["blue", "sleeping"],
    difficulty: 1
  },
  {
    noun: "shoes",
    adjectives: [
      { word: "running", category: "purpose" },
      { word: "new", category: "age" }
    ],
    correctOrder: ["new", "running"],
    difficulty: 1
  },
  {
    noun: "pool",
    adjectives: [
      { word: "swimming", category: "purpose" },
      { word: "large", category: "size" }
    ],
    correctOrder: ["large", "swimming"],
    difficulty: 1
  },
  {
    noun: "machine",
    adjectives: [
      { word: "washing", category: "purpose" },
      { word: "old", category: "age" },
      { word: "white", category: "color" }
    ],
    correctOrder: ["old", "white", "washing"],
    difficulty: 2
  },
  {
    noun: "board",
    adjectives: [
      { word: "chopping", category: "purpose" },
      { word: "wooden", category: "material" },
      { word: "large", category: "size" }
    ],
    correctOrder: ["large", "wooden", "chopping"],
    difficulty: 2
  },
  {
    noun: "cheese",
    adjectives: [
      { word: "French", category: "origin" },
      { word: "smelly", category: "opinion" },
      { word: "soft", category: "shape" }
    ],
    correctOrder: ["smelly", "soft", "French"],
    difficulty: 2
  },
  {
    noun: "chocolate",
    adjectives: [
      { word: "Belgian", category: "origin" },
      { word: "delicious", category: "opinion" },
      { word: "dark", category: "color" }
    ],
    correctOrder: ["delicious", "dark", "Belgian"],
    difficulty: 2
  },
  {
    noun: "table",
    adjectives: [
      { word: "dining", category: "purpose" },
      { word: "beautiful", category: "opinion" },
      { word: "long", category: "size" },
      { word: "oak", category: "material" }
    ],
    correctOrder: ["beautiful", "long", "oak", "dining"],
    difficulty: 3
  },
  {
    noun: "jacket",
    adjectives: [
      { word: "riding", category: "purpose" },
      { word: "smart", category: "opinion" },
      { word: "black", category: "color" },
      { word: "leather", category: "material" }
    ],
    correctOrder: ["smart", "black", "leather", "riding"],
    difficulty: 3
  },
  {
    noun: "pan",
    adjectives: [
      { word: "frying", category: "purpose" },
      { word: "heavy", category: "opinion" },
      { word: "large", category: "size" },
      { word: "iron", category: "material" }
    ],
    correctOrder: ["heavy", "large", "iron", "frying"],
    difficulty: 3
  },
  {
    noun: "sword",
    adjectives: [
      { word: "fighting", category: "purpose" },
      { word: "magnificent", category: "opinion" },
      { word: "long", category: "size" },
      { word: "ancient", category: "age" },
      { word: "steel", category: "material" }
    ],
    correctOrder: ["magnificent", "long", "ancient", "steel", "fighting"],
    difficulty: 3
  },
  {
    noun: "carpet",
    adjectives: [
      { word: "flying", category: "purpose" },
      { word: "magical", category: "opinion" },
      { word: "old", category: "age" },
      { word: "red", category: "color" },
      { word: "Persian", category: "origin" }
    ],
    correctOrder: ["magical", "old", "red", "Persian", "flying"],
    difficulty: 3
  },
]
