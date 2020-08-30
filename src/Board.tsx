import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Button, Stack, Text, Flex, Input, Icon } from "@chakra-ui/core";

import { JustOneState, TurnResult } from "./Game";
import { url } from "./BackgroundPatterns";

export const Board: React.FC<BoardProps<JustOneState>> = ({
    G,
    moves,
    playerID,
    isActive,
    ctx,
}) => {
    const [clue, setClue] = React.useState("");
    const [guess, setGuess] = React.useState("");

    const getResultText = () => {
        switch (G.turnResult) {
            case TurnResult.Correct:
                return "Got 'em!";
            case TurnResult.Incorrect:
                return "Dang it Bobby!";
            case TurnResult.Skip:
                return "Skipped!";
            default:
                break;
        }
    };

    return (
        <Box
            background={`url("${url}"),
            linear-gradient(135deg,#0010ff,#0063e1)`}
            maxW="sm"
            mt={10}
            mx="auto"
            p={4}
            rounded="20px"
            boxShadow={
                isActive ? "0px 0px 20px -5px rgba(255, 215, 0, 0.7)" : null
            }
            borderColor={isActive ? "#fffb00" : "#fff0"}
            borderWidth="1px"
            borderStyle="solid"
        >
            <Stack>
                <Text color="white">
                    <b>Player ID: {playerID}</b>
                </Text>
                <Text color="white">
                    <b>Active: {isActive ? "True" : "False"}</b>
                </Text>

                {ctx.activePlayers &&
                playerID &&
                ctx.activePlayers[playerID] === "drawCard" ? (
                    <Button
                        variantColor="teal"
                        onClick={() => moves.drawCard()}
                    >
                        Draw Card
                    </Button>
                ) : null}

                {ctx.activePlayers &&
                playerID &&
                ctx.activePlayers[playerID] === "chooseNumber" ? (
                    <Flex mx="auto">
                        <Button
                            variantColor="teal"
                            mr={2}
                            onClick={() => moves.chooseNumber(0)}
                        >
                            1
                        </Button>
                        <Button
                            variantColor="teal"
                            mr={2}
                            onClick={() => moves.chooseNumber(1)}
                        >
                            2
                        </Button>
                        <Button
                            variantColor="teal"
                            mr={2}
                            onClick={() => moves.chooseNumber(2)}
                        >
                            3
                        </Button>
                        <Button
                            variantColor="teal"
                            mr={2}
                            onClick={() => moves.chooseNumber(3)}
                        >
                            4
                        </Button>
                        <Button
                            variantColor="teal"
                            mr={2}
                            onClick={() => moves.chooseNumber(4)}
                        >
                            5
                        </Button>
                    </Flex>
                ) : null}

                {ctx.activePlayers &&
                playerID &&
                ctx.activePlayers[playerID] === "submitClues" ? (
                    <Flex>
                        <Input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setClue(e.target.value)}
                            placeholder="Submit a clue"
                        />
                        <Button
                            ml={2}
                            variantColor="teal"
                            onClick={() => moves.submitClue(clue)}
                        >
                            Submit
                        </Button>
                    </Flex>
                ) : null}

                {ctx.activePlayers &&
                playerID &&
                ctx.activePlayers[playerID] === "checkClues" ? (
                    <Stack>
                        {G.clues.map((clue) => (
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                                rounded="md"
                                bg="#0005"
                            >
                                <Flex alignItems="center">
                                    <Icon
                                        name={
                                            clue.valid ? "check" : "not-allowed"
                                        }
                                        color={
                                            clue.valid ? "green.400" : "red.400"
                                        }
                                        mx={2}
                                    />
                                    <Text color="white">
                                        <b>{clue.clue}</b>
                                    </Text>
                                </Flex>
                                {!clue.valid ? (
                                    <Button
                                        variantColor="green"
                                        onClick={() =>
                                            moves.checkClue(clue.playerId, true)
                                        }
                                    >
                                        Yup
                                    </Button>
                                ) : null}
                                {clue.valid ? (
                                    <Button
                                        variantColor="red"
                                        onClick={() =>
                                            moves.checkClue(
                                                clue.playerId,
                                                false
                                            )
                                        }
                                    >
                                        Nope
                                    </Button>
                                ) : null}
                            </Flex>
                        ))}
                        <Button
                            variantColor="teal"
                            onClick={() => moves.submitCheckedClues()}
                        >
                            Done
                        </Button>
                    </Stack>
                ) : null}

                {ctx.activePlayers &&
                playerID &&
                ctx.activePlayers[playerID] === "guessWord" ? (
                    <Stack>
                        <Flex>
                            <Input
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setGuess(e.target.value)}
                                placeholder="Submit a guess"
                            />
                            <Button
                                ml={2}
                                variantColor="teal"
                                onClick={() => moves.guessWord(guess)}
                            >
                                Submit
                            </Button>
                        </Flex>
                        <Button
                            variantColor="yellow"
                            onClick={() => moves.skipGuess()}
                        >
                            Skip
                        </Button>
                    </Stack>
                ) : null}

                {ctx.activePlayers &&
                playerID &&
                ctx.activePlayers[playerID] === "checkGuess" ? (
                    <Flex justifyContent="center">
                        <Button
                            mr={2}
                            variantColor="green"
                            onClick={() => moves.checkGuess(true)}
                        >
                            Correct
                        </Button>
                        <Button
                            variantColor="red"
                            onClick={() => moves.checkGuess(false)}
                        >
                            Incorrect
                        </Button>
                    </Flex>
                ) : null}

                {!ctx.gameover &&
                ctx.activePlayers &&
                playerID &&
                ctx.activePlayers[playerID] === "endTurn" ? (
                    <Stack>
                        <Text color="white">
                            <b>{getResultText()}</b>
                        </Text>
                        <Button
                            variantColor="teal"
                            onClick={() => moves.endTurn()}
                        >
                            Next Turn
                        </Button>
                    </Stack>
                ) : null}
            </Stack>
        </Box>
    );
};
