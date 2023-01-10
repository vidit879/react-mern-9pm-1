import React from 'react';
import {Link} from "react-router-dom";

interface IProps {
    color: string;
    heading?: string;
}

const NavBar: React.FC<IProps> = (props) => {
    return (
        <>
            <nav className={`navbar navbar-dark ${props.color} navbar-expand-sm`}>
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <i className="bi bi-phone"></i> Contacts <span className="text-warning">Manager</span></Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contacts/admin" className="nav-link">Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
};
export default NavBar;