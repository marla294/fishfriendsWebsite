import React from "react";
import PropTypes from "prop-types";
import Fish from "./Fish";
import "../css/FishTank.css";

class FishTank extends React.Component {
	render() {
		return <div className="fishTank">{this.renderFishTank()}</div>;
	}

	renderFishTank = () => {
		return this.props.fishes.map(fish => (
			<div
				key={fish.Id}
				className="fishWrapper"
				onClick={() => this.clickOnAFish(fish)}
			>
				<Fish key={fish.Id} name={fish.Name} compatible={this.getCompatible(fish)}/>
			</div>
		));
	};

	clickOnAFish = fish => {
		const fishIndex = this.getFishIndexFromSelectedFishArray(fish);

		if (fishIndex === -1) {
			this.addFishToSelectedFishArray(fish);
		} else {
			this.removeIndexFromSelectedFishArray(fishIndex);
		}
	};

	getFishIndexFromSelectedFishArray = fish => {
		return this.props
			.getSelectedFishes()
			.findIndex(f => f.Name === fish.Name);
	};

	addFishToSelectedFishArray = fish => {
		let selectedFishes = [...this.props.getSelectedFishes()];
		selectedFishes.push(fish);
		this.props.setSelectedFishes(selectedFishes);
	};

	removeIndexFromSelectedFishArray = fishIndex => {
		let selectedFishes = [...this.props.getSelectedFishes()];
		selectedFishes.splice(fishIndex, 1);
		this.props.setSelectedFishes(selectedFishes);
	};

	getCompatible = fish => {
		let compatibility = this.props.compatibility.find(c => c.MainFish.Id === fish.Id);

		if (compatibility !== undefined)
		{
			return compatibility.WorstCompatibility;
		}
		
		return null;
	}
}

FishTank.propTypes = {
	fishes: PropTypes.array.isRequired,
	setSelectedFishes: PropTypes.func.isRequired,
	getSelectedFishes: PropTypes.func.isRequired
};

export default FishTank;
