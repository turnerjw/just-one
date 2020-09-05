import React from "react";
import { Client, Lobby as OGLobby } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import {
    theme,
    ThemeProvider,
    CSSReset,
    Box,
    Flex,
    Input,
    Button,
    DefaultTheme,
    Text,
} from "@chakra-ui/core";

import { JustOne } from "./Game";
import { Board } from "./Board/Board";
import { Lobby } from "./Lobby/Lobby";
import { url } from "./BackgroundPatterns";

const JustOneClient = Client({
    game: JustOne,
    board: Board,
    //numPlayers: 3,
    multiplayer: SocketIO({
        server: `localhost:8000`,
    }),
});

const importedGames = [{ game: JustOne, board: Board }];

const customTheme: DefaultTheme = {
    ...theme,
    fonts: {
        ...theme.fonts,
        body: "futura",
    },
};

export const App = () => {
    // const [isConfirmed, setIsConfirmed] = React.useState(false);
    // const [name, setName] = React.useState("");

    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <Box bg="gray.900" py={10} height="100vh">
                <Box maxW={1000} mx="auto">
                    <Text color="white" fontSize="6xl">
                        <b>Only One Online</b>
                    </Text>
                    <Lobby />
                </Box>
                <Box
                    background={`url("${url}"),
                        linear-gradient(135deg,#0010ff,#0063e1)`}
                    maxW="sm"
                    mt={10}
                    mx="auto"
                    p={4}
                    rounded="20px"
                >
                    <OGLobby
                        gameServer={`http://localhost:8000`}
                        lobbyServer={`http://localhost:8000`}
                        gameComponents={importedGames}
                    />
                </Box>
                {/* {isConfirmed ? (
                    <JustOneClient playerID={name} />
                ) : (
                    <Box
                        background={`url("${url}"),
                        linear-gradient(135deg,#0010ff,#0063e1)`}
                        maxW="sm"
                        mt={10}
                        mx="auto"
                        p={4}
                        rounded="20px"
                    >
                        <Flex>
                            <Input
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setName(e.target.value)}
                                placeholder="Choose a name"
                            />
                            <Button
                                ml={2}
                                variantColor="teal"
                                onClick={() => setIsConfirmed(true)}
                            >
                                Submit
                            </Button>
                        </Flex>
                    </Box>
                )} */}
                {/* <JustOneClient playerID="1" />
            <JustOneClient playerID="2" /> */}
                {/* <JustOneClient playerID="3" />
            <JustOneClient playerID="4" /> */}
            </Box>
        </ThemeProvider>
    );
};
