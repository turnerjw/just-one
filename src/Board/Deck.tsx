import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { JustOneState } from "../Game";
import { Box, AspectRatioBox, Text } from "@chakra-ui/core";
import { url } from "../BackgroundPatterns";

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

export const Deck: React.FC<BoardProps<JustOneState>> = (props) => {
    const { G } = props;
    const deckShadow =
        G.deck.length > 3
            ? deckShadows[2]
            : G.deck.length === 2
            ? deckShadows[1]
            : deckShadows[0];
    return (
        <Box>
            <Text color="white" textAlign="center">
                <b>Deck</b> ({G.deck.length} cards)
            </Text>
            <AspectRatioBox maxW="150px" ratio={3 / 4}>
                {G.deck.length ? (
                    <Box
                        background={`url("${url}"),
            linear-gradient(135deg,#0010ff,#0063e1)`}
                        rounded="20px"
                        borderColor="purple.500"
                        borderStyle="solid"
                        boxShadow={deckShadow}
                    />
                ) : null}
            </AspectRatioBox>
        </Box>
    );
};
