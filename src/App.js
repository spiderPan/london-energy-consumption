import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import KeplerGlSchema from 'kepler.gl/schemas';
import useSwr from "swr";
import datajson from './keplergl.json';

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
        const { datasets, config } = datajson;
        const data = KeplerGlSchema.load(datasets, config);

        return data;
    });

    React.useEffect(() => {
        if (data) {
            dispatch(
                addDataToMap(data)
            );
        }
    }, [dispatch, data]);

    return (
        <KeplerGl
            id="london-energy-consumption"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
}