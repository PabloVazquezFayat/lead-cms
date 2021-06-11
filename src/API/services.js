import axios from "axios";
import { useState } from "react";

const axiosInstance = axios.create({
	baseURL: `http://localhost:3001`,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "http://localhost:3000",
	},
	withCredentials: true,
});

const getService = async (url) => {
	try {
		const res = await axiosInstance.get(url);
		return res.data;
	} catch (error) {
		return error;
	}
};

const postService = async (url, data) => {
	try {
		const res = await axiosInstance.post(url, data);
		return res.data;
	} catch (error) {
		return error;
	}
};

const putService = async (url, data) => {
	try {
		const res = await axiosInstance.put(url, data);
		return res.data;
	} catch (error) {
		return error;
	}
};

const deleteService = async (url) => {
	try {
		const res = await axiosInstance.delete(url);
		return res.data;
	} catch (error) {
		return error;
	}
};

const useAPI = (url, method, reqData) => {
	const [res, setRes] = useState({
		loading: false,
		data: {},
		error: undefined,
	});

	const serviceMethod = {
		GET: getService,
		POST: postService,
		PUT: putService,
		DELETE: deleteService,
	}[method];

	const requestData = async () => {
		setRes((prevState) => ({ ...prevState, loading: true }));
		try {
			const data = await serviceMethod(url, reqData || null);
			setRes((prevState) => ({ ...prevState, loading: false, data: data }));
		} catch (error) {
			setRes((prevState) => ({ ...prevState, loading: false, error: error }));
		}
	};

	return [res, requestData];
};

export { getService, postService, putService, deleteService, useAPI };
