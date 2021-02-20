export default function (state = [], action) {
	let quote;
	switch (action.type) {
		case "ADD_QUOTE":
			return state.concat(action.quote);
		case "REMOVE_QUOTE":
			let thisGuy = state.findIndex((quote) => quote.id === action.quoteId);
			return [...state.slice(0, thisGuy), ...state.slice(thisGuy + 1)];
		case "UPVOTE_QUOTE":
			let thisOne = state.findIndex((quote) => quote.id === action.quoteId);
			quote = state[thisOne];
			return [
				...state.slice(0, thisOne),
				Object.assign({}, quote, { votes: quote.votes + 1 }),
				...state.slice(thisOne + 1),
			];

		case "DOWNVOTE_QUOTE":
			let thatOne = state.findIndex((quote) => quote.id === action.quoteId);
			quote = state[thatOne];
			if (quote.votes > 0) {
				return [
					...state.slice(0, thatOne),
					Object.assign({}, quote, { votes: quote.votes - 1 }),
					...state.slice(thatOne + 1),
				];
			} else {
				return state;
			}
		default:
			return state;
	}
}
