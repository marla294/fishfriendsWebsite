import React from "react";
import FishTank from "./FishTank";
import Button from "./Button";
import "../css/Home.css";

class Home extends React.Component {
	state = { fishes: [], selectedFishes: [], compatibility: [] };
	url = "http://127.0.0.1:8080/api/";

	componentDidMount() {
		this.fetchAllFish();
	}

	fetchAllFish = () => {
		fetch(this.url + "fish").then(res => {
			res.json().then(r => this.setState({ fishes: r }));
		});
	};

	fetchFishCompatibility = () => {
		fetch(
			this.url + "Compatibility?fishNames=clown&fishNames=groupers"
		).then(res => {
			res.json().then(r => this.setState({ compatibility: r }));
		});
	};

	setSelectedFishes = selectedFishes => {
		this.setState({ selectedFishes });
	};

	getSelectedFishes = () => {
		return this.state.selectedFishes;
	};

	render() {
		return (
			<div className="home">
				<div className="headerWrapper">
					<h1>Select fish to compare:</h1>
				</div>
				<FishTank
					fishes={this.state.fishes}
					setSelectedFishes={this.setSelectedFishes}
					getSelectedFishes={this.getSelectedFishes}
				/>
				<div className="buttonWrapper">
					<Button
						label={"Calculate"}
						clickFn={this.fetchFishCompatibility}
					/>
				</div>
			</div>
		);
	}
}

export default Home;
