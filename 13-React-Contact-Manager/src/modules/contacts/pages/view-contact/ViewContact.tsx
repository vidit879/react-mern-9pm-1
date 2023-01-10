import React, {useEffect, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link, useParams} from "react-router-dom";
import {IContact} from "../../models/IContact";
import {ContactService} from "../../services/ContactService";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import {IGroup} from "../../models/IGroup";

interface IState {
    loading: boolean;
    contact: IContact;
    errorMessage: string;
    group: IGroup;
}

export const ViewContact: React.FC = () => {

    const {contactId} = useParams();

    const [state, setState] = useState<IState>({
        loading: false,
        contact: {} as IContact,
        errorMessage: "",
        group: {} as IGroup
    });

    useEffect(() => {
        if (contactId) {
            getContactFromServer(contactId);
        }
    }, [contactId]);

    const getContactFromServer = (contactId: string) => {
        setState({...state, loading: true});
        ContactService.getContact(contactId).then((contactResponse) => {
            const contact = contactResponse.data;
            ContactService.getGroup(contact).then((groupResponse) => {
                const group = groupResponse.data;
                setState({
                    ...state,
                    loading: false,
                    contact: contact,
                    group: group
                })
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        });
    }

    const {loading, errorMessage, contact, group} = state;

    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'View Contact'} color={'text-warning'}/>
            {!loading && errorMessage.length > 0 && <ErrorMessage message={errorMessage}/>}
            {
                contact && group && Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                <section className="mt-3">
                    <div className="container">
                        <div className="row mt-3 align-items-center">
                            <div className="col-sm-3">
                                <img alt=""
                                     className="img-fluid rounded-circle shadow-lg"
                                     src={contact.imageUrl}/>
                            </div>
                            <div className="col-sm-8 offset-1">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Name : <span className="fw-bold">{contact.name}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Email : <span className="fw-bold">{contact.email}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Mobile : <span className="fw-bold">{contact.mobile}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Company : <span className="fw-bold">{contact.company}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Title : <span className="fw-bold">{contact.title}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Group : <span className="fw-bold">{group.name}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <Link className="btn btn-warning" to="/contacts/admin">
                                    <i className="bi bi-arrow-left-circle-fill"></i> Back</Link>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
};
export default ViewContact;