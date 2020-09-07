import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { JustOneState } from "../../Game";
import { Box, Text, Flex } from "@chakra-ui/core";
import { playerBackgrounds } from "../../BackgroundPatterns";

export const Clues: React.FC<BoardProps<JustOneState>> = ({ G, ctx }) => (
    <>
        {ctx.activePlayers &&
        ctx.activePlayers[ctx.currentPlayer] === "guessWord" ? (
            <Box ml={4}>
                <Text color="white" fontSize="xl">
                    <b>Clues:</b>
                </Text>
                {G.clues.length ? (
                    <Flex wrap="wrap">
                        {G.clues.map((clue) => (
                            <Text
                                background={playerBackgrounds[+clue.playerId]}
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
                ) : (
                    <Text
                        rounded="20px"
                        maxW="sm"
                        color="white"
                        p={4}
                        mr={2}
                        mb={2}
                        textAlign="center"
                    >
                        <b>No clues</b>
                    </Text>
                )}
            </Box>
        ) : null}
    </>
);
