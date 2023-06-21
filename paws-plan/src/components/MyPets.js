import Menu from "./Menu";
import ViewPets from "./ViewPets";
import React from "react";

const MyPets = () => {
	return (
		<div className="body-container">
			<Menu/>
			<div className="content-container">
				<div className="content">
					<ViewPets/>
				</div>
			</div>
		</div>
	)
}

export default MyPets
