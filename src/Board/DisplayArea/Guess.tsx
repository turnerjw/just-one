import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { JustOneState } from "../../Game";
import { Text, Flex, Stack } from "@chakra-ui/core";
import { playerBackgrounds, gameBackground } from "../../BackgroundPatterns";

export const Guess: React.FC<BoardProps<JustOneState>> = ({
    G,
    ctx,
    playerID,
}) => (
    <>
        {G.guess ? (
            <Flex justifyContent="center" w="100%">
                <Stack w="sm">
                    <Text color="white" fontSize="xl">
                        <b>Guess:</b>
                    </Text>

                    <Text
                        background={playerBackgrounds[+ctx.currentPlayer]}
                        rounded="20px"
                        color="white"
                        p={4}
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
                                background={gameBackground}
                                rounded="20px"
                                color="white"
                                p={4}
                                mb={2}
                                textAlign="center"
                            >
                                <b>
                                    {G.currentCard &&
                                    G.selectedWordIndex !== undefined
                                        ? G.currentCard[G.selectedWordIndex]
                                        : null}
                                </b>
                            </Text>
                        </Stack>
                    ) : null}
                </Stack>
            </Flex>
        ) : null}
    </>
);
