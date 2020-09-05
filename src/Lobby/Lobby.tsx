import React from "react";
import { Box, Text, Flex, Input, Button, Tooltip } from "@chakra-ui/core";
import { useQuery } from "react-query";
import { url } from "../BackgroundPatterns";

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

    const { data } = useQuery<RoomInstances>(
        "roomInstances",
        () => fetch(`${server}/games/just-one`).then((res) => res.json()),
        {
            refetchInterval: 5000,
        }
    );

    console.log(data);

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
                            aria-label={
                                playerList ? playerList : "No players yet"
                            }
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
                                    onClick={() => setIsConfirmed(true)}
                                >
                                    Join
                                </Button>
                            </Flex>
                        </Tooltip>
                    );
                })}
            </Box>
        </Box>
    );
};
