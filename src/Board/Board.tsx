import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Grid } from "@chakra-ui/core";

import { JustOneState } from "../Game";
import { PlayerControls } from "./PlayerControls";
import { OtherPlayers } from "./OtherPlayers";
import { Deck } from "./Deck";
import { DisplayArea } from "./DisplayArea/DisplayArea";

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
                <DisplayArea {...props} />
                <Deck count={G.successPile.length} label="Success Pile" />
            </Grid>
            <PlayerControls {...props} />
        </Box>
    );
};
