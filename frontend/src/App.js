import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Form from "./components/Form";

function App() {
	const [time, setTime] = useState(0);
	useEffect(() => {
		console.log("timer set!");
		const interval = setInterval(() => {
			setTime(Date.now());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="App">
			<h1>Gratitude Day</h1>
			{time < Date.parse("2021-02-24 20:00:00") ? <Timer /> : <Form />}
		</div>
	);
}

export default App;
