import React from "react";
import { Box, Text, Flex, Input, Button, Tooltip } from "@chakra-ui/core";
import { useQuery } from "react-query";
import { url } from "../BackgroundPatterns";
import { RoomList } from "./RoomList";

const server = "http://localhost:8000";

interface RoomInstances {
    rooms: {
        gameID: string;
        players: { id: string; name?: string }[];
    }[];
}

export const Lobby: React.FC = () => {
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const [name, setName] = React.useState("");

    return (
        <Box>
            <Text color="white" fontSize="3xl">
                Lobby
            </Text>
            <Box
                background={`url("${url}"),
                        linear-gradient(135deg,#0010ff,#0063e1)`}
                maxW="sm"
                my={10}
                mx="auto"
                p={4}
                rounded="20px"
            >
                {isConfirmed ? (
                    <Flex alignItems="center" justifyContent="space-between">
                        <Text color="white">
                            <b>{name}</b>
                        </Text>
                        <Button
                            ml={2}
                            variantColor="teal"
                            onClick={() => setIsConfirmed(false)}
                        >
                            Edit
                        </Button>
                    </Flex>
                ) : (
                    <Flex>
                        <Input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                            placeholder="Choose a name"
                        />
                        <Button
                            ml={2}
                            variantColor="teal"
                            onClick={() => setIsConfirmed(true)}
                        >
                            Submit
                        </Button>
                    </Flex>
                )}
            </Box>
            <Box
                background={`url("${url}"),
            linear-gradient(135deg,#0010ff,#0063e1)`}
                maxW="lg"
                mx="auto"
                p={4}
                rounded="20px"
            >
                <RoomList />
            </Box>
        </Box>
    );
};
