import {createContext} from "react";

const apiUrl = 'https://xkcd-be.onrender.com';
// const apiUrl = 'http://localhost:3000';


const ApiContext = createContext(apiUrl);

export default ApiContext;