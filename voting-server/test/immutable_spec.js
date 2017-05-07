import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

	describe('a number', () => {

		function increment(currentState) {
			return currentState + 1;
		}

		it('is immutable', () => {
			let state = 42;
			let nextState = increment(state);

			expect(nextState).to.equal(43);
			expect(state).to.equal(42);
		});
	});

	describe('A List', () => {
	
		function addTeam(currentState, team) {
			return currentState.push(team);
		}

		it('is immutable', () => {
			let state = List.of('Eagles', 'Cowboys');
			let nextState = addTeam(state, 'Redskins');

			expect(nextState).to.equal(List.of(
				'Eagles',
				'Cowboys',
				'Redskins'
			));
			expect(state).to.equal(List.of(
				'Eagles',
				'Cowboys'
			));
		});
	});

	describe('a tree', () => {

		function addTeam(currentState, team) {
			return currentState.set(
				'teams',
				currentState.get('teams').push(team)
			);
		}

		it('is immutable', () => {
			let state = Map({
				teams: List.of('Eagles', 'Cowboys')
			});
			let nextState = addTeam(state, 'Redskins');

			expect(nextState).to.equal(Map({
				teams: List.of(
					'Eagles',
					'Cowboys',
					'Redskins'
				)
			}));
			expect(state).to.equal(Map({
				teams: List.of(
					'Eagles',
					'Cowboys'
				)
			}));
		});
	});

	function addTeam(currentState, team) {
		return currentState.update('teams', teams => teams.push(team));
	}

});