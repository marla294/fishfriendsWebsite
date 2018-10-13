import React from "react";
import Fish from "./Fish";
import Compatibility from "./Compatibility";
import "../css/FishTank.css";

class FishTank extends React.Component {
	state = { selectedFishes: [], compatibility: [], hoverFish: null };
	url = "http://127.0.0.1:8080/api/";

	render() {
		return <div className="fishTank">{this.renderFishTank()}</div>;
	}

	renderFishTank = () => {
		return this.state.compatibility.map(f => { 
				let fish = f.MainFish;
				return (<div key={fish.Id} className="fishContainer"> 
							<Fish 
								name={fish.Name} 
								fishClassName={this.getFishClassName(fish)} 
								clickFn={() => this.clickOnAFish(fish)}
								mouseOverFn={() => this.setHoverFish(fish)}
							/>
							<Compatibility 
								compatibility={this.getCompatibility(fish)} 
								show={this.showCompatibility(fish)}
							/>
						</div>
				);
			}
		);
	};

	componentDidMount() {
		this.fetchFishCompatibility();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.selectedFishes !== prevState.selectedFishes) {
			this.fetchFishCompatibility();
		}
	}

	fetchFishCompatibility = () => {
		fetch(this.getFishCompatibilityURL()).then(res => {
			res.json().then(r => this.setState({ compatibility: r }));
		});
	};

	getFishCompatibilityURL = () => {
		let compatibilityURLString = "Compatibility?";

		this.state.selectedFishes.forEach(fish => {
			compatibilityURLString =
				compatibilityURLString + `fishNames=${fish.Name}&`;
		});

		return this.url + compatibilityURLString.slice(0, -1);
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
		return this.state
			.selectedFishes
			.findIndex(f => f.Name === fish.Name);
	};

	addFishToSelectedFishArray = fish => {
		let selectedFishes = [...this.state.selectedFishes];
		selectedFishes.push(fish);
		this.setState({ selectedFishes });
	};

	removeIndexFromSelectedFishArray = fishIndex => {
		let selectedFishes = [...this.state.selectedFishes];
		selectedFishes.splice(fishIndex, 1);
		this.setState({ selectedFishes });
	};

	getFishClassName = fish => {
		let fishClassName = this.getFishClassNameIsSelected(fish);

		if (fishClassName === "fish")
		{
			fishClassName = this.getFishClassNameIsCompatible(fish);
		}

		return fishClassName;
	};

	getFishClassNameIsSelected = fish => {
		let selectedFishIndex = this.getFishIndexFromSelectedFishArray(fish);

		if (selectedFishIndex !== -1)
		{
			return "fish selected";
		}

		return "fish";
	};

	getFishClassNameIsCompatible = fish => {
		let compatible = this.getCompatible(fish).toLowerCase();
		let hasCompatible = ["yes", "maybe", "no"].findIndex(ans => ans === compatible);

		if (hasCompatible !== -1)
		{
			return "fish compatible-" + compatible;
		}

		return "fish";
	};

	getCompatible = fish => {
		let compatibility = this.getCompatibility(fish);

		if (compatibility !== undefined && compatibility.WorstCompatibility)
		{
			return compatibility.WorstCompatibility;
		}

		return "";
	};

	getCompatibility = fish => {
		return this.state.compatibility.find(c => c.MainFish.Id === fish.Id);
	};

	setHoverFish = fish => {
		this.setState({ hoverFish: fish });
	};

	showCompatibility = fish => {
		if (this.state.selectedFishes.length < 2)
		{
			return false;
		}

		if (this.getCompatibility(fish).WorstCompatibility === "Yes")
		{
			return false;
		}

		return fish === this.state.hoverFish;
	};

}

export default FishTank;
