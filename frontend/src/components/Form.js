import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ClearIcon from "@material-ui/icons/Clear";
import { instance } from "../api/axios";

const useStyles = (theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(5),
			width: "65%",
		},
	},
	field: {
		margin: theme.spacing(1.5),
	},
	button: {
		borderRadius: 30,
		margin: theme.spacing(2),
		background: "#3f51b5",
		color: "white",
		"&:hover": {
			background: "#3f51b5",
			color: "white",
		},
		"&:disabled": {
			background: "#E8EAF6",
			color: "#9fa8da",
		},
	},
});

class Form extends Component {
	constructor() {
		super();
		this.state = {
			post_id: "",
			receiver_name: "",
			receiver_email: "",
			title: "",
			message: "",
			ps_line: "",
			nameError: false,
			emailError: false,
			titleError: false,
			buttonDisabled: true,
			formData: {},
		};
	}

	handleNameChange = (event) => {
		var val = event.target.value;
		var error = false;
		if (val === "") {
			error = true;
		}
		this.setState(
			{
				receiver_name: val,
				nameError: error,
			},
			() => {
				this.check();
			}
		);
	};

	handleEmailChange = (event) => {
		var val = event.target.value;
		var error = false;
		if (!val.match("(^[a-z]+).([0-9]+)(@iitj.ac.in)") || val === "") {
			error = true;
		}
		this.setState(
			{
				receiver_email: val,
				emailError: error,
			},
			() => {
				this.check();
			}
		);
	};

	handleTitleChange = (event) => {
		var val = event.target.value;
		var error = false;
		if (val === "") {
			error = true;
		}
		this.setState(
			{
				title: val,
				titleError: error,
			},
			() => {
				this.check();
			}
		);
	};

	check = () => {
		if (
			!this.state.nameError &&
			!this.state.emailError &&
			!this.state.titleError &&
			this.state.receiver_name !== "" &&
			this.state.receiver_email !== "" &&
			this.state.title !== ""
		) {
			this.setState({ buttonDisabled: false });
		} else {
			this.setState({ buttonDisabled: true });
		}
	};

	submitPostData = () => {
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var lenString = 10;
		var randomstring = "";
		for (var i = 0; i < lenString; i++) {
			var rnum = Math.floor(Math.random() * characters.length);
			randomstring += characters.substring(rnum, rnum + 1);
		}
		this.setState({ post_id: randomstring }, async () => {
			const data = {
				post_id: this.state.post_id,
				receiver_name: this.state.receiver_name,
				receiver_email: this.state.receiver_email,
				title: this.state.title,
				message: this.state.message,
				ps_line: this.state.ps_line,
			};
			const res = await instance.post("/add_post/", data);
			console.log(res);
			const post_data = await instance.get(
				`/posts?search=${this.state.post_id}`
			);
			this.setState({ formData: post_data.data }, () => {
				console.log(`form data :${this.state.formData}`);
				this.clearForm();
			});
		});
	};

	clearForm = () => {
		this.setState({
			receiver_name: "",
			receiver_email: "",
			title: "",
			message: "",
			ps_line: "",
			buttonDisabled: true,
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<TextField
					required
					autoFocus
					type="text"
					id="Receiver's Name"
					label="Receiver's Name"
					variant="outlined"
					className={classes.field}
					value={this.state.receiver_name}
					onChange={this.handleNameChange}
					error={this.state.nameError}
				/>
				<TextField
					required
					type="email"
					id="Receiver's Email"
					label="Receiver's Email"
					variant="outlined"
					className={classes.field}
					value={this.state.receiver_email}
					onChange={this.handleEmailChange}
					error={this.state.emailError}
				/>
				<TextField
					required
					type="text"
					id="Title"
					label="Title"
					variant="outlined"
					className={classes.field}
					value={this.state.title}
					onChange={this.handleTitleChange}
					error={this.state.titleError}
				/>
				<TextField
					multiline
					type="text"
					id="Message"
					label="Message"
					variant="outlined"
					className={classes.field}
					value={this.state.message}
					onChange={(e) => this.setState({ message: e.target.value })}
				/>
				<TextField
					id="PS Line"
					type="text"
					label="PS Line"
					variant="outlined"
					className={classes.field}
					value={this.state.ps_line}
					onChange={(e) => this.setState({ ps_line: e.target.value })}
				/>
				<div>
					<Button
						className={classes.button}
						id="submit_button"
						disabled={this.state.buttonDisabled}
						variant="contained"
						onClick={this.submitPostData}
						endIcon={<MailOutlineIcon />}
					>
						Send
					</Button>
					<Button
						className={classes.button}
						id="clear_button"
						variant="contained"
						onClick={this.clearForm}
						endIcon={<ClearIcon />}
					>
						Clear
					</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(Form);
