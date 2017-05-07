import jsdom from 'jsdom';
const {JSDOM} = jsdom;
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const document = new JSDOM('<!doctype html><html><body></body></html>');
// const win = doc.defaultView;
const window = (new JSDOM('<!doctype html><html><body></body></html>')).defaultView;

console.log(document);
console.log(document.defaultView);
console.log(window);

// global.document = doc;
// global.window = win;
global.window = document.defaultView;
global.document = window.document;
global.navigator = window.navigator;
global.XMLHttpRequest = window.XMLHttpRequest;
global.HTMLElement = window.HTMLElement;
window.localStorage = new MockStorage();
window.sessionStorage = new MockStorage();
global.sinon = require('sinon');

// console.log(global.document);
// console.log(global.window);

// Object.keys(window).forEach((key) => {
// 	if (!(key in global)) {
// 		global[key] = window[key];
// 	}
// });

chai.use(chaiImmutable);