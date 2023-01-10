import {IContact} from "../models/IContact";
import axios from 'axios';
import {IGroup} from "../models/IGroup";

export class ContactService {
    private static serverUrl: string = `http://localhost:9000`;

    /**
     @usage : to get all contacts
     @method : GET
     @params : no-params
     @url : http://localhost:9000/contacts
     */
    public static getAllContacts(): Promise<{ data: IContact[] }> {
        let dataUrl: string = `${this.serverUrl}/contacts`;
        return axios.get(dataUrl);
    }

    /**
     @usage : get a contact
     @method : GET
     @params : no-params
     @url : http://localhost:9000/contacts/:contactId
     */
    public static getContact(contactId: string): Promise<{ data: IContact }> {
        let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.get(dataUrl);
    }

    /**
     @usage : create a contact
     @method : POST
     @params : name, imageUrl, email, mobile, company, title, groupId
     @url : http://localhost:9000/contacts/
     */
    public static createContact(contact: IContact): Promise<{ data: IContact }> {
        let dataUrl: string = `${this.serverUrl}/contacts/`;
        return axios.post(dataUrl, contact);
    }

    /**
     @usage : Update a contact
     @method : PUT
     @params : name, imageUrl, email, mobile, company, title, groupId
     @url : http://localhost:9000/contacts/:contactId
     */
    public static updateContact(contact: IContact, contactId: string): Promise<{ data: IContact }> {
        let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.put(dataUrl, contact);
    }

    /**
     @usage : Delete a contact
     @method : DELETE
     @params : no-params
     @url : http://localhost:9000/contacts/:contactId
     */
    public static deleteContact(contactId: string): Promise<{ data: {} }> {
        let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.delete(dataUrl);
    }

    /**
     @usage : Get all groups
     @method : GET
     @params : no-params
     @url : http://localhost:9000/groups/
     */
    public static getAllGroups(): Promise<{ data: IGroup[] }> {
        let dataUrl: string = `${this.serverUrl}/groups`;
        return axios.get(dataUrl);
    }

    /**
     @usage : Get a group
     @method : GET
     @params : no-params
     @url : http://localhost:9000/groups/:groupId
     */
    public static getGroup(contact: IContact): Promise<{ data: IGroup }> {
        let {groupId} = contact;
        let dataUrl: string = `${this.serverUrl}/groups/${groupId}`;
        return axios.get(dataUrl);
    }
}