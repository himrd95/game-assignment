import './App.css';
import Home from './Components/Home';
import { useState } from 'react';
import Form from './Components/Form';

function App() {
	const [showGame, setShowGame] = useState(false);

	const handleClick = () => {
		setShowGame(true);
	};

	return (
		<div className='App'>
			{!showGame ? <Form handleClick={handleClick} /> : <Home />}
		</div>
	);
}

export default App;
