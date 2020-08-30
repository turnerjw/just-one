import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Stack, Flex, Icon, Button, Text } from "@chakra-ui/core";

export const CheckClues: React.FC<BoardProps<JustOneState>> = ({
    G,
    moves,
    playerID,
    ctx,
}) => (
    <>
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
                                name={clue.valid ? "check" : "not-allowed"}
                                color={clue.valid ? "green.400" : "red.400"}
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
                                    moves.checkClue(clue.playerId, false)
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
    </>
);
