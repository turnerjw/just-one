import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Stack, Flex, Input, Button, useToast } from "@chakra-ui/core";

export const GuessWord: React.FC<BoardProps<JustOneState>> = ({
    moves,
    playerID,
    ctx,
}) => {
    const [guess, setGuess] = React.useState("");

    const toast = useToast();

    return (
        <>
            {ctx.activePlayers &&
            playerID &&
            ctx.activePlayers[playerID] === "guessWord" ? (
                <Stack>
                    <Flex>
                        <Input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setGuess(e.target.value)}
                            placeholder="Submit a guess"
                        />
                        <Button
                            ml={2}
                            variantColor="teal"
                            onClick={() => {
                                if (!guess)
                                    toast({
                                        title: "Are you dumb, fam?",
                                        description:
                                            "You can't have a blank guess",
                                        status: "warning",
                                        position: "top-right",
                                    });
                                else {
                                    moves.guessWord(guess);
                                    setGuess("");
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </Flex>
                    <Button
                        variantColor="yellow"
                        onClick={() => moves.skipGuess()}
                    >
                        Skip
                    </Button>
                </Stack>
            ) : null}
        </>
    );
};
