import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Box, Button, Stack, Text, Flex, Input } from "@chakra-ui/core";

import { JustOneState } from "./Game";

export const Board: React.FC<BoardProps<JustOneState>> = ({
    G,
    moves,
    playerID,
    isActive,
}) => {
    const [clue, setClue] = React.useState("");

    return (
        <Box bg="gray.100" maxW="sm" mt={64} mx="auto" p={4} borderRadius="lg">
            <Stack>
                <Text>Player ID: {playerID}</Text>
                <Text>Active: {isActive ? "True" : "False"}</Text>
                <Button variantColor="teal" onClick={() => moves.drawCard()}>
                    Draw Card
                </Button>
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
                <Flex>
                    <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setClue(e.target.value)
                        }
                        placeholder="Submit a clue"
                    />
                    <Button
                        ml={2}
                        variantColor="green"
                        onChange={() => moves.submitClue(clue)}
                    >
                        Submit
                    </Button>
                </Flex>
            </Stack>
        </Box>
    );
};
