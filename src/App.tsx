import React from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";

import { JustOne } from "./Game";
import { Board } from "./Board/Board";

const JustOneClient = Client({
    game: JustOne,
    board: Board,
    numPlayers: 3,
    // @ts-ignore
    multiplayer: Local(),
});

export const App = () => (
    <ThemeProvider>
        <CSSReset />
        <Box bg="gray.900" py={10} height="100vh">
            <JustOneClient playerID="0" />
            <JustOneClient playerID="1" />
            <JustOneClient playerID="2" />
            {/* <JustOneClient playerID="3" />
            <JustOneClient playerID="4" /> */}
        </Box>
    </ThemeProvider>
);
