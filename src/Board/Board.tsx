import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Stack, Text } from "@chakra-ui/core";

import { JustOneState } from "../Game";
import { url } from "../BackgroundPatterns";
import { DrawCard } from "./DrawCard";
import { ChooseNumber } from "./ChooseNumber";
import { SubmitClues } from "./SubmitClues";
import { CheckClues } from "./CheckClues";
import { GuessWord } from "./GuessWord";
import { CheckGuess } from "./CheckGuess";
import { EndTurn } from "./EndTurn";

export const Board: React.FC<BoardProps<JustOneState>> = (props) => {
    const { isActive, playerID } = props;
    return (
        <Box
            background={`url("${url}"),
            linear-gradient(135deg,#0010ff,#0063e1)`}
            maxW="sm"
            mt={10}
            mx="auto"
            p={4}
            rounded="20px"
            boxShadow={isActive ? "0px 0px 20px -5px rgba(255, 215, 0)" : null}
            borderColor={isActive ? "#fffb00" : "#fff0"}
            borderWidth="1px"
            borderStyle="solid"
        >
            <Stack>
                <Text color="white">
                    <b>Player ID: {playerID}</b>
                </Text>
                {/* <Text color="white">
                    <b>Active: {isActive ? "True" : "False"}</b>
                </Text> */}

                <DrawCard {...props} />
                <ChooseNumber {...props} />
                <SubmitClues {...props} />
                <CheckClues {...props} />
                <GuessWord {...props} />
                <CheckGuess {...props} />
                <EndTurn {...props} />
            </Stack>
        </Box>
    );
};
