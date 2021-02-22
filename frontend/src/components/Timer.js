import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Form from "./Form";

const useStyles = (theme) => ({
	root: {
		"& > *": {
			padding: "2%",
			width: "65%",
		},
	},
});

class Timer extends Component {
	constructor() {
		super();
		this.state = {
			now: Math.trunc((new Date()).getTime() / 1000),
			date: '2021-02-23 23:59:59'
		};
	}

	dateInMilliseconds () {
	return Math.trunc(Date.parse(this.state.date) / 1000)
	};
	seconds () {
	return (this.dateInMilliseconds() - this.state.now) % 60
	};
	minutes () {
	return Math.trunc((this.dateInMilliseconds() - this.state.now) / 60) % 60
	};
	hours () {
	return Math.trunc((this.dateInMilliseconds() - this.state.now) / 60 / 60) % 24
	};
	days () {
	return Math.trunc((this.dateInMilliseconds() - this.state.now) / 60 / 60 / 24)
	};

	componentDidMount() {
		window.setInterval(() => {
			this.setState(
				{now :Math.trunc((new Date()).getTime() / 1000)})
		}, 1000)
	  };

	render() {
		const { classes } = this.props;
		if (this.seconds() < 0 ) return <Form />
		return (
			<h1 className={classes.root} style={{marginTop: '120px'}}>
				{this.days()} D<span className={classes.seprator}>:</span>
				{this.hours()} h<span className={classes.seprator}>:</span>
				{this.minutes()} m<span className={classes.seprator}>:</span>
				{this.seconds()} s
				
			</h1>
		);
	}
}

export default withStyles(useStyles)(Timer);
