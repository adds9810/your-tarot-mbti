// 1. 타입 정의
export type TarotCard = {
  id: number;
  name: string;
  image: string;
};

// 2. 카드 배열
export const tarotCards: TarotCard[] = [
  { id: 0, name: "The Fool", image: "/cards/fool.png" },
  { id: 1, name: "The Magician", image: "/cards/magician.png" },
  { id: 2, name: "The High Priestess", image: "/cards/high_priestess.png" },
  { id: 3, name: "The Empress", image: "/cards/empress.png" },
  { id: 4, name: "The Emperor", image: "/cards/emperor.png" },
  { id: 5, name: "The Hierophant", image: "/cards/hierophant.png" },
  { id: 6, name: "The Lovers", image: "/cards/lovers.png" },
  { id: 7, name: "The Chariot", image: "/cards/chariot.png" },
  { id: 8, name: "Strength", image: "/cards/strength.png" },
  { id: 9, name: "The Hermit", image: "/cards/hermit.png" },
  { id: 10, name: "Wheel of Fortune", image: "/cards/wheel_of_fortune.png" },
  { id: 11, name: "Justice", image: "/cards/justice.png" },
  { id: 12, name: "The Hanged Man", image: "/cards/hanged_man.png" },
  { id: 13, name: "Death", image: "/cards/death.png" },
  { id: 14, name: "Temperance", image: "/cards/temperance.png" },
  { id: 15, name: "The Devil", image: "/cards/devil.png" },
  { id: 16, name: "The Tower", image: "/cards/tower.png" },
  { id: 17, name: "The Star", image: "/cards/star.png" },
  { id: 18, name: "The Moon", image: "/cards/moon.png" },
  { id: 19, name: "The Sun", image: "/cards/sun.png" },
  { id: 20, name: "Judgement", image: "/cards/judgement.png" },
  { id: 21, name: "The World", image: "/cards/world.png" },
];
