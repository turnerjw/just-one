import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Flex, Input, Button } from "@chakra-ui/core";

export const SubmitClues: React.FC<BoardProps<JustOneState>> = ({
    moves,
    playerID,
    ctx,
}) => {
    const [clue, setClue] = React.useState("");

    return (
        <>
            {ctx.activePlayers &&
            playerID &&
            ctx.activePlayers[playerID] === "submitClues" ? (
                <Flex>
                    <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setClue(e.target.value)
                        }
                        placeholder="Submit a clue"
                    />
                    <Button
                        ml={2}
                        variantColor="teal"
                        onClick={() => moves.submitClue(clue)}
                    >
                        Submit
                    </Button>
                </Flex>
            ) : null}
        </>
    );
};
