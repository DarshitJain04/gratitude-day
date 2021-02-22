import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ClearIcon from "@material-ui/icons/Clear";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { instance } from "../api/axios";

const useStyles = (theme) => ({
	root: {
		"& > *": {
			width: "100%",
		},
	},
	field: {
		margin: theme.spacing(1.7),
		width: "75%",
	},
	button: {
		borderRadius: 30,
		margin: theme.spacing(3),
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
			image: [],
			formData: {},
		};
		this.hiddenFileInput = React.createRef(null);
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

	handleMessageChange = (event) => {
		var val = event.target.value;
		this.setState(
			{
				message: val,
			},
			() => {
				this.check();
			}
		);
	};

	handleImageChange = (event) => {
		const image_array = [];
		for (let index = 0; index < event.target.files.length; index++) {
			image_array.push(event.target.files[index]);
		}
		this.setState({ image: image_array }, () => {
			this.check();
		});
	};

	handleClick = (event) => {
		this.hiddenFileInput.current.click();
	};

	check = () => {
		if (
			!this.state.nameError &&
			!this.state.emailError &&
			!this.state.titleError &&
			this.state.receiver_name !== "" &&
			this.state.receiver_email !== "" &&
			this.state.title !== "" &&
			(this.state.message !== "" || this.state.image.length > 0)
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

			this.state.image.forEach((image) => {
				let form_data = new FormData();
				form_data.append("post_id", this.state.post_id);
				form_data.append("image", image, image.name);
				instance
					.post("/add_image/", form_data, {
						headers: {
							"content-type": "multipart/form-data",
						},
					})
					.then((res) => {
						console.log(res.data);
					})
					.catch((error) => console.log(error));
			});
			this.clearForm();
		});
	};

	clearForm = () => {
		this.setState({
			receiver_name: "",
			receiver_email: "",
			title: "",
			message: "",
			ps_line: "",
			nameError: false,
			emailError: false,
			titleError: false,
			buttonDisabled: true,
			image: [],
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
					style={{ marginTop: 50 }}
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
					onChange={this.handleMessageChange}
					helperText="Pour your heart out!"
				/>
				<TextField
					id="PS Line"
					type="text"
					label="PS Line"
					variant="outlined"
					helperText="We'll be super discrete about it!"
					className={classes.field}
					value={this.state.ps_line}
					onChange={(e) => this.setState({ ps_line: e.target.value })}
				/>
				<div>
					<FormControl>
						<Button
							id="clear_button"
							variant="contained"
							size="large"
							style={{
								borderRadius: 20,
								background: "#3f51b5",
								color: "white",
							}}
							onClick={this.handleClick}
							endIcon={<PhotoAlbumIcon />}
						>
							Images
						</Button>
						<input
							type="file"
							id="image"
							accept="image/*"
							multiple
							ref={this.hiddenFileInput}
							onChange={this.handleImageChange}
							style={{ display: "none" }}
							disableUnderline
							aria-describedby="my-helper-text"
						/>
						<FormHelperText id="my-helper-text">
							Got a message or image to share?
						</FormHelperText>
					</FormControl>
				</div>
				<div style={{ marginTop: 20, marginBottom: 20 }}>
					<Button
						className={classes.button}
						id="submit_button"
						size="large"
						variant="contained"
						disabled={this.state.buttonDisabled}
						onClick={this.submitPostData}
						endIcon={<MailOutlineIcon />}
					>
						Send
					</Button>
					<Button
						className={classes.button}
						id="clear_button"
						variant="contained"
						size="large"
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
