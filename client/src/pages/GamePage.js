import React, { Component } from "react";
import GameCom from "../components/GameCom"


class GamePage extends Component {
    render() {
        return (
            <>
                <GameCom multiPlayer={0} practiceMode={0}></GameCom>
            </>
        );
    }
}

export default GamePage;
