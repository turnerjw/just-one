import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Flex, Input, Button, useToast } from "@chakra-ui/core";

export const SubmitClues: React.FC<BoardProps<JustOneState>> = ({
    moves,
    playerID,
    ctx,
}) => {
    const [clue, setClue] = React.useState("");

    const toast = useToast();

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
                        onClick={() => {
                            if (!clue) {
                                toast({
                                    title: "Are you dumb, fam?",
                                    description: "You can't have a blank clue",
                                    position: "top-right",
                                    status: "warning",
                                });
                            } else {
                                moves.submitClue(clue);
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Flex>
            ) : null}
        </>
    );
};
