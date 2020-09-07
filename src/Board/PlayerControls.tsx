import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Stack, Text, Flex, Tooltip, Icon } from "@chakra-ui/core";

import { JustOneState } from "../Game";
import { playerBackgrounds } from "../BackgroundPatterns";
import { DrawCard } from "./DrawCard";
import { ChooseNumber } from "./ChooseNumber";
import { SubmitClues } from "./SubmitClues";
import { CheckClues } from "./CheckClues";
import { GuessWord } from "./GuessWord";
import { CheckGuess } from "./CheckGuess";
import { EndTurn } from "./EndTurn";

export const PlayerControls: React.FC<BoardProps<JustOneState>> = (props) => {
    const { isActive, playerID, gameMetadata, ctx } = props;

    const currentPlayer = gameMetadata?.find(
        (player) => !!playerID && player.id === +playerID
    );

    return (
        <Box
            background={
                playerID ? playerBackgrounds[+playerID] : playerBackgrounds[0]
            }
            maxW="md"
            mt={10}
            mx="auto"
            p={4}
            rounded="20px"
            boxShadow={isActive ? "0px 0px 20px -5px rgba(255, 215, 0)" : null}
            borderColor={isActive ? "#fffb00" : "#fff0"}
            borderWidth="1px"
            borderStyle={isActive ? "solid" : "none"}
        >
            <Stack>
                <Flex alignItems="center">
                    {ctx.currentPlayer === playerID ? (
                        <Tooltip
                            hasArrow
                            label={`You are guessing this turn`}
                            aria-label={`You are guessing this turn`}
                            placement="top"
                        >
                            <Icon name="star" color="yellow.400" mr={2} />
                        </Tooltip>
                    ) : null}
                    <Text fontSize="xl" color="white">
                        <b>{currentPlayer?.name}</b>
                    </Text>
                </Flex>

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
