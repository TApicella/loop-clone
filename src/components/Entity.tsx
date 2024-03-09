import React, { useContext, useEffect } from 'react';
import { IGameContext, GameContext } from 'GameContext';

interface IEntity {
    name: string;
    id?: string;
    image: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    initEntity?: (IEntity) => IEntity;
    registerListeners?: () => void;
    getSelf?: (IGameContext) => IEntity;
}

const initEntity = (entity: IEntity) => {
    if(entity.initEntity){
        entity = entity.initEntity(entity);
    }
    entity.registerListeners && entity.registerListeners(); 
    return entity
}

const Entity = (entity: IEntity) => {
    let {name, id, image, width, height, x, y} = entity;
    x = x || 0;
    y = y || 0;
    id = id || name+"_"+self.crypto.randomUUID();

    let { gameState, setGameState } = useContext(GameContext) as IGameContext;

    let loaded = document.getElementById(id);
    useEffect(() => {
        if(loaded){
            entity = initEntity(entity);
        }
        entity.getSelf = (gameState) => gameState.entities[entity.id];

        let entities = {...gameState.entities, id: {...entity}}
        setGameState({...gameState, ...entities});
    }, [loaded]);
    return (
        <>
            <div id='entity_wrapper'>
                <span id={id}></span>
            </div>
        </>
        );
}

export default Entity