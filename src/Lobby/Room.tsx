import React from "react";
import { Box, Text, Spinner, Flex, Button, Divider } from "@chakra-ui/core";
import { useQuery, QueryStatus, useMutation } from "react-query";

export interface RoomProps {
    roomId: string;
    playerId: number;
    playerCred: string;
    serverUrl: string;
    onLeaveRoom: () => void;
}

export interface RoomInstanceData {
    roomID: string;
    players: {
        id: number;
        name: string;
    }[];
}

export const Room: React.FC<RoomProps> = ({
    roomId,
    playerCred,
    playerId,
    onLeaveRoom,
    serverUrl,
}) => {
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

    const [leaveRoom] = useMutation<
        undefined,
        undefined,
        { roomId: string; playerId: number; playerCred: string }
    >(({ roomId, playerId, playerCred }) =>
        fetch(`${serverUrl}/games/just-one/${roomId}/leave`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playerID: playerId,
                credentials: playerCred,
            }),
        }).then((res) => res.json())
    );

    const handleLeaveRoom = async () => {
        try {
            await leaveRoom({
                playerCred: playerCred,
                playerId: playerId,
                roomId: roomId,
            });
            onLeaveRoom();
        } catch (error) {}
    };

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
                            <Text
                                p={2}
                                mb={2}
                                mr={2}
                                color="white"
                                bg="#0005"
                                rounded="md"
                                key={player.id}
                            >
                                {player.name ? player.name : "[OPEN]"}
                            </Text>
                        ))}
                    </Flex>
                    <Divider />
                    <Flex justifyContent="flex-end">
                        <Button
                            variantColor="yellow"
                            onClick={() => handleLeaveRoom()}
                        >
                            Leave
                        </Button>
                        <Button ml={2} variantColor="teal">
                            Start
                        </Button>
                    </Flex>
                </Box>
            )}
        </Box>
    );
};
