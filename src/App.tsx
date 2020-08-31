import React from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import {
    ThemeProvider,
    CSSReset,
    Box,
    Flex,
    Input,
    Button,
} from "@chakra-ui/core";

import { JustOne } from "./Game";
import { Board } from "./Board/Board";

const JustOneClient = Client({
    game: JustOne,
    board: Board,
    numPlayers: 3,
    // @ts-ignore
    multiplayer: SocketIO({ server: `https://${window.location.hostname}` }),
});

export const App = () => {
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const [name, setName] = React.useState("");

    return (
        <ThemeProvider>
            <CSSReset />
            <Box bg="gray.900" py={10} height="100vh">
                {isConfirmed ? (
                    <JustOneClient playerID={name} />
                ) : (
                    <Flex>
                        <Input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                            placeholder="Submit a clue"
                        />
                        <Button
                            ml={2}
                            variantColor="teal"
                            onClick={() => setIsConfirmed(true)}
                        >
                            Submit
                        </Button>
                    </Flex>
                )}
                {/* <JustOneClient playerID="1" />
            <JustOneClient playerID="2" /> */}
                {/* <JustOneClient playerID="3" />
            <JustOneClient playerID="4" /> */}
            </Box>
        </ThemeProvider>
    );
};
