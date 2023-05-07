import React, { useEffect } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Applications() {
	const [res, getData] = useAPI("GET", urls.applications.read);
	const [deleteRes, deleteApplication] = useAPI("DELETE", urls.applications.delete);
	const {
		loading,
		data: { applications },
		error,
	} = res;

	const handleDeleteApplication = async (e) => {
		deleteApplication(e.target.id);
	};

	const CreateApplications = () => {
		if (error) {
			return <li>Something went wrong</li>;
		}

		if (loading) {
			return <li>Loading</li>;
		}

		return applications.map((application, i) => {
			return (
				<li className="application-data-container" key={i}>
					<div className="application-data-wrapper">
						<div className="application-bio">
							<p>{application.name}</p>
							<p>{new Date(application.date).toString().substr(3, 12)}</p>
							<p>{application.phone}</p>
							<p>{application.email}</p>
						</div>
						<div className="application-position-container">
							<div className="application-position">
								<p>{application.position}</p>
							</div>
							<div className="application-position">
								<p>{application.salary}</p>
							</div>
							<div className="application-message">
								<p>{application.message}</p>
							</div>
						</div>
						<div className="application-resume-container">
							<div className="application-resume">
								{application.resume ? (
									<a href={application.resume} target="_blank" rel="noreferrer">
										view resume
									</a>
								) : (
									<p>no resume attached</p>
								)}
								<embed src={application.resume} alt="no resume attached" />
							</div>
							<div className="application-actions">
								<button
									id={application._id}
									className="delete-application btn-action btn-delete"
									onClick={handleDeleteApplication}
								>
									delete
								</button>
							</div>
						</div>
					</div>
				</li>
			);
		});
	};

	useEffect(() => {
		getData();
	}, [deleteRes.data]);

	return (
		<div>
			<ul>
				<CreateApplications />
			</ul>
		</div>
	);
}
