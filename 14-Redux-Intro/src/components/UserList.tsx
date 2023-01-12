import React, {useEffect, useState} from 'react';
import {IUser} from "../models/IUser";
import {UserService} from "../services/UserService";
import Spinner from "../layout/Spinner";

interface IProps {
}

interface IState {
}

let UserList: React.FC<IProps> = ({}) => {

    let [loading, setLoading] = useState<boolean>(false);
    let [users, setUsers] = useState<IUser[]>([] as IUser[]);
    let [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        setLoading((prevState) => {
            return true
        });
        UserService.getAllUsers().then((response) => {
            let users = response.data;
            setUsers((prevState) => {
                return users;
            });
            setLoading((prevState) => {
                return false
            });
        }).catch((error) => {
            setErrorMessage((prevState) => {
                return error.message;
            });
            setLoading((prevState) => {
                return false
            });
        })

    }, []);

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
                        errorMessage.length > 0 &&
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-danger text-center">{errorMessage}</p>
                            </div>
                        </div>
                    }

                    {
                        errorMessage.length === 0 && users.length > 0 &&

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
export default UserList;