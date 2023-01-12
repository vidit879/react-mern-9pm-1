import React, {useState} from 'react';

interface IState {
    count: number;
}

let Counter: React.FC = () => {
    let [state, setState] = useState<IState>({
        count: 0
    });

    let clickIncr = (): void => {
        setState({
            ...state,
            count: state.count + 1
        })
    };

    let clickDecr = (): void => {
        setState({
            count: state.count - 1
        })
    };

    let clickIncrBy = (value: number): void => {
        setState({
            count: state.count + value
        });
    };

    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <p className="h3 display-3">{state.count}</p>
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
export default Counter;