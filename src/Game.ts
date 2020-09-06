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

        // Next player will check the clues
        // Loop to the beginning if at the end of the play order
        const playerToCheckClues =
            ctx.playOrder.length === ctx.playOrderPos + 1
                ? ctx.playOrder[0]
                : ctx.playOrder[ctx.playOrderPos + 1];

        ctx.events.setActivePlayers({
            others: "submitClues",
            moveLimit: 1,
            next: {
                value: {
                    [playerToCheckClues]: "checkClues",
                },
            },
        });
    }
};

const submitClue: Move<JustOneState> = (G, ctx, clue: string) => {
    if (ctx.playerID)
        G.clues.push({ clue: clue, playerId: ctx.playerID, valid: true });
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
    if (ctx.events?.setActivePlayers) {
        G.stage = GameStage.CheckGuess;

        // Next player will check the clues
        // Loop to the beginning if at the end of the play order
        const playerToCheckClues =
            ctx.playOrder.length === ctx.playOrderPos + 1
                ? ctx.playOrder[0]
                : ctx.playOrder[ctx.playOrderPos + 1];

        ctx.events.setActivePlayers({
            value: {
                [playerToCheckClues]: "checkGuess",
            },
        });
    }
};

const skipGuess: Move<JustOneState> = (G, ctx) => {
    G.turnResult = TurnResult.Skip;

    if (G.currentCard) G.discards.push(G.currentCard);
    G.currentCard = undefined;

    if (ctx.events?.setActivePlayers) {
        G.stage = GameStage.EndTurn;
        ctx.events.setActivePlayers({
            all: "endTurn",
            moveLimit: 1,
            next: {
                all: "waitingForOthers",
            },
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
            next: {
                all: "waitingForOthers",
            },
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
        clues: [],
        successPile: [],
        discards: [],
    }),

    turn: {
        onBegin: (G, ctx) => {
            G.stage = GameStage.Draw;
            if (ctx.events?.setActivePlayers)
                ctx.events?.setActivePlayers({
                    currentPlayer: "drawCard",
                });
        },
        stages: {
            drawCard: { moves: { drawCard }, next: "chooseNumber" },
            chooseNumber: { moves: { chooseNumber } },
            submitClues: { moves: { submitClue } },
            checkClues: { moves: { checkClue, submitCheckedClues } },
            guessWord: { moves: { guessWord, skipGuess } },
            checkGuess: { moves: { checkGuess } },
            endTurn: { moves: { endTurn } },
            waitingForOthers: { moves: {} },
        },
        endIf: (_, ctx) => {
            if (ctx.activePlayers) {
                // End turn if every player is waiting
                return Object.keys(ctx.activePlayers).every((playerId) =>
                    ctx.activePlayers
                        ? ctx.activePlayers[playerId] === "waitingForOthers"
                        : false
                );
            }
        },
        onEnd: (G) => {
            G.clues = [];
            G.guess = undefined;
            G.selectedWordIndex = undefined;
            G.turnResult = TurnResult.Undetermined;
        },
    },

    endIf: (G, _) => {
        if (G.deck.length === 0 && G.currentCard === undefined) {
            switch (G.successPile.length) {
                case 13:
                    return { message: "Perfect score! Can you do it again?" };

                case 12:
                    return {
                        message: "Incredible! Your friends must be impressed!",
                    };

                case 11:
                    return {
                        message: "Awesome! That's a score woth celebrating!",
                    };

                case 10:
                case 9:
                    return { message: "Wow, not bad at all!" };

                case 8:
                case 7:
                    return {
                        message: "You're in the average. Can you do better?",
                    };

                case 6:
                case 5:
                case 4:
                    return { message: "That's a good start. Try again!" };

                case 3:
                case 2:
                case 1:
                case 0:
                    return { message: "Try again, and again, and again." };

                default:
                    break;
            }
        }
    },
};
