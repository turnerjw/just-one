import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Button } from "@chakra-ui/core";

export const DrawCard: React.FC<BoardProps<JustOneState>> = ({
    moves,
    playerID,
    ctx,
}) => (
    <>
        {ctx.activePlayers &&
        playerID &&
        ctx.activePlayers[playerID] === "drawCard" ? (
            <Button variantColor="teal" onClick={() => moves.drawCard()}>
                Draw Card
            </Button>
        ) : null}
    </>
);
