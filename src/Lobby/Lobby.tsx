import React from "react";
import {
    Box,
    Text,
    Flex,
    Input,
    Button,
    Divider,
    useToast,
} from "@chakra-ui/core";
import { useMutation } from "react-query";
import { url } from "../BackgroundPatterns";
import { RoomList } from "./RoomList";
import { CreateRoom } from "./CreateRoom";

const serverUrl = "http://localhost:8000";

export const Lobby: React.FC = () => {
    const [isNameConfirmed, setIsNameConfirmed] = React.useState(false);
    const [name, setName] = React.useState("");

    const toast = useToast();

    const [mutate, { data: joinRoomData }] = useMutation<
        { playerCredentials: string },
        undefined,
        { roomId: string; playerId: number; playerName: string }
    >(({ roomId, playerId, playerName }) =>
        fetch(`${serverUrl}/games/just-one/${roomId}/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playerID: playerId,
                playerName: playerName,
            }),
        }).then((res) => res.json())
    );

    if (joinRoomData) console.log(joinRoomData.playerCredentials);

    const handleJoinRoom = (playerId: number, roomId: string) => {
        if (!name) {
            toast({
                title: "Can't join game",
                description: "You need to choose a name first, dumbass",
                status: "warning",
                position: "top-right",
            });
        }
        mutate({ playerId: playerId, playerName: name, roomId: roomId });
    };

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
                <RoomList serverUrl={serverUrl} onJoinRoom={handleJoinRoom} />
            </Box>
        </Box>
    );
};
