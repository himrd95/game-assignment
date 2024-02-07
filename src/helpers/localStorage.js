export const setItem = (key, payload) => {
    return localStorage.setItem(key, JSON.stringify(payload));
};

export const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const initState = {
    columns: 5,
    rows: 6,
    player1: "Player1",
    player2: "Player2",
    player1Color: "radial-gradient(circle at 30% 30%,#ff2626,black)",
    player2Color: "radial-gradient(circle at 30% 30%,#01c801,black)",
};

setItem("game", initState);
