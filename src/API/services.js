import axios from "axios";
import { useState } from "react";

const baseURL = "http://localhost:3001";

const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "http://localhost:3000",
	},
	withCredentials: true,
});

const axiosInstanceForFileUpload = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-Type": "multipart/form-data",
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

const uploadService = async (url, data) => {
	try {
		const res = await axiosInstanceForFileUpload.post(url, data);
		return res.data;
	} catch (error) {
		return error;
	}
};

const useAPI = (method, url) => {
	const [res, setRes] = useState({
		loading: true,
		data: {},
		error: undefined,
	});

	const serviceMethod = {
		GET: getService,
		POST: postService,
		PUT: putService,
		DELETE: deleteService,
		UPLOAD: uploadService,
	}[method];

	const requestData = async (reqData) => {
		setRes((prevState) => ({ ...prevState, loading: true }));
		try {
			const endpoint = reqData && reqData.id ? `${url}/${reqData.id}` : url;
			const data = reqData && reqData.data ? reqData.data : null;

			const resData = await serviceMethod(endpoint, data);
			setRes((prevState) => ({ ...prevState, loading: false, data: resData }));
		} catch (error) {
			setRes((prevState) => ({ ...prevState, loading: false, error: error }));
		}
	};

	return [res, requestData];
};

export { getService, postService, putService, deleteService, useAPI };
