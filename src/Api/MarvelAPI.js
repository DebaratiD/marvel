import axios from "axios";
import {constants} from "../constants";
import CryptoJS from 'crypto-js';

const getMarvelHash = (ts) => {
    return CryptoJS.MD5(ts + constants.MARVEL_PRIVATE + constants.MARVEL_PUBLIC).toString();
};

const url = constants.MARVEL_URL;


export const marvelAPI = async (endpoint, params = {}) =>{
    const ts = new Date().getTime(); // Generate a unique timestamp
    const hash = getMarvelHash(ts);
    let uri = url+`/v1/public/${endpoint}`;
    try {
        const response = await axios.get(uri, {
            params: {
                ...params,
                ts,
                apikey: constants.MARVEL_PUBLIC,
                hash,
            },
        });
        return response.data.data; // Marvel API wraps data in a `data` key
    } catch (error) {
        console.error('Error fetching data from Marvel API:', error);
        throw error;
    }
}