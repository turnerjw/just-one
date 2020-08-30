import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Flex, Button } from "@chakra-ui/core";

export const CheckGuess: React.FC<BoardProps<JustOneState>> = ({
    moves,
    playerID,
    ctx,
}) => (
    <>
        {ctx.activePlayers &&
        playerID &&
        ctx.activePlayers[playerID] === "checkGuess" ? (
            <Flex justifyContent="center">
                <Button
                    mr={2}
                    variantColor="green"
                    onClick={() => moves.checkGuess(true)}
                >
                    Correct
                </Button>
                <Button
                    variantColor="red"
                    onClick={() => moves.checkGuess(false)}
                >
                    Incorrect
                </Button>
            </Flex>
        ) : null}
    </>
);
