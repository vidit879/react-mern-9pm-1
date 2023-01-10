import React, {useEffect, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link} from "react-router-dom";
import {IContact} from "../../models/IContact";
import {ContactService} from "../../services/ContactService";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import ContactCard from "../../components/ContactCard";
import {ToastUtil} from "../../../../util/ToastUtil";

interface IState {
    loading: boolean;
    contacts: IContact[];
    filteredContacts: IContact[];
    errorMessage: string;
}

export const ContactsAdmin: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [state, setState] = useState<IState>({
        loading: false,
        contacts: [] as IContact[],
        filteredContacts: [] as IContact[],
        errorMessage: ""
    });

    useEffect(() => {
        getAllContactsFromServer();
    }, []);

    const makeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setSearchQuery(event.target.value);
        if (event.target.value.trim() !== "") {
            setState({
                ...state,
                filteredContacts: state.contacts.filter(contact => contact.name.toLowerCase().trim().includes(event.target.value.toLowerCase().trim()))
            })
        } else {
            setState({
                ...state,
                filteredContacts: state.contacts
            })
        }

    };


    const getAllContactsFromServer = () => {
        setState({...state, loading: true});
        ContactService.getAllContacts().then((response) => {
            setState({
                ...state,
                loading: false,
                contacts: response.data,
                filteredContacts: response.data
            })
        }).catch((error) => {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        });
    }

    const {loading, contacts, errorMessage, filteredContacts} = state;

    const clickDeleteContact = (contactId: string | undefined): void => {
        if (contactId) {
            ContactService.deleteContact(contactId).then((response) => {
                if (response.data) {
                    getAllContactsFromServer();
                    ToastUtil.displayInfoToast("Contact is Deleted!");
                }
            }).catch((error) => {
                ToastUtil.displayErrorToast(error.message);
            })
        }
    };

    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Manage Contacts'} color={'text-dark'}/>
            {!loading && errorMessage.length > 0 && <ErrorMessage message={errorMessage}/>}
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input
                                        value={searchQuery}
                                        onChange={e => makeSearch(e)}
                                        className="form-control" placeholder="Search here" type="text"/>
                                </div>
                                <div className="col">
                                    <input className="btn btn-dark me-2" type="submit"/>
                                    <Link className="btn btn-success" to={'/contacts/add'}>
                                        <i className="bi bi-plus-circle-fill"></i> New</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                filteredContacts.length > 0 ? <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            {
                                filteredContacts.map((contact, index) => {
                                    return (
                                        <div className="col-sm-6 mt-3" key={contact.id}>
                                            {
                                                contact &&
                                                <ContactCard contact={contact} clickDeleteContact={clickDeleteContact}/>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section> : <>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col text-center">
                                <p className="h4 text-danger">No Contacts Found</p>
                            </div>
                        </div>
                    </div>
                </>
            }


        </>
    )
};
export default ContactsAdmin;