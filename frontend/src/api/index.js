import axios from "axios";

export const BACKEND = "http://localhost:8000";

const instance = axios.create({
	baseURL: `${BACKEND}/api`,
});

export default instance;
