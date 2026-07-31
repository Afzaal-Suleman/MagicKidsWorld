export interface LearningItem {
  id: string;
  letter: string;
  word: string;
  emoji: string;
  image?: string;
  sound?: string;
}

export const alphabet: LearningItem[] = [
  { id: "a", letter: "A", word: "Apple", emoji: "🍎" },
  { id: "b", letter: "B", word: "Ball", emoji: "⚽" },
  { id: "c", letter: "C", word: "Cat", emoji: "🐱" },
  { id: "d", letter: "D", word: "Dog", emoji: "🐶" },
  { id: "e", letter: "E", word: "Elephant", emoji: "🐘" },
  { id: "f", letter: "F", word: "Fish", emoji: "🐟" },
  { id: "g", letter: "G", word: "Grapes", emoji: "🍇" },
  { id: "h", letter: "H", word: "House", emoji: "🏠" },
  { id: "i", letter: "I", word: "Ice Cream", emoji: "🍦" },
  { id: "j", letter: "J", word: "Juice", emoji: "🧃" },
  { id: "k", letter: "K", word: "Kite", emoji: "🪁" },
  { id: "l", letter: "L", word: "Lion", emoji: "🦁" },
  { id: "m", letter: "M", word: "Monkey", emoji: "🐒" },
  { id: "n", letter: "N", word: "Nest", emoji: "🪺" },
  { id: "o", letter: "O", word: "Orange", emoji: "🍊" },
  { id: "p", letter: "P", word: "Parrot", emoji: "🦜" },
  { id: "q", letter: "Q", word: "Queen", emoji: "👸" },
  { id: "r", letter: "R", word: "Rabbit", emoji: "🐇" },
  { id: "s", letter: "S", word: "Sun", emoji: "☀️" },
  { id: "t", letter: "T", word: "Tiger", emoji: "🐅" },
  { id: "u", letter: "U", word: "Umbrella", emoji: "☂️" },
  { id: "v", letter: "V", word: "Van", emoji: "🚐" },
  { id: "w", letter: "W", word: "Watermelon", emoji: "🍉" },
  { id: "x", letter: "X", word: "Xylophone", emoji: "🎹" },
  { id: "y", letter: "Y", word: "Yacht", emoji: "⛵" },
  { id: "z", letter: "Z", word: "Zebra", emoji: "🦓" },
];
