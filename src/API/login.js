import { urls } from "./urls";
import { getService, postService } from "./services";

const login = async (data) => {
	const { user } = await postService(urls.users.login, data);
	return user;
};

const logout = async () => {
	const { auth } = await getService(urls.users.logout);
	return auth;
};

export { login, logout };
