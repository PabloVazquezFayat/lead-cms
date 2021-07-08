import React, { useEffect } from "react";

import ModalList from "../Modal/ModalList";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Leadership() {
	const [panelRes, getPanelData] = useAPI("GET", urls.leadershipBanner.read);
	const [teamRes, getTeamData] = useAPI("GET", urls.leadershipMembers.read);

	const {
		loading: panelLoading,
		data: { leadershipBanner },
		error: panelError,
	} = panelRes || {};

	const {
		loading: teamLoading,
		data: { members },
		error: teamError,
	} = teamRes || {};

	const { background, header, paragraph } = leadershipBanner || {};

	const LeaderShipTeam = (props) => {
		if (panelError) {
			return <div>Something went wrong</div>;
		}

		if (panelLoading) {
			return <div>Loading...</div>;
		}

		const containerStyle = {
			background: background || "#fff",
		};

		return (
			<div className="leadershipBanner-container" style={containerStyle}>
				<div className="leadershipBanner-wrapper" data-aos="fade-right" data-aos-delay="250" data-aos-once="true">
					<h2>{header || "Header text here"}</h2>
					<p>{paragraph || "Paragraph text here"}</p>
				</div>
				<div className="leadershipMembers-container capture" style={containerStyle}>
					<ul>{props.children}</ul>
					<div className="leadershipMembers-wrapper"></div>
				</div>
			</div>
		);
	};

	const TeamsMembers = () => {
		if (teamError) {
			return <li>Something went wrong</li>;
		}

		if (teamLoading) {
			return <li>Loading</li>;
		}

		return members.map((member, i) => {
			return (
				<li key={i}>
					<img className="member-pic" src={member.image} alt="member" />
					<div className="member-info">
						<h3>{member.name}</h3>
						<p>{member.title}</p>
						<p>{member.bio}</p>
						{member.social ? (
							<a href={member.social}>
								<i className="fab fa-linkedin"></i>
							</a>
						) : null}
					</div>
				</li>
			);
		});
	};

	useEffect(() => {
		getPanelData();
		getTeamData();
	}, []);

	return (
		<div>
			<ModalList
				getData={(getPanelData, getTeamData)}
				data={{ leadershipBanner, members }}
				dataKeys={["leadershipBanner", "members"]}
			/>
			<LeaderShipTeam>
				<TeamsMembers />
			</LeaderShipTeam>
		</div>
	);
}
