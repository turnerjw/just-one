import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { JustOneState } from "../../Game";
import { Box, AspectRatioBox, Stack, Text } from "@chakra-ui/core";
import { playerBackgrounds } from "../../BackgroundPatterns";

export const CurrentCard: React.FC<BoardProps<JustOneState>> = ({
    G,
    playerID,
    ctx,
}) => (
    <>
        {G.currentCard && !G.guess ? (
            <Box mb={4}>
                <AspectRatioBox w="200px" ratio={3 / 4}>
                    <Stack
                        background={playerBackgrounds[0]}
                        rounded="20px"
                        boxShadow="0 5px 1px -4px rgba(255,215,0)"
                        spacing={2}
                        p={4}
                    >
                        {ctx.currentPlayer !== playerID
                            ? G.currentCard?.map((word, index) => (
                                  <Text
                                      color="white"
                                      p={2}
                                      bg="#0005"
                                      rounded="md"
                                  >
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
        ) : null}
    </>
);
