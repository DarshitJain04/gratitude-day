import axios from "axios";

export const BACKEND = "https://www.webug.space";

const instance = axios.create({
	baseURL: `${BACKEND}/api`,
});

export default instance;
