import React, { Component } from "react";

class Timer extends Component {
	constructor() {
		super();
		this.state = {
			now: Math.trunc(new Date().getTime() / 1000),
			date: "2021-02-23 23:59:59",
		};
	}

	dateInMilliseconds() {
		return Math.trunc(Date.parse(this.state.date) / 1000);
	}
	seconds() {
		return (this.dateInMilliseconds() - this.state.now) % 60;
	}
	minutes() {
		return Math.trunc((this.dateInMilliseconds() - this.state.now) / 60) % 60;
	}
	hours() {
		return (
			Math.trunc((this.dateInMilliseconds() - this.state.now) / 60 / 60) % 24
		);
	}
	days() {
		return Math.trunc(
			(this.dateInMilliseconds() - this.state.now) / 60 / 60 / 24
		);
	}

	componentDidMount() {
		window.setInterval(() => {
			this.setState({ now: Math.trunc(new Date().getTime() / 1000) });
		}, 1000);
	}

	render() {
		return (
			<div id="timer">
				<p>We open in</p>
				<h1>
					{this.days() ? this.days() + " d :" : ""} {this.hours()} h :{" "}
					{this.minutes()} m : {this.seconds()} s
				</h1>
				<span>on 24th Feb!</span>
				<p>
					Meanwhile, just hold the thought, or even better...pen it down maybe?{" "}
					<br />
					The more cheesy, the better you make the other person feel :P
				</p>
				<img src="/images/girl-writing.jpg" alt="Illustration" />
			</div>
		);
	}
}

export default Timer;
