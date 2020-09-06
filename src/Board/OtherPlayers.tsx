import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Box, Flex, Tooltip, Icon, Text } from "@chakra-ui/core";
import { JustOneState } from "../Game";
import { url } from "../BackgroundPatterns";

export const OtherPlayers: React.FC<BoardProps<JustOneState>> = (props) => {
    const { playerID, gameMetadata, ctx } = props;

    const otherPlayers = gameMetadata?.filter((player) => {
        if (playerID) return !!player.name && player.id !== +playerID;
        else return !!player.name;
    });

    const getPlayerActionText = (playerId: number): string | undefined => {
        const playerAction = ctx.activePlayers
            ? ctx.activePlayers[playerId]
            : null;
        switch (playerAction) {
            case "drawCard":
                return "is drawing a card...";
            case "chooseNumber":
                return "is choosing a number...";
            case "submitClues":
                return "is submitting a clue...";
            case "checkClues":
                return "is checking the clues...";
            case "guessWord":
                return "is guessing the word...";
            case "checkGuess":
                return "is checking the guess...";
            case "endTurn":
                return;
            case "waitingForOthers":
                return "is waiting...";
            default:
                return;
        }
    };

    return (
        <Flex wrap="wrap" justifyContent="center">
            {otherPlayers?.map((player) => {
                const actionText = getPlayerActionText(player.id);
                return (
                    <Box
                        key={player.id}
                        background={`url("${url}"),
                        linear-gradient(135deg,#0010ff,#0063e1)`}
                        maxW="sm"
                        minW="sm"
                        mt={2}
                        mr={2}
                        p={4}
                        rounded="20px"
                        boxShadow={
                            !!actionText
                                ? "0px 0px 20px -5px rgba(255, 215, 0)"
                                : null
                        }
                        borderColor={!!actionText ? "#fffb00" : "#fff0"}
                        borderWidth="1px"
                        borderStyle={!!actionText ? "solid" : "none"}
                    >
                        <Flex alignItems="center">
                            {ctx.currentPlayer === player.id.toString() ? (
                                <Tooltip
                                    hasArrow
                                    label={`${player.name} is guessing this turn`}
                                    aria-label={`${player.name} is guessing this turn`}
                                    placement="top"
                                >
                                    <Icon
                                        name="star"
                                        color="yellow.400"
                                        mr={2}
                                    />
                                </Tooltip>
                            ) : null}
                            <Text color="white">
                                <b>{player?.name}</b> {actionText}
                            </Text>
                        </Flex>
                    </Box>
                );
            })}
        </Flex>
    );
};
