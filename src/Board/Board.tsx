import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Text, Grid } from "@chakra-ui/core";

import { JustOneState } from "../Game";
import { url } from "../BackgroundPatterns";
import { PlayerControls } from "./PlayerControls";
import { OtherPlayers } from "./OtherPlayers";
import { Deck } from "./Deck";

export const Board: React.FC<BoardProps<JustOneState>> = (props) => {
    const { G } = props;

    return (
        <Box>
            <OtherPlayers {...props} />
            <Grid
                templateColumns="minmax(0, 150px) minmax(200px, 1fr) minmax(0, 150px)"
                gap={10}
                my={10}
                mx="auto"
            >
                <Deck count={G.deck.length} label="Deck" />
                <Box></Box>
                <Deck count={G.successPile.length} label="Success Pile" />
            </Grid>
            <PlayerControls {...props} />
        </Box>
    );
};
