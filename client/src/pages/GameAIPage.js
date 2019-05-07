import React, { Component } from "react";
import GameCom from "../components/GameCom"


class GamePage extends Component {
    render() {
        return (
            <>
                <GameCom multiPlayer={1}></GameCom>
            </>
        );
    }
}

export default GamePage;
