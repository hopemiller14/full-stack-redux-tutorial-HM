import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {

		it('adds the entries to the state', () => {
			const state = Map();
			const entries = List.of('Eagles', 'Cowboys');
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				entries: List.of('Eagles', 'Cowboys')
			}));
		});
	
		it('converts to immutable', () => {
			const state=Map();
			const entries = ['Eagles', 'Cowboys'];
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				entries: List.of('Eagles', 'Cowboys')
			}));
		});

	});

	describe('next', () => {

		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Eagles', 'Cowboys', 'Redskins')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Eagles', 'Cowboys')
				}),
				entries: List.of('Redskins')
			}));
		});

		it('puts winner of current vote back to entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Eagles', 'Cowboys'),
					tally: Map({
						'Eagles': 4,
						'Cowboys': 2
					})
				}),
				entries: List.of('Redskins', 'Giants', 'Browns')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Redskins', 'Giants')
				}),
				entries: List.of('Browns', 'Eagles')
			}));
		});

		it('puts both from tied vote back to entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Eagles', 'Cowboys'),
					tally: Map({
						'Eagles': 3,
						'Cowboys': 3
					})
				}),
				entries: List.of('Redskins', 'Giants', 'Browns')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Redskins', 'Giants')
				}),
				entries: List.of('Browns', 'Eagles', 'Cowboys')
			}));
		});

		it('marks winner when just one entry left', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Eagles', 'Cowboys'),
					tally: Map({
						'Eagles': 4,
						'Cowboys': 2
					})
				}),
				entries: List()
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				winner: 'Eagles'
			}));
		});

	});

	describe('vote', () => {

		it('creates a tally for the voted entry', () => {
			const state = Map({
				// vote: Map({
				// 	pair: List.of('Eagles', 'Cowboys')
				// }),
				// entries: List()
				/*the vote function doesn't need to receive the whole app state, just the vote part*/	
				pair: List.of('Eagles', 'Cowboys')
			});
			const nextState = vote(state, 'Eagles');
			expect(nextState).to.equal(Map({
				// vote: Map({
				// 	pair: List.of('Eagles', 'Cowboys'),
				// 	tally: Map({
				// 		'Eagles': 1
				// 	})
				// }),
				// entries: List()
				pair: List.of('Eagles', 'Cowboys'),
				tally: Map({
					'Eagles': 1
				})
			}));
		});

		it('adds to existing tally for the voted entry', () => {
			const state = Map({
				// vote: Map({
				// 	pair: List.of('Eagles', 'Cowboys'),
				// 	tally: Map({
				// 		'Eagles': 3,
				// 		'Cowboys': 2
				// 	})
				// }),
				// entries: List()
				pair: List.of('Eagles', 'Cowboys'),
				tally: Map({
					'Eagles': 3,
					'Cowboys': 2
				})
			});
			const nextState = vote(state, 'Eagles');
			expect(nextState).to.equal(Map({
				// vote: Map({
				// 	pair: List.of('Eagles', 'Cowboys'),
				// 	tally: Map({
				// 		'Eagles': 4,
				// 		'Cowboys': 2
				// 	})
				// }),
				// entries: List()
				pair: List.of('Eagles', 'Cowboys'),
				tally: Map({
					'Eagles': 4,
					'Cowboys': 2
				})
			}));
		});

	});

});