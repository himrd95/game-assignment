import React, { useState } from 'react';
import { getItem } from '../helpers/localStorage';
import Form from './Form';
import './Home.css';
import cx from 'classnames';

const Home = () => {
	const data = getItem('game') || {};

	console.log(data);
	const arr = new Array(+data.rows).fill(
		new Array(+data.columns).fill(false),
	);

	const [showGame, setShowGame] = useState(false);
	const [possibleGrids, setPossibleGrids] = useState(arr);
	const [turn, setTurn] = useState(1);
	const [path, setPath] = useState([]);
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setShowGame(true);
	};

	const checkForCoins = (arr, i, j, count, color, dir, indexes) => {
		if (count >= 4) {
			setOpen(true);
			setPath([...indexes]);

			return true;
		}
		if (
			i < 0 ||
			i > arr.length - 1 ||
			j < 0 ||
			j > arr[i].length - 1
		) {
			return;
		}

		if (arr[i][j] === color) {
			count++;
			indexes.push(arr[i][j]);
		} else {
			indexes = [];
			return (count = 0);
		}

		if (dir === 'forward') {
			checkForCoins(arr, i, j + 1, count, color, dir, indexes);
		} else if (dir === 'y') {
			// checkForCoins(arr, i - 1, j, count, color, dir, indexes);
			checkForCoins(arr, i + 1, j, count, color, dir, indexes);
		} else if (dir === 'backward') {
			checkForCoins(arr, i, j - 1, count, color, dir, indexes);
		} else if (dir === 'diagonal1') {
			checkForCoins(arr, i - 1, j - 1, count, color, dir, indexes);
			checkForCoins(arr, i - 1, j + 1, count, color, dir, indexes);
		} else if (dir === 'diagonal2') {
			checkForCoins(arr, i + 1, j - 1, count, color, dir, indexes);
			checkForCoins(arr, i + 1, j + 1, count, color, dir, indexes);
		}

		return (count = 0);
	};

	const checkForEmpty = (j) => {
		let newGrid = [];
		for (let m in possibleGrids) {
			let temp = [...possibleGrids[m]];
			newGrid.push(temp);
		}

		for (let i in possibleGrids) {
			const length = possibleGrids.length - 1 - i;

			if (possibleGrids[length][j] === false) {
				newGrid[length][j] =
					turn === 1 ? data.player1Color : data.player2Color;

				let grid = [];
				for (let m in newGrid) {
					let temp = [...newGrid[m]];
					grid.push(temp);
				}
				let count = 0;
				checkForCoins(
					grid,
					length,
					j,
					count,
					newGrid[length][j],
					'x',
					[],
				);
				setPath([]);
				checkForCoins(
					grid,
					length,
					j,
					count,
					newGrid[length][j],
					'y',
					[],
				);
				setPath([]);
				checkForCoins(
					grid,
					length,
					j,
					count,
					newGrid[length][j],
					'backward',
					[],
				);
				setPath([]);
				checkForCoins(
					grid,
					length,
					j,
					count,
					newGrid[length][j],
					'diagonal2',
					[],
				);
				checkForCoins(
					grid,
					length,
					j,
					count,
					newGrid[length][j],
					'diagonal1',
					[],
				);
				return setPossibleGrids([...grid]);
			}
		}
	};

	const fillCoin = (ind) => {
		setTurn(turn === 1 ? 2 : 1);

		checkForEmpty(+ind);
	};

	const resetTheGame = () => {
		setPossibleGrids(arr);
		setOpen(false);
		setTurn(1);
	};
	return (
		<div className='container'>
			//
			<div style={open ? { filter: 'blur(5px)' } : {}}>
				<h2>{turn === 1 ? "Player 1's turn" : "Player 2's turn"}</h2>
				<div className={cx('player1', turn === 1 && 'active')}>
					<h3>{data.player1}</h3>
				</div>
				<div className={cx('player2', turn === 2 && 'active')}>
					<h3>{data.player2}</h3>
				</div>
				<div>
					<div className='coinEntry'>
						{possibleGrids[0].map((column, ind) => (
							<div className='box' onClick={() => fillCoin(ind)}>
								<div
									className='coin'
									style={{
										background:
											turn === 1
												? data.player1Color
												: data.player2Color,
									}}
								></div>
							</div>
						))}
					</div>
					<div className='bottomPannels'>
						<div className='board'>
							{possibleGrids.map((row, ind) => (
								<div>
									{row.map((column, index) => (
										<span className='box'>
											<div
												className='coin'
												style={{
													background: !possibleGrids[ind][index]
														? 'transparent'
														: possibleGrids[ind][index],
												}}
											></div>
										</span>
									))}
								</div>
							))}
						</div>
						<div className='sidePannel'>
							{possibleGrids.map((column) => (
								<div className='box'></div>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* )} */}
			{open && (
				<div className='modal'>
					<h2>{`${
						turn === 2 ? data.player1 : data.player2
					} won the game`}</h2>
					<button onClick={resetTheGame}>Restart</button>
				</div>
			)}
		</div>
	);
};

export default Home;
