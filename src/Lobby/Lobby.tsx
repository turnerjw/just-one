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
import { Room } from "./Room";

const serverUrl = "http://localhost:8000";

export const Lobby: React.FC = () => {
    const [isNameConfirmed, setIsNameConfirmed] = React.useState(
        localStorage.getItem("isNameConfirmed") === "true" ? true : false
    );
    const [name, setName] = React.useState(() => {
        const shouldResetName =
            localStorage.getItem("isNameConfirmed") !== "true";
        if (shouldResetName) return "";
        else return localStorage.getItem("name") || "";
    });

    const [currentRoomId, setCurrentRoomId] = React.useState<
        string | undefined
    >(localStorage.getItem("currentRoomId") || undefined);
    const [playerCred, setPlayerCred] = React.useState<string | undefined>(
        localStorage.getItem("playerCred") || undefined
    );
    const [playerId, setPlayerId] = React.useState<number | undefined>(
        Number.isSafeInteger(Number(localStorage.getItem("playerId")))
            ? Number(localStorage.getItem("playerId"))
            : undefined
    );

    React.useEffect(() => {
        localStorage.setItem(
            "isNameConfirmed",
            JSON.stringify(isNameConfirmed)
        );
    }, [isNameConfirmed]);
    React.useEffect(() => {
        if (name) localStorage.setItem("name", name);
    }, [name]);
    React.useEffect(() => {
        if (currentRoomId) localStorage.setItem("currentRoomId", currentRoomId);
    }, [currentRoomId]);
    React.useEffect(() => {
        if (playerCred) localStorage.setItem("playerCred", playerCred);
    }, [playerCred]);
    React.useEffect(() => {
        if (playerId) localStorage.setItem("playerId", playerId.toString());
    }, [playerId]);

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

    const handleJoinRoom = async (playerId: number, roomId: string) => {
        if (!name) {
            toast({
                title: "Can't join game",
                description: "You need to choose a name first, dumbass",
                status: "warning",
                position: "top-right",
            });
        }
        try {
            const playerCred = await mutate({
                playerId: playerId,
                playerName: name,
                roomId: roomId,
            });
            setCurrentRoomId(roomId);
            setPlayerCred(playerCred?.playerCredentials);
            setPlayerId(playerId);
        } catch {
            toast({
                title: "Can't join game",
                description: "There was a problem, idk what happened",
                status: "error",
                position: "top-right",
            });
        }
    };

    const handleLeaveRoom = () => {
        setCurrentRoomId(undefined);
        setPlayerCred(undefined);
        setPlayerId(undefined);
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
                            value={name}
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
                {!!currentRoomId && playerId !== undefined && !!playerCred ? (
                    <Room
                        roomId={currentRoomId}
                        onLeaveRoom={handleLeaveRoom}
                        playerCred={playerCred}
                        playerId={playerId}
                        serverUrl={serverUrl}
                    />
                ) : (
                    <>
                        <Text fontSize="2xl" color="white">
                            <b>Room List</b>
                        </Text>
                        <CreateRoom serverUrl={serverUrl} />
                        <Divider />
                        <RoomList
                            serverUrl={serverUrl}
                            onJoinRoom={handleJoinRoom}
                        />
                    </>
                )}
            </Box>
        </Box>
    );
};
