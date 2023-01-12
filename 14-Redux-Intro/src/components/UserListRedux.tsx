import React, {useEffect} from 'react';
import Spinner from "../layout/Spinner";
import {AppDispatch, RootState, useAppDispatch} from "../redux/store";
import * as userActions from "../redux/users/user.actions";
import * as userReducer from "../redux/users/user.slice";
import {useSelector} from "react-redux";

let UserListRedux: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    /**
     * read the data from redux store
     */
    const userState: userReducer.InitialState = useSelector((store: RootState) => {
        return store[userReducer.userFeature];
    });

    useEffect(() => {
        dispatch(userActions.getAllUsersAction());
    }, []);

    const {loading, users, errorMessage} = userState;

    return (
        <React.Fragment>
            <div className="grid">
                <div className="container mt-3">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">User List</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                                autem, consequatur culpa, est explicabo facilis fuga, harum incidunt inventore nihil
                                porro quis ratione reprehenderit tempore voluptates? Accusantium delectus porro
                                quae?</p>
                        </div>
                    </div>

                    {
                        loading && <Spinner/>
                    }

                    {
                        Object.keys(errorMessage).length > 0 &&
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-danger text-center">{JSON.stringify(errorMessage)}</p>
                            </div>
                        </div>
                    }

                    {
                        Object.keys(errorMessage).length === 0 && users.length > 0 &&
                        <div className="row">
                            <div className="col">
                                <table className="table table-hover text-center table-sthiped">
                                    <thead>
                                    <tr>
                                        <th>SNO</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Street</th>
                                        <th>City</th>
                                        <th>Company</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        users.map(user => {
                                            return (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.address.street}</td>
                                                    <td>{user.address.city}</td>
                                                    <td>{user.company.name}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
};
export default UserListRedux;