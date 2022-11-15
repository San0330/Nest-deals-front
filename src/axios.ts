import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true
});


