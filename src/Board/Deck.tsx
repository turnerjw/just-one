import React from "react";
import { Box, AspectRatioBox, Text } from "@chakra-ui/core";
import { gameBackground } from "../BackgroundPatterns";

const deckShadows = [
    `/* The top layer shadow */
    0 5px 1px -4px rgba(255,215,0)`,

    `/* The top layer shadow */
    0 5px 1px -4px rgba(255,215,0),
    /* The second layer */
    0 10px 0 -5px #0063e1,
    /* The second layer shadow */
    0 10px 1px -4px rgba(255, 215, 0)`,

    `/* The top layer shadow */
    0 5px 1px -4px rgba(255,215,0),
    /* The second layer */
    0 10px 0 -5px #0063e1,
    /* The second layer shadow */
    0 10px 1px -4px rgba(255, 215, 0),
     /* The third layer */
    0 20px 0 -10px #0063e1,
    /* The third layer shadow */
    0 20px 1px -9px rgba(255, 215, 0)`,
];

export interface DeckProps {
    label: string;
    count: number;
}

export const Deck: React.FC<DeckProps> = ({ count, label }) => {
    const deckShadow =
        count > 3
            ? deckShadows[2]
            : count === 2
            ? deckShadows[1]
            : deckShadows[0];
    return (
        <Box>
            <AspectRatioBox maxW="150px" ratio={3 / 4}>
                {count ? (
                    <Box
                        background={gameBackground}
                        rounded="20px"
                        borderColor="white"
                        borderStyle="solid"
                        boxShadow={deckShadow}
                    />
                ) : (
                    <Box
                        rounded="20px"
                        borderColor="white"
                        borderStyle="solid"
                        borderWidth="2px"
                    />
                )}
            </AspectRatioBox>
            <Text mt={4} color="white" textAlign="center">
                <b>{label}</b> ({count} cards)
            </Text>
        </Box>
    );
};
