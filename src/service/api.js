import axios from 'axios';

export default axios.create({
    baseURL: 'https://storage.googleapis.com/dito-questions/events.json'
});