const { Server } = require("boardgame.io/server");
const { JustOne } = require("./Game");

const server = Server({ games: [JustOne] });

server.run(8000);
