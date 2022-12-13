window.onerror = function (message, url, line, col) {
	alert(`Error: ${message} at ${url}:${line}:${col}`);
};
