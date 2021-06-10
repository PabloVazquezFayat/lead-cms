import { urls } from "../API/urls";
import { getService, postService } from "../API/services";

const login = async (data) => {
	const { user } = await postService(urls.users.login, data);
	return user;
};

const logout = async () => {
	const { auth } = await getService(urls.users.logout);
	return auth;
};

export { login, logout };
