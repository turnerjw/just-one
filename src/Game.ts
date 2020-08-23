import { Game, Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { deck, Deck, Card } from "./Deck";

export enum GameStage {
    Draw = "draw",
    ChooseNumber = "choose-number",
    SubmitClues = "submit-clues",
    CheckClues = "check-clues",
    GuessWord = "guess-word",
    CheckGuess = "check-guess",
    EndTurn = "end-turn",
}

export enum TurnResult {
    Correct = "correct",
    Incorrect = "incorrect",
    Skip = "skip",
    Undetermined = "undetermined",
}

export interface JustOneState {
    stage: GameStage;
    deck: Deck;
    currentCard?: Card;
    selectedWordIndex?: number;
    clues: { playerId: string; clue: string; valid: boolean }[];
    guess?: string;
    turnResult: TurnResult;
    successPile: Deck;
    discards: Deck;
}

const drawCard: Move<JustOneState> = (G, ctx) => {
    const card = G.deck.pop();
    if (card) G.currentCard = card;
    if (ctx.events?.endStage) {
        G.stage = GameStage.ChooseNumber;
        ctx.events.endStage();
    }
};

const chooseNumber: Move<JustOneState> = (G, ctx, index: number) => {
    if (G.currentCard && index >= G.currentCard.length) return INVALID_MOVE;

    G.selectedWordIndex = index;

    if (ctx.events?.setActivePlayers) {
        G.stage = GameStage.SubmitClues;
        ctx.events.setActivePlayers({
            others: "submitClue",
            moveLimit: 1,
        });
    }
};

const submitClue: Move<JustOneState> = (G, ctx, clue: string) => {
    if (ctx.playerID)
        G.clues.push({ clue: clue, playerId: ctx.playerID, valid: true });

    if (ctx.events?.setActivePlayers) {
        G.stage = GameStage.CheckClues;

        // Next player will check the clues
        // Loop to the beginning if at the end of the play order
        const playerToCheckClues =
            ctx.playOrder.length === ctx.playOrderPos + 1
                ? ctx.playOrder[0]
                : ctx.playOrder[ctx.playOrderPos + 1];

        ctx.events.setActivePlayers({
            value: {
                [playerToCheckClues]: "checkClues",
            },
        });
    }
};

const checkClue: Move<JustOneState> = (
    G,
    _,
    playerId: string,
    isValid: boolean
) => {
    const clueIndex = G.clues.findIndex((clue) => clue.playerId === playerId);
    G.clues[clueIndex].valid = isValid;
};

const submitCheckedClues: Move<JustOneState> = (G, ctx) => {
    G.clues = G.clues.filter((clue) => clue.valid);
    if (ctx.events?.setActivePlayers) {
        G.stage = GameStage.GuessWord;
        ctx.events.setActivePlayers({
            currentPlayer: "guessWord",
        });
    }
};

const guessWord: Move<JustOneState> = (G, ctx, guess: string) => {
    G.guess = guess;
    if (ctx.events?.setStage) {
        G.stage = GameStage.CheckGuess;
        ctx.events.setStage("checkGuess");
    }
};

const skipGuess: Move<JustOneState> = (G, ctx) => {
    G.turnResult = TurnResult.Skip;
    if (ctx.events?.setActivePlayers) {
        G.stage = GameStage.EndTurn;
        ctx.events.setActivePlayers({
            all: "endTurn",
            moveLimit: 1,
        });
    }
};

const checkGuess: Move<JustOneState> = (G, ctx, isCorrect: boolean) => {
    if (isCorrect && G.currentCard) {
        G.turnResult = TurnResult.Correct;
        G.successPile.push(G.currentCard);
        G.currentCard = undefined;
    } else if (!isCorrect && G.currentCard) {
        G.turnResult = TurnResult.Incorrect;
        G.discards.push(G.currentCard);
        G.currentCard = undefined;
        const card = G.deck.pop();
        if (card) {
            G.discards.push(card);
        }
    }

    if (ctx.events?.setActivePlayers) {
        G.stage = GameStage.EndTurn;
        ctx.events.setActivePlayers({
            all: "endTurn",
            moveLimit: 1,
        });
    }
};

const endTurn: Move<JustOneState> = () => {
    // All player in a stage with only this move
    // Basically all players confirm moving to next turn
    return;
};

export const JustOne: Game<JustOneState> = {
    name: "just-one",

    setup: (ctx) => ({
        deck: ctx.random?.Shuffle(deck).slice(0, 13),
    }),

    turn: {
        onBegin: (G, ctx) => {
            G.stage = GameStage.Draw;
            if (ctx.events?.setStage) ctx.events?.setStage("drawCard");
        },
        stages: {
            drawCard: { moves: { drawCard }, next: "chooseNumber" },
            chooseNumber: { moves: { chooseNumber } },
            submitClue: { moves: { submitClue } },
            checkClues: { moves: { checkClue, submitCheckedClues } },
            guessWord: { moves: { guessWord, skipGuess } },
            checkGuess: { moves: { checkGuess } },
            endTurn: { moves: { endTurn } },
        },
        onEnd: (G) => {
            G.clues = [];
            G.guess = undefined;
            G.selectedWordIndex = undefined;
            G.turnResult = TurnResult.Undetermined;
        },
    },
};
