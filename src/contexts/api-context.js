import {createContext} from "react";

const apiUrl = 'https://xkcd-be.cyclic.app';
// const apiUrl = 'http://localhost:3000';


const ApiContext = createContext(apiUrl);

export default ApiContext;