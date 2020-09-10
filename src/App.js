import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";

const reducers = combineReducers({
    keplerGl: keplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
    return (
        <Provider store={store}>
            <Map />
        </Provider>
    );
}

function Map() {
    const dispatch = useDispatch();
    const { data } = useSwr("london-energy-consumption", async () => {
        const response = await fetch(
            "https://raw.githubusercontent.com/spiderPan/london-energy-consumption/master/data/keplergl.json"
        );
        const data = await response.json();
        return data;
    });

    React.useEffect(() => {
        if (data) {
            console.log(data);
            dispatch(
                addDataToMap(data)
            );
        }
    }, [dispatch, data]);

    return (
        <KeplerGl
            id="london-energy-consumption"
            // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
            mapboxApiAccessToken="pk.eyJ1IjoicGFuYmFuZ2xhbmZlbmciLCJhIjoiY2tldzcwZXpwMDQ1bjJ2cGY5MGE4aGh4eiJ9.KxSVCnIYnGanlenavcPJLg"
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
}