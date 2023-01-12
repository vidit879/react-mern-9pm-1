import React from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import * as counterReducer from '../redux/counter/counter.slice';

let CounterRedux: React.FC = () => {
    const dispatch = useAppDispatch();

    // read data from Redux
    const counterState: counterReducer.InitialState = useSelector((store: RootState) => {
        return store[counterReducer.counterFeature];
    })

    let clickIncr = (): void => {
        dispatch({
            type: `${counterReducer.increment}`
        });
    };

    let clickDecr = (): void => {
        dispatch({
            type: `${counterReducer.decrement}`
        });
    };

    let clickIncrBy = (value: number): void => {
        dispatch({
            type: `${counterReducer.incrementBy}`,
            payload: {
                value: value
            }
        });
    };

    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <p className="h3 display-3">{counterState.count}</p>
                                <button onClick={clickIncr} className="btn btn-success m-1">Increment</button>
                                <button onClick={clickDecr} className="btn btn-warning m-1">Decrement</button>
                                <button onClick={() => clickIncrBy(5)} className="btn btn-danger m-1">Increment by 5
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default CounterRedux;