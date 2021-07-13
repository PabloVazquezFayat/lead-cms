import React, { useEffect } from "react";

import ModalCertifications from "../Modal/ModalCertifications";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Certifications() {
	const [res, getData] = useAPI("GET", urls.certifications.read);
	const {
		loading,
		data: { certifications },
		error,
	} = res;

	const CreateCertifications = () => {
		if (error) {
			return <li>Something went wrong</li>;
		}

		if (loading) {
			return <li>Loading...</li>;
		}

		return certifications.map((certification, i) => {
			return (
				<li key={i}>
					<p>{certification.text}</p>
				</li>
			);
		});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<ModalCertifications getData={getData} data={certifications} />
			<div className="certification-container">
				<h2>certifications</h2>
				<ul>
					<CreateCertifications />
				</ul>
			</div>
		</div>
	);
}
