import React from 'react';
import {IEmployee} from "../models/IEmployee";
import {useSelector} from "react-redux";
import * as employeeReducer from '../redux/employees/employees.slice';
import {RootState, useAppDispatch} from "../redux/store";

let EmployeesRedux: React.FC = () => {
    const dispatch = useAppDispatch();

    /**
     * read data from redux store
     */
    const employeeState: employeeReducer.InitialState = useSelector((store: RootState) => {
        return store[employeeReducer.employeeFeature];
    })

    let {employees} = employeeState;

    let updateSelected = (empId: number) => {
        dispatch({
            type: `${employeeReducer.updateEmployeeSelect}`,
            payload: {
                empId: empId
            }
        })
    };


    return (
        <React.Fragment>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className="h3 text-primary">EmployeesRedux</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ea, eos officia ratione
                            reiciendis repellendus sapiente sit sunt voluptatem. A accusamus beatae consectetur cum
                            inventore, magni quae! Deserunt, facilis, officiis?</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-group">
                            {
                                employees.length > 0 &&
                                employees.map(employee => {
                                    return (
                                        <li key={employee.id} className="list-group-item">
                                            <input checked={employee.isSelected}
                                                   onChange={() => updateSelected(employee.id)} type="checkbox"
                                                   className="form-check-input me-2"/>
                                            {employee.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-md-6">
                        {
                            employees.length > 0 &&
                            employees.map(employee => {
                                return (
                                    <div key={employee.id}>
                                        {
                                            employee.isSelected &&
                                            <div className="card my-2">
                                                <div className="card-body">
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            Name : <span className="fw-bold">{employee.name}</span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Email : <span className="fw-bold">{employee.email}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default EmployeesRedux;