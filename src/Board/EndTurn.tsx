import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState, TurnResult } from "../Game";
import { Stack, Button, Text } from "@chakra-ui/core";

export const EndTurn: React.FC<BoardProps<JustOneState>> = ({
    G,
    moves,
    playerID,
    ctx,
}) => {
    const getResultText = () => {
        switch (G.turnResult) {
            case TurnResult.Correct:
                return "Got 'em!";
            case TurnResult.Incorrect:
                return "Dang it Bobby!";
            case TurnResult.Skip:
                return "Skipped!";
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
                <Stack>
                    <Text color="white">
                        <b>{getResultText()}</b>
                    </Text>
                    <Button variantColor="teal" onClick={() => moves.endTurn()}>
                        Next Turn
                    </Button>
                </Stack>
            ) : null}
        </>
    );
};
