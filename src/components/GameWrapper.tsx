import React, { useContext, useEffect, useState } from 'react';
import Editor from './Editor';
import { GameContext } from 'App';
import { createFullLoop } from 'scripts/generateLoop';
import LoopTile from './LoopTile';
import Loop from './Loop';

const GameWrapper = ({}) => {

    return (
        <div id="gameWrapper">
            <Loop/>
        </div>
      );
}

export default GameWrapper
