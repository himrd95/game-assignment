export const setItem = (key, payload) => {
	return localStorage.setItem(key, JSON.stringify(payload));
};

export const getItem = (key) => {
	return JSON.parse(localStorage.getItem(key));
};
