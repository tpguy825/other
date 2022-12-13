window.onerror = function (message, url, line, col) {
	alert(`Error: ${message} at ${url}:${line}:${col}`);
};

const path = new URL(window.location.href).pathname;
if (!path.endsWith("computing-website/") && path.endsWith("computing-website")) {
	window.location.replace(window.location.href + "/");
}
