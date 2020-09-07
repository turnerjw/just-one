import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Text, AspectRatioBox, Stack, Flex } from "@chakra-ui/core";

import { JustOneState } from "../Game";
import { url } from "../BackgroundPatterns";
import { Deck } from "./Deck";
import { count } from "console";

export const DisplayArea: React.FC<BoardProps<JustOneState>> = ({
    G,
    playerID,
    ctx,
}) => {
    const currentCardDisplay = (
        <Box mb={4}>
            <AspectRatioBox w="200px" ratio={3 / 4}>
                <Stack
                    background={`url("${url}"),
linear-gradient(135deg,#0010ff,#0063e1)`}
                    rounded="20px"
                    boxShadow="0 5px 1px -4px rgba(255,215,0)"
                    spacing={2}
                    p={4}
                >
                    {ctx.currentPlayer !== playerID
                        ? G.currentCard?.map((word, index) => (
                              <Text color="white" p={2} bg="#0005" rounded="md">
                                  <b>{index + 1}</b> {word}
                              </Text>
                          ))
                        : null}
                </Stack>
            </AspectRatioBox>
            {ctx.currentPlayer !== playerID &&
            G.selectedWordIndex !== undefined ? (
                <Text color="white" textAlign="center" mt={2}>
                    Write a clue for #{G.selectedWordIndex + 1}
                </Text>
            ) : null}
        </Box>
    );

    const cluesDisplay = (
        <Box ml={4}>
            <Text color="white" fontSize="xl">
                <b>Clues:</b>
            </Text>
            <Flex wrap="wrap">
                {G.clues.map((clue) => (
                    <Text
                        background={`url("${url}"),
linear-gradient(135deg,#0010ff,#0063e1)`}
                        rounded="20px"
                        maxW="sm"
                        key={clue.playerId}
                        color="white"
                        p={4}
                        mr={2}
                        mb={2}
                        textAlign="center"
                    >
                        <b>{clue.clue}</b>
                    </Text>
                ))}
            </Flex>
        </Box>
    );

    const guessDisplay = (
        <Flex justifyContent="center" w="100%">
            <Stack w="sm">
                <Text color="white" fontSize="xl">
                    <b>Guess:</b>
                </Text>

                <Text
                    background={`url("${url}"),
linear-gradient(135deg,#0010ff,#0063e1)`}
                    rounded="20px"
                    color="white"
                    p={4}
                    mr={2}
                    mb={2}
                    textAlign="center"
                >
                    <b>{G.guess}</b>
                </Text>

                {playerID !== ctx.currentPlayer ? (
                    <Stack mt={4}>
                        <Text color="white" fontSize="xl">
                            <b>Original Word:</b>
                        </Text>

                        <Text
                            background={`url("${url}"),
linear-gradient(135deg,#0010ff,#0063e1)`}
                            rounded="20px"
                            color="white"
                            p={4}
                            mr={2}
                            mb={2}
                            textAlign="center"
                        >
                            <b>
                                {G.currentCard && G.selectedWordIndex
                                    ? G.currentCard[G.selectedWordIndex]
                                    : null}
                            </b>
                        </Text>
                    </Stack>
                ) : null}
            </Stack>
        </Flex>
    );

    if (G.guess) return guessDisplay;

    return (
        <Flex justifyContent="center" w="100%" wrap="wrap">
            {G.currentCard ? currentCardDisplay : null}
            {ctx.activePlayers &&
            ctx.activePlayers[ctx.currentPlayer] === "guessWord"
                ? cluesDisplay
                : null}
        </Flex>
    );
};
