import React from "react";
import { BoardProps } from "boardgame.io/react";
import { JustOneState } from "../Game";
import { Stack, Flex, Input, Button } from "@chakra-ui/core";

export const GuessWord: React.FC<BoardProps<JustOneState>> = ({
    moves,
    playerID,
    ctx,
}) => {
    const [guess, setGuess] = React.useState("");

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
                            onClick={() => moves.guessWord(guess)}
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
