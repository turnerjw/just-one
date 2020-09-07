import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { JustOneState, TurnResult } from "../../Game";
import { Text, Flex, Stack } from "@chakra-ui/core";

export const Result: React.FC<BoardProps<JustOneState>> = ({
    G,
    ctx,
    playerID,
}) => {
    const getResultText = () => {
        switch (G.turnResult) {
            case TurnResult.Correct:
                return "Correct";
            case TurnResult.Incorrect:
                return "Incorrect";
            case TurnResult.Skip:
                return "Skipped";
            default:
                break;
        }
    };
    const getMessageResultText = () => {
        switch (G.turnResult) {
            case TurnResult.Correct:
                return "Got 'em!";
            case TurnResult.Incorrect:
                return "Dang it Bobby!";
            case TurnResult.Skip:
                return "Could be worse";
            default:
                break;
        }
    };

    return (
        <>
            {!ctx.gameover &&
            ctx.activePlayers &&
            playerID &&
            ctx.activePlayers[playerID] === "endTurn" ? (
                <Flex alignItems="center">
                    <Stack textAlign="center">
                        <Text fontSize="4xl" color="white">
                            <b>{getResultText()}</b>
                        </Text>
                        <Text fontSize="2xl" color="white">
                            <b>{getMessageResultText()}</b>
                        </Text>
                    </Stack>
                </Flex>
            ) : null}
        </>
    );
};
