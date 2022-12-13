import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const database = getDatabase(app);

/** @param {HTMLTableElement} table */
async function gentable(table) {
	const snapshot = await get(ref(database));
	if (snapshot.exists()) {
		const data = snapshot.val();
		table.innerHTML = `<thead><tr><th>ID</th><th>Name</th><th>Suggestion</th><th>Edit</th></tr></thead><tbody></tbody>`
		for (const key in data) {
			const row = table.insertRow();
			row.insertCell().innerText = key;
			row.insertCell().innerText = data[key].name;
			row.insertCell().innerText = data[key].suggestion;

			const deletetc = row.insertCell();
			const deletebutton = document.createElement("button");

			deletebutton.className = "btn btn-danger";
			deletebutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>`;
			deletebutton.onclick = () => deleteSuggestion(key);

			deletetc.appendChild(deletebutton);
		}
	} else {
		console.log("No data available");
	}
}

function deleteSuggestion(key) {
	set(ref(database, key), null);
	gentable(document.getElementById("table"));
}

setInterval(() => {
	gentable(document.getElementById("table"));
}, 5000)
