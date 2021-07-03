import React from "react";

export default function ToolTip(props) {
	return (
		<div className="tool-tip">
			<i class="fas fa-info-circle"></i>
			<div className="tip">{props.children}</div>
		</div>
	);
}
