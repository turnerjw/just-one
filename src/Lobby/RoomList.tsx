import React from "react";
import { useQuery } from "react-query";
import { Tooltip, Flex, Button, Text, Stack, Box } from "@chakra-ui/core";

interface RoomInstances {
    rooms: {
        gameID: string;
        players: { id: string; name?: string }[];
    }[];
}

export interface RoomListProps {
    serverUrl: string;
    onJoinRoom: (playerId: number, roomId: string) => void;
}

export const RoomList: React.FC<RoomListProps> = ({
    serverUrl,
    onJoinRoom,
}) => {
    const { data } = useQuery<RoomInstances>(
        "roomInstances",
        () => fetch(`${serverUrl}/games/just-one`).then((res) => res.json()),
        {
            refetchInterval: 5000,
        }
    );

    if (data?.rooms.length === 0) {
        return (
            <Text color="white" textAlign="center">
                There are no rooms. You should create one, idiot.
            </Text>
        );
    }

    return (
        <Stack spacing={2}>
            {data?.rooms.map((room) => {
                const playerList = room.players
                    .filter((player) => player.name)
                    .reduce((prev, player, index) => {
                        return `${prev}${
                            index === 0 ? player.name : `, ${player.name}`
                        }`;
                    }, "");
                const currentPlayerCount = room.players.filter(
                    (player) => !!player.name
                ).length;
                const totalPlayerCount = room.players.length;
                return (
                    <Box key={room.gameID}>
                        <Tooltip
                            hasArrow
                            placement="top"
                            label={playerList ? playerList : "No players yet"}
                            aria-label={
                                playerList ? playerList : "No players yet"
                            }
                        >
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                rounded="md"
                                bg="#0005"
                            >
                                <Text ml={2} color="white">
                                    <b>{room.gameID}</b> {currentPlayerCount}/
                                    {totalPlayerCount} players
                                </Text>
                                {currentPlayerCount === totalPlayerCount ? (
                                    <Button ml={2} variantColor="teal">
                                        Spectate
                                    </Button>
                                ) : (
                                    <Button
                                        ml={2}
                                        variantColor="teal"
                                        onClick={() =>
                                            onJoinRoom(
                                                currentPlayerCount,
                                                room.gameID
                                            )
                                        }
                                    >
                                        Join
                                    </Button>
                                )}
                            </Flex>
                        </Tooltip>
                    </Box>
                );
            })}
        </Stack>
    );
};
