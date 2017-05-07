import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
	//Figure out which function to call and call it
	switch (action.type) {
	case 'SET_ENTRIES':
		return setEntries(state, action.entries);
	case 'NEXT':
		return next(state);
	case 'VOTE':
		// return vote(state, action.entry);
		/*the reducer has to pick apart the state so it only gives the relevant part to the vote function*/
		return state.update('vote', voteState => vote(voteState, action.entry));
	}
	return state;
}