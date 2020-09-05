import React from "react";
import { useQuery } from "react-query";
import { Tooltip, Flex, Button, Text } from "@chakra-ui/core";

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

    console.log(data);

    return (
        <>
            {data?.rooms.map((room, index) => {
                const playerList = room.players
                    .filter((player) => player.name)
                    .reduce((prev, player, index) => {
                        return `${prev}${
                            index === 0 ? player.name : `, ${player.name}`
                        }`;
                    }, "");
                return (
                    <Tooltip
                        hasArrow
                        placement="top"
                        label={playerList ? playerList : "No players yet"}
                        aria-label={playerList ? playerList : "No players yet"}
                        key={room.gameID}
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            mt={index === 0 ? 0 : 2}
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
                );
            })}
        </>
    );
};
