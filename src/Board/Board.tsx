import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Stack, Text, Flex, Icon, Tooltip } from "@chakra-ui/core";

import { JustOneState } from "../Game";
import { url } from "../BackgroundPatterns";
import { PlayerControls } from "./PlayerControls";

export const Board: React.FC<BoardProps<JustOneState>> = (props) => {
    const { isActive, playerID, gameMetadata, ctx } = props;

    const otherPlayers = gameMetadata?.filter((player) => {
        if (playerID) return !!player.name && player.id !== +playerID;
        else return !!player.name;
    });

    return (
        <Box>
            <Flex wrap="wrap" justifyContent="center">
                {otherPlayers?.map((player) => (
                    <Box
                        background={`url("${url}"),
                        linear-gradient(135deg,#0010ff,#0063e1)`}
                        maxW="sm"
                        minW="sm"
                        mt={2}
                        mr={2}
                        p={4}
                        rounded="20px"
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
                                <b>{player?.name}</b>
                            </Text>
                        </Flex>
                    </Box>
                ))}
            </Flex>
            <PlayerControls {...props} />
        </Box>
    );
};
