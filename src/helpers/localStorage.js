export const setItem = (key, payload) => {
	return localStorage.setItem(key, JSON.stringify(payload));
};

export const getItem = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

const initState = {
	columns: 5,
	rows: 6,
	player1: 'Player1',
	player2: 'Player2',
	player1Color: 'red',
	player2Color: 'yellow',
};

setItem('game', initState);
