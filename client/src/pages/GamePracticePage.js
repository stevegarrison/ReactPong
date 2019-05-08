import React, { Component } from "react";
import GameCom from "../components/GameCom"


class GamePage extends Component {
    render() {
        return (
            <>
                <GameCom multiPlayer={0} practiceMode={1}></GameCom>
            </>
        );
    }
}

export default GamePage;
