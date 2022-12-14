/** @return {{ form: HTMLInputElement, suggestion: HTMLInputElement, name: HTMLInputElement, submit: HTMLInputElement, underformgreen: HTMLInputElement, underformred: HTMLInputElement}} */
function getdom() {
	return {
		form: document.getElementById("suggestion-form"),
		suggestion: document.getElementById("suggestion-input"),
		name: document.getElementById("name-input"),
		submit: document.getElementById("submit-button"),
		underformgreen: document.getElementById("under-form-green"),
		underformred: document.getElementById("under-form-red"),
	};
}
const dom = getdom();

if (dom.form === null || dom.suggestion === null || dom.name === null || dom.submit === null) {
	throw new Error("Missing DOM elements. This should never happen (" + JSON.stringify(dom) + ")");
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyBYIxtA8sF3-MoZNPvKoYCzs9XkgvTM_o8",
	authDomain: "computing-unit-14-website.firebaseapp.com",
	projectId: "computing-unit-14-website",
	storageBucket: "computing-unit-14-website.appspot.com",
	messagingSenderId: "174236838265",
	appId: "1:174236838265:web:57a5c2ea7872043ff2a7a8",
	measurementId: "G-32LZZW7G53",
	databaseURL: "https://computing-unit-14-website-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

dom.suggestion.addEventListener("input", (ev) => suggestioncheckfunc(ev.target));
/**
 * @param {HTMLInputElement} el name input element
 */
function suggestioncheckfunc(el, border = true) {
	try {
		if (el.value.length <= 0) throw new Error();
		if (border) el.style.border = "1px solid green";
		return true;
	} catch (e) {
		if (border) el.style.border = "1px solid red";
		return false;
	}
}

dom.name.addEventListener("input", (ev) => namecheckfunc(ev.target));

/**
 * @param {HTMLInputElement} el suggestion input element
 */
function namecheckfunc(el, border = true) {
	try {
		if (el.value.length <= 0) throw new Error();
		if (border) el.style.border = "1px solid green";
		return true;
	} catch (e) {
		if (border) el.style.border = "1px solid red";
		return false;
	}
}

dom.underformgreen.classList.add("visually-hidden");
dom.underformred.classList.add("visually-hidden");
dom.form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!namecheckfunc(dom.name) || !suggestioncheckfunc(dom.suggestion)) return;
	const suggestion = dom.suggestion.value;
	const name = dom.name.value;
	const data = { suggestion, name };
	try {
		firebasethingy(data);
		dom.underformred.classList.add("visually-hidden");
		dom.underformgreen.classList.remove("visually-hidden");
		dom.suggestion.value = dom.name.value = "";
	} catch (e) {
		dom.underformred.querySelector("span").innerText = `Error: ${e}`;
		dom.underformgreen.classList.add("visually-hidden");
		dom.underformred.classList.remove("visually-hidden");
	}
});

namecheckfunc(dom.name, false);
suggestioncheckfunc(dom.suggestion, false);

// firebase schenanigans
/**
 * @param {{ suggestion: string, name: string }} data
 */
function firebasethingy(data) {
	const dbref = ref(database);
	get(dbref).then((snapshot) => {
		const val = snapshot.val();
		if (val === null) {
			set(dbref, [data]);
		} else {
			const newval = [...val, data];
			set(dbref, newval);
		}
	});
}
