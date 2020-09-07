import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Button } from "@chakra-ui/core";

export const EndTurn: React.FC<BoardProps<JustOneState>> = ({
    G,
    moves,
    playerID,
    ctx,
}) => {
    return (
        <>
            {!ctx.gameover &&
            ctx.activePlayers &&
            playerID &&
            ctx.activePlayers[playerID] === "endTurn" ? (
                <Button variantColor="teal" onClick={() => moves.endTurn()}>
                    Next Turn
                </Button>
            ) : null}
        </>
    );
};
