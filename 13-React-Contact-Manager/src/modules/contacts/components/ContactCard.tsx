import React from 'react';
import {Link} from "react-router-dom";
import {IContact} from "../models/IContact";

interface IProps {
    contact: IContact;
    clickDeleteContact: (contactId: string | undefined) => void;
}

export const ContactCard: React.FC<IProps> = (props) => {

    const {contact, clickDeleteContact} = props;

    return (
        <>
            <div className="card shadow-lg">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-sm-3">
                            <img alt="" className="img-fluid rounded-circle"
                                 src={contact.imageUrl}/>
                        </div>
                        <div className="col-sm-8">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Name : <span className="fw-bold">{contact.name}</span>
                                </li>
                                <li className="list-group-item">
                                    Email : <span
                                    className="fw-bold">{contact.email}</span>
                                </li>
                                <li className="list-group-item">
                                    Mobile : <span className="fw-bold">{contact.mobile}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-1 d-flex flex-column align-items-center">
                            <Link className="btn btn-warning" to={`/contacts/view/${contact.id}`}>
                                <i className="bi bi-eye-fill"></i>
                            </Link>
                            <Link className="btn btn-primary mt-2"
                                  to={`/contacts/edit/${contact.id}`}>
                                <i className="bi bi-pencil-square"></i>
                            </Link>
                            <button className="btn btn-danger mt-2" onClick={() => clickDeleteContact(contact.id)}>
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ContactCard;