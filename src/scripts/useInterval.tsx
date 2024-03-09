import React, { useState, useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            let toCall = savedCallback.current ?  savedCallback.current : () => {return null};
            toCall();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/