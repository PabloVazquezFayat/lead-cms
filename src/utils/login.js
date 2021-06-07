import axios from "axios";

const login = async (user) => {
  const url = "http://localhost:3001/cms/login";

  try {
    const res = await axios.post(url, user, { withCredentials: true });
    return res.data.user;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  const url = "http://localhost:3001/cms/logout";

  try {
    const res = await axios.get(url, { withCredentials: true });
    return res.data.auth;
  } catch (error) {
    console.log(error);
  }
};

export { login, logout };
