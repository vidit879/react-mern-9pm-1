import axios from 'axios';

export class UserService {
    private static serverUrl: string | undefined = "https://jsonplaceholder.typicode.com";

    public static getAllUsers() {
        return axios.get(`${this.serverUrl}/users`);
    }
}