import React, { Component } from "react";
import { instance } from "../api/axios";

const styles = {
	root: {
		width: "100%",
	},
	field: {
		margin: "2rem",
		width: "75%",
	},
};

class Form extends Component {
	constructor() {
		super();
		this.state = {
			post_id: "",
			receiver_email: "",
			message: "",
			emailError: false,
			buttonDisabled: true,
			image: [],
			formData: {},
		};
		this.hiddenFileInput = React.createRef(null);
	}

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
				receiver_email: this.state.receiver_email,
				message: this.state.message,
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
			receiver_email: "",
			message: "",
			emailError: false,
			buttonDisabled: true,
			image: [],
		});
	};

	render() {
		return (
			<div style={styles.root}>
				<input
					required
					type="email"
					id="Receiver's Email"
					style={styles.field}
					value={this.state.receiver_email}
					onChange={this.handleEmailChange}
					error={this.state.emailError}
					placeholder="Receiver's Email"
				/>
				<textarea
					type="text"
					id="Message"
					style={styles.field}
					value={this.state.message}
					onChange={this.handleMessageChange}
					placeholder="Pour your heart out!"
				/>
				<div>
					<button
						id="image_upload"
						style={{
							borderRadius: 20,
							background: "#3f51b5",
							color: "white",
						}}
						onClick={this.handleClick}
					>
						Images
					</button>
					<input
						type="file"
						id="image"
						accept="image/*"
						multiple
						ref={this.hiddenFileInput}
						onChange={this.handleImageChange}
						style={{ display: "none" }}
					/>
				</div>
				<div style={{ marginTop: 20, marginBottom: 20 }}>
					<button
						id="submit_button"
						disabled={this.state.buttonDisabled}
						onClick={this.submitPostData}
					>
						Send
					</button>
					<button id="clear_button" onClick={this.clearForm}>
						Clear
					</button>
				</div>
			</div>
		);
	}
}

export default Form;
