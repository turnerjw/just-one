import React from "react";
import { BoardProps } from "boardgame.io/react";
import { Flex } from "@chakra-ui/core";

import { JustOneState } from "../../Game";
import { CurrentCard } from "./CurrentCard";
import { Clues } from "./Clues";
import { Guess } from "./Guess";
import { Result } from "./Result";

export const DisplayArea: React.FC<BoardProps<JustOneState>> = (props) => {
    return (
        <Flex justifyContent="center" w="100%" wrap="wrap">
            <CurrentCard {...props} />
            <Clues {...props} />
            <Guess {...props} />
            <Result {...props} />
        </Flex>
    );
};
