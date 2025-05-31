// 1. 타입 정의
export type TarotCard = {
  id: number;
  name: string;
  image: string;
};

// 2. 카드 배열
export const tarotCards: TarotCard[] = [
  { id: 0, name: "The Fool", image: "/cards/fool.jpg" },
  { id: 1, name: "The Magician", image: "/cards/magician.jpg" },
  { id: 2, name: "The High Priestess", image: "/cards/high_priestess.jpg" },
  { id: 3, name: "The Empress", image: "/cards/empress.jpg" },
  { id: 4, name: "The Emperor", image: "/cards/emperor.jpg" },
  { id: 5, name: "The Hierophant", image: "/cards/hierophant.jpg" },
  { id: 6, name: "The Lovers", image: "/cards/lovers.jpg" },
  { id: 7, name: "The Chariot", image: "/cards/chariot.jpg" },
  { id: 8, name: "Strength", image: "/cards/strength.jpg" },
  { id: 9, name: "The Hermit", image: "/cards/hermit.jpg" },
  { id: 10, name: "Wheel of Fortune", image: "/cards/wheel_of_fortune.jpg" },
  { id: 11, name: "Justice", image: "/cards/justice.jpg" },
  { id: 12, name: "The Hanged Man", image: "/cards/hanged_man.jpg" },
  { id: 13, name: "Death", image: "/cards/death.jpg" },
  { id: 14, name: "Temperance", image: "/cards/temperance.jpg" },
  { id: 15, name: "The Devil", image: "/cards/devil.jpg" },
  { id: 16, name: "The Tower", image: "/cards/tower.jpg" },
  { id: 17, name: "The Star", image: "/cards/star.jpg" },
  { id: 18, name: "The Moon", image: "/cards/moon.jpg" },
  { id: 19, name: "The Sun", image: "/cards/sun.jpg" },
  { id: 20, name: "Judgement", image: "/cards/judgement.jpg" },
  { id: 21, name: "The World", image: "/cards/world.jpg" },
];
