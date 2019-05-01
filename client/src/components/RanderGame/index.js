/**
 * 
 *      RenderGame.js
 * 
 */

import React, { Component } from "react";


class RenderGame extends Component { 

    state = {
        m_renderObjs =[]
    }

    componentDidMount() { 

    }

    processRenderCalls(_renderObjs) { 
        
        var renderObjects = [];
        for (let i = 0; i < _renderObjs.length; ++i) { 
            switch (_renderObjs[i].command) {
                
                case "draw-image":
                    renderObjects.push(<img src={_renderObjs[i].url}></img>);
                    break;
                default:
                    break;

            };
        }
    }

    render() { 
        return <>
            {this.state.m_renderObjs.map(_renderObj => _renderObj)}
        </>;
    }
};
