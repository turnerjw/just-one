import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Stack, Text, Flex, Icon, Tooltip } from "@chakra-ui/core";

import { JustOneState } from "../Game";
import { url } from "../BackgroundPatterns";
import { PlayerControls } from "./PlayerControls";
import { OtherPlayers } from "./OtherPlayers";

export const Board: React.FC<BoardProps<JustOneState>> = (props) => {
    const { isActive, playerID, gameMetadata, ctx } = props;

    const otherPlayers = gameMetadata?.filter((player) => {
        if (playerID) return !!player.name && player.id !== +playerID;
        else return !!player.name;
    });

    return (
        <Box>
            <OtherPlayers {...props} />
            <PlayerControls {...props} />
        </Box>
    );
};
