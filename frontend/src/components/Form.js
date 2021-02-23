import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";

class Form extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			message: "",
			error: "",
			loading: false,
			images: [],
		};
		this.hiddenFileInput = React.createRef(null);
		this.recaptchaRef = React.createRef(null);
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	};

	handleImageChange = (event) => {
		const images = [];
		for (let index = 0; index < event.target.files.length; index++) {
			images.push(event.target.files[index]);
		}
		this.setState({ images });
	};

	submitPostData = async () => {
		const { message, email, images } = this.state;
		const data = { message, email, images };
		const recaptchaValue = this.recaptchaRef.current.getValue();
		console.log(data, recaptchaValue);
	};

	clearForm = () => {
		this.setState({
			email: "",
			message: "",
			error: "",
			loading: false,
			images: [],
		});
	};

	render() {
		const { email, error, message, loading } = this.state;
		return (
			<div id="form">
				<div className="card">
					<input
						required
						type="email"
						autoComplete="off"
						id="email"
						value={email}
						onChange={this.handleChange}
						placeholder="Receiver's email"
					/>
					<div className="divider" />
					<textarea
						type="text"
						id="message"
						autoComplete="off"
						value={message}
						onChange={this.handleChange}
						placeholder="Pour your heart out!"
					/>
				</div>
				<label htmlFor="image" id="img-button">
					Upload Images
				</label>
				<p>
					Want to add a group photo or a handwritten letter...
					<br />
					We got you covered 😉
				</p>
				<input
					type="file"
					id="image"
					accept="image/*"
					multiple
					ref={this.hiddenFileInput}
					onChange={this.handleImageChange}
					hidden
				/>
				<div className="divider" />
				{error && <p style={{ color: "red" }}>{error}</p>}
				<ReCAPTCHA
					sitekey="6LfJ0WMaAAAAAO9K5Lj8DrYFLfR2bAwav1-w_XQs"
					onChange={this.recaptcha}
					ref={this.recaptchaRef}
				/>
				<div>
					<button id="submit" disabled={loading} onClick={this.submitPostData}>
						Send
					</button>
					<button id="clear" onClick={this.clearForm}>
						Clear
					</button>
				</div>
				<div className="divider" />
			</div>
		);
	}
}

export default Form;
