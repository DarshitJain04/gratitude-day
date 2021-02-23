import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import Preview from "./Preview";
import axios, { BACKEND } from "../api";

class Form extends Component {
	constructor() {
		super();
		this.state = {
			mail: "",
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

	getHash = async (images) => {
		return Promise.all(
			images.map((image) => {
				const data = new FormData();
				data.append("image", image, image.name);
				return axios
					.post(`${BACKEND}/api/add_image/`, data)
					.then((res) => res.data.split("/")[3]);
			})
		);
	};

	handleImageChange = (event) => {
		const { files } = event.target;
		const { images: prev_images } = this.state;
		this.getHash(Array.from(files)).then((images) =>
			this.setState({ images: prev_images.concat(images) })
		);
	};

	submitPostData = async () => {
		const { message, mail, images } = this.state;
		const data = { message, mail, images: images.join(",") };
		const recaptchaValue = this.recaptchaRef.current.getValue();

		this.setState(
			{
				error: !mail
					? "Receiver's mail is required."
					: !(message.length || images.length)
					? "Atleast one of the message/images field is required"
					: !recaptchaValue
					? "Sorry, we are not taking response from robots yet!"
					: "",
			},
			() => {
				const { error } = this.state;
				if (!error) {
					this.setState({ loading: true }, () => {
						axios
							.post(`${BACKEND}/api/add_post/`, data)
							.then(() => {
								this.clearForm();
								this.setState({ completed: true });
							})
							.catch((error) => {
								this.setState({ error: error?.message ?? error });
								alert(error);
							})
							.finally(() => this.setState({ loading: false }));
					});
				}
			}
		);
	};

	clearForm = () => {
		this.setState({
			mail: "",
			message: "",
			error: "",
			loading: false,
			images: [],
		});
	};

	render() {
		const { mail, error, message, loading, images, completed } = this.state;
		return (
			<>
				{completed ? (
					<p className="preview-text">
						You have posted your gratitude, leave the rest to us... 🥳
					</p>
				) : (
					<div className="form-page">
						<div id="form">
							<div className="card">
								<input
									required
									type="email"
									autoComplete="off"
									id="mail"
									value={mail}
									onChange={this.handleChange}
									placeholder="Receiver's mail"
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
							<div className="row flex center" style={{ margin: "2rem 0" }}>
								{images.map((image) => {
									return (
										<img
											src={`${BACKEND}/media/postcard_images/${image}`}
											alt={image}
											style={{ margin: "0 2rem", height: 200 }}
										/>
									);
								})}
							</div>
							<div className="divider" />
							<ReCAPTCHA
								sitekey="6LfJ0WMaAAAAAO9K5Lj8DrYFLfR2bAwav1-w_XQs"
								onChange={this.recaptcha}
								ref={this.recaptchaRef}
							/>
							{error && <p id="error-para">{error}</p>}
							<div>
								<button
									id="submit"
									disabled={loading}
									onClick={this.submitPostData}
								>
									Send
								</button>
								<button id="clear" onClick={this.clearForm}>
									Clear
								</button>
							</div>
							<div className="divider" />
						</div>
						<Preview {...this.state} />
					</div>
				)}
				<p className="preview-text">
					For assistance/queries reachout to{" "}
					<a
						href="mailto:tawatia.1@iitj.ac.in"
						target="_blank"
						rel="noreferrer"
					>
						Kunal,
					</a>{" "}
					<a href="mailto:jain.38@iitj.ac.in" target="_blank" rel="noreferrer">
						Darshit,
					</a>{" "}
					<a href="mailto:raghav.1@iitj.ac.in" target="_blank" rel="noreferrer">
						Abhishek,
					</a>{" "}
					and{" "}
					<a href="mailto:singh.81@iitj.ac.in" target="_blank" rel="noreferrer">
						Sandesh
					</a>{" "}
				</p>
			</>
		);
	}
}

export default Form;
