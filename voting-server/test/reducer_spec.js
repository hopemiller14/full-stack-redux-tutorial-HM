import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles SET_ENTRIES', () => {
		const initialState = Map();
		const action = {type: 'SET_ENTRIES', entries: ['Eagles']};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Eagles']
		}));
	});

	it('handles NEXT', () => {
		const initialState = fromJS({
			entries: ['Eagles', 'Cowboys']
		});
		const action = {type: 'NEXT'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Eagles', 'Cowboys']
			},
			entries: []
		}));
	});

	it('handles VOTE', () => {
		const initialState = fromJS({
			vote: {
				pair: ['Eagles', 'Cowboys']
			},
			entries: []
		});
		const action = {type: 'VOTE', entry: 'Eagles'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Eagles', 'Cowboys'],
				tally: {Eagles: 1}
			},
			entries: []
		}));
	});

	it('has an initial state', () => {
		const action = {type: 'SET_ENTRIES', entries: ['Eagles']};
		const nextState = reducer(undefined, action);
		expect(nextState).to.equal(fromJS({
			entries: ['Eagles']
		}));
	});

	it('can be used with reduce', () => {
		const actions = [
			{type: 'SET_ENTRIES', entries: ['Eagles', 'Cowboys']},
			{type: 'NEXT'},
			{type: 'VOTE', entry: 'Eagles'},
			{type: 'VOTE', entry: 'Cowboys'},
			{type: 'VOTE', entry: 'Eagles'},
			{type: 'NEXT'}
		];
		const finalState = actions.reduce(reducer, Map());

		expect(finalState).to.equal(fromJS({
			winner: 'Eagles'
		}));
	});

});