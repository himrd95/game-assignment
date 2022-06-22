import React, { useEffect, useState } from 'react';
import { setItem } from '../helpers/localStorage';
import './Form.css';

const initState = {
	columns: 5,
	rows: 6,
	player1: 'Player1',
	player2: 'Player2',
	player1Color: 'red',
	player2Color: 'yellow',
};

const Form = ({ handleClick }) => {
	const [payload, setPayload] = useState(initState);

	const handleChange = (e) => {
		const {
			target: { value, name },
		} = e;
		e;
		value < 5 && alert('Please select the grid size greter than 5');
		setPayload({ ...payload, [name]: value });
	};

	useEffect(() => {
		setItem('game', payload);
	}, [payload]);

	return (
		<div className='form'>
			<div className='inputs'>
				<h4>Select the size of the board: </h4>
				<label htmlFor='Colums'>
					Columns
					<input
						type='number'
						placeholder='5'
						name='columns'
						onChange={handleChange}
					/>
				</label>
				<br />
				<label htmlFor='Rows'>
					Rows
					<input
						type='number'
						placeholder='6'
						name='rows'
						onChange={handleChange}
					/>
				</label>
			</div>

			<div>
				<h4>Type the player names</h4>
				<label htmlFor='Colums'>
					Player 1
					<input
						type='text'
						placeholder='Player 1'
						name='player1'
						onChange={handleChange}
					/>
				</label>
				<br />
				<label htmlFor='Rows'>
					Player 2
					<input
						type='text'
						placeholder='Player 2'
						name='player2'
						onChange={handleChange}
					/>
				</label>
			</div>
			<button onClick={handleClick}>Let's play</button>
		</div>
	);
};

export default Form;
