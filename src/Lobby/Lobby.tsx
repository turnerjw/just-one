import React from "react";
import { Box, Text, Flex, Input, Button, Divider } from "@chakra-ui/core";
import { url } from "../BackgroundPatterns";
import { RoomList } from "./RoomList";
import { CreateRoom } from "./CreateRoom";

const serverUrl = "http://localhost:8000";

export const Lobby: React.FC = () => {
    const [isNameConfirmed, setIsNameConfirmed] = React.useState(false);
    const [name, setName] = React.useState("");

    return (
        <Box>
            <Text color="white" fontSize="3xl">
                Lobby
            </Text>
            <Box
                background={`url("${url}"),
                        linear-gradient(135deg,#0010ff,#0063e1)`}
                maxW="md"
                my={10}
                mx="auto"
                p={4}
                rounded="20px"
            >
                {isNameConfirmed ? (
                    <Flex alignItems="center" justifyContent="space-between">
                        <Text color="white">
                            Name: <b>{name}</b>
                        </Text>
                        <Button
                            ml={2}
                            variantColor="teal"
                            onClick={() => setIsNameConfirmed(false)}
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
                            onClick={() => setIsNameConfirmed(true)}
                        >
                            Submit
                        </Button>
                    </Flex>
                )}
            </Box>
            <Box
                background={`url("${url}"),
            linear-gradient(135deg,#0010ff,#0063e1)`}
                maxW="md"
                mx="auto"
                p={4}
                rounded="20px"
            >
                <Text fontSize="2xl" color="white">
                    <b>Room List</b>
                </Text>
                <CreateRoom serverUrl={serverUrl} />
                <Divider />
                <RoomList />
            </Box>
        </Box>
    );
};
