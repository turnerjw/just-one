import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { JustOneState } from "../../Game";
import { Text, Flex, Stack } from "@chakra-ui/core";

export const GameOver: React.FC<BoardProps<JustOneState>> = ({ G, ctx }) => {
    return (
        <>
            {ctx.gameover ? (
                <Flex alignItems="center">
                    <Stack textAlign="center">
                        <Text fontSize="4xl" color="white">
                            <b>Score: </b>
                            {G.successPile.length}
                        </Text>
                        <Text fontSize="2xl" color="white">
                            <b>{ctx.gameover.message}</b>
                        </Text>
                    </Stack>
                </Flex>
            ) : null}
        </>
    );
};
