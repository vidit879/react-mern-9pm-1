import React from 'react';
import spinnerImg from '../assets/loading.gif';

interface IProps {
}

interface IState {
}

let Spinner: React.FC<IProps> = ({}) => {
    return (
        <>
            <div>
                <img src={spinnerImg} alt="" className="d-block m-auto"/>
            </div>
        </>
    )
};
export default Spinner;