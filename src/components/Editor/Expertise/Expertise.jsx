import React, { useEffect } from "react";

import ModalList from "../Modal/ModalList";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Expertise() {
	const [serviceRes, getServiceData] = useAPI("GET", urls.services.read);
	const [panelRes, getPanelData] = useAPI("GET", urls.servicesPanel.read);

	const {
		loading: serviceLoading,
		data: { services },
		error: serviceError,
	} = serviceRes || {};

	const {
		loading: panelLoading,
		data: { servicesPanel },
		error: panelError,
	} = panelRes || {};

	const { header, backgroundColor } = servicesPanel || {};

	const ServicesPanel = (props) => {
		if (panelError) {
			return <div>Something went wrong</div>;
		}

		if (panelLoading) {
			return <div>Loading...</div>;
		}

		const style = {
			background: backgroundColor || "#fff",
		};

		return (
			<div className="services-container" style={style}>
				<h2>{header}</h2>
				<ul>{props.children}</ul>
			</div>
		);
	};

	const ServicesList = () => {
		if (serviceError) {
			return <li>Something went wrong</li>;
		}

		if (serviceLoading) {
			return <li>Loading</li>;
		}

		return services.map((service, i) => {
			return (
				<li key={i}>
					<img src={service.image} alt="service" />
					<p>{service.title}</p>
				</li>
			);
		});
	};

	useEffect(() => {
		getServiceData();
		getPanelData();
	}, []);

	return (
		<div>
			<ModalList
				getData={{ getPanelData, getListData: getServiceData }}
				data={{ panelData: servicesPanel, listData: services }}
				dataKey={["servicesPanel", "services"]}
			/>
			<ServicesPanel>
				<ServicesList />
			</ServicesPanel>
		</div>
	);
}
