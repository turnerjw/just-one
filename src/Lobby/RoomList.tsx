import React from "react";
import { useQuery } from "react-query";
import { Tooltip, Flex, Button, Text, Stack, Box } from "@chakra-ui/core";

const server = "http://localhost:8000";

interface RoomInstances {
    rooms: {
        gameID: string;
        players: { id: string; name?: string }[];
    }[];
}

export const RoomList: React.FC = () => {
    const { data } = useQuery<RoomInstances>(
        "roomInstances",
        () => fetch(`${server}/games/just-one`).then((res) => res.json()),
        {
            refetchInterval: 5000,
        }
    );

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
                                    <b>{room.gameID}</b>{" "}
                                    {
                                        room.players.filter(
                                            (player) => !!player.name
                                        ).length
                                    }
                                    /{room.players.length} players
                                </Text>
                                <Button
                                    ml={2}
                                    variantColor="teal"
                                    onClick={() => console.log("Join clicked")}
                                >
                                    Join
                                </Button>
                            </Flex>
                        </Tooltip>
                    </Box>
                );
            })}
        </Stack>
    );
};
