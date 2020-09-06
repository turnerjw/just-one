import React from "react";
import {
    theme,
    ThemeProvider,
    CSSReset,
    Box,
    DefaultTheme,
    Text,
} from "@chakra-ui/core";
import { Lobby } from "./Lobby/Lobby";

const customTheme: DefaultTheme = {
    ...theme,
    fonts: {
        ...theme.fonts,
        body: "futura",
    },
};

export const App = () => {
    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <Box bg="gray.900" py={10} height="100vh" overflow="scroll">
                <Box maxW={1000} px={4} mx="auto">
                    <Text color="white" fontSize="6xl">
                        <b>Only One Online</b>
                    </Text>
                    <Lobby />
                </Box>
            </Box>
        </ThemeProvider>
    );
};
