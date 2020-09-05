import React from "react";
import { Flex, RadioGroup, Radio, Button, Text } from "@chakra-ui/core";
import { useMutation, QueryStatus } from "react-query";

export interface CreateRoomProps {
    serverUrl: string;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({ serverUrl }) => {
    const [createPlayerCount, setCreatePlayerCount] = React.useState<string>(
        "3"
    );

    const [mutate, { data, status }] = useMutation<{ gameID: string }>(() =>
        fetch(`${serverUrl}/games/just-one/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                numPlayers: +createPlayerCount,
            }),
        }).then((res) => res.json())
    );

    if (status === QueryStatus.Success && data) {
        return (
            <Text color="white">
                <b>Created room: </b>
                {data.gameID}
            </Text>
        );
    }

    return (
        <Flex alignItems="center" justifyContent="space-between">
            <Flex>
                <Text color="white" mr={2}>
                    <b>Players:</b>
                </Text>
                <RadioGroup
                    color="white"
                    spacing={5}
                    isInline
                    onChange={(e) => setCreatePlayerCount(e.target.value)}
                    value={createPlayerCount}
                >
                    <Radio value="3" variantColor="yellow">
                        3
                    </Radio>
                    <Radio value="4" variantColor="yellow">
                        4
                    </Radio>
                    <Radio value="5" variantColor="yellow">
                        5
                    </Radio>
                    <Radio value="6" variantColor="yellow">
                        6
                    </Radio>
                    <Radio value="7" variantColor="yellow">
                        7
                    </Radio>
                </RadioGroup>
            </Flex>
            <Button variantColor="teal" onClick={() => mutate()}>
                Create
            </Button>
        </Flex>
    );
};
