import { words } from "./Words";

export type Card = string[];

export type Deck = Card[];

export const deck: Deck = [...Array(Math.floor(words.length / 5))].map(
    (_, index) => {
        return [...words.slice(index * 5, index * 5 + 5)];
    }
);
