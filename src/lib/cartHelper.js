export const addToCart = (list, item) => [...list, item];
export const generateFreteValue = () => Math.floor(Math.random()*100);
export const calcSubTotal = (list) => list.reduce((t, i) => t + i.cost, 0);
export const updateCheckoutValue = (value) => value;
