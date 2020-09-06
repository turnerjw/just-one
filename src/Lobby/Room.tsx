import React from "react";
import { Box, Text, Spinner, Flex, Button, Divider } from "@chakra-ui/core";
import { useQuery, QueryStatus } from "react-query";

export interface RoomProps {
    roomId: string;
    serverUrl: string;
}

export interface RoomInstanceData {
    roomID: string;
    players: {
        id: number;
        name: string;
    }[];
}

export const Room: React.FC<RoomProps> = ({ roomId, serverUrl }) => {
    const { data, status } = useQuery<RoomInstanceData>(
        "roomInstance",
        () =>
            fetch(`${serverUrl}/games/just-one/${roomId}`).then((res) =>
                res.json()
            ),
        {
            refetchInterval: 2000,
        }
    );

    console.log(data);

    return (
        <Box>
            {status === QueryStatus.Loading ? (
                <Spinner />
            ) : (
                <Box>
                    <Text mb={2} fontSize="2xl" color="white">
                        <b>Room ID: </b>
                        {data?.roomID}
                    </Text>
                    <Flex mb={2} wrap="wrap">
                        {data?.players.map((player) => (
                            <Box>
                                <Text
                                    p={2}
                                    mb={2}
                                    mr={2}
                                    color="white"
                                    bg="#0005"
                                    rounded="md"
                                >
                                    {player.name ? player.name : "[OPEN]"}
                                </Text>
                            </Box>
                        ))}
                    </Flex>
                    <Divider />
                    <Flex justifyContent="flex-end">
                        <Button variantColor="yellow">Leave</Button>
                        <Button ml={2} variantColor="teal">
                            Start
                        </Button>
                    </Flex>
                </Box>
            )}
        </Box>
    );
};
