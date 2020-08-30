import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Flex, Button } from "@chakra-ui/core";

export const ChooseNumber: React.FC<BoardProps<JustOneState>> = ({
    moves,
    playerID,
    ctx,
}) => (
    <>
        {ctx.activePlayers &&
        playerID &&
        ctx.activePlayers[playerID] === "chooseNumber" ? (
            <Flex mx="auto">
                <Button
                    variantColor="teal"
                    mr={2}
                    onClick={() => moves.chooseNumber(0)}
                >
                    1
                </Button>
                <Button
                    variantColor="teal"
                    mr={2}
                    onClick={() => moves.chooseNumber(1)}
                >
                    2
                </Button>
                <Button
                    variantColor="teal"
                    mr={2}
                    onClick={() => moves.chooseNumber(2)}
                >
                    3
                </Button>
                <Button
                    variantColor="teal"
                    mr={2}
                    onClick={() => moves.chooseNumber(3)}
                >
                    4
                </Button>
                <Button
                    variantColor="teal"
                    mr={2}
                    onClick={() => moves.chooseNumber(4)}
                >
                    5
                </Button>
            </Flex>
        ) : null}
    </>
);
