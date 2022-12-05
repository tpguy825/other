import { readdirSync, statSync } from "fs";
import { exec } from "child_process";

const ignoreddirs = ["node_modules", ".git"];

// iterate over directories in the current directory
readdirSync(__dirname).forEach((dir, i, dirs) => {
	// ignore files
	if (statSync(dir).isFile()) {
		console.log(`Skipping ${dir} because it is a file (${i + 1}/${dirs.length})`);
		return;
	}

	// ignore certain dirs
	if (dir in ignoreddirs) {
		console.log(`Skipping ${dir} (${i + 1}/${dirs.length})`);
		return;
	}

	// if the dir has a package.json, build it
	if (statSync(`${dir}/package.json`).isFile()) {
		console.log(`Building ${dir} (${i + 1}/${dirs.length})`);
		// run a console command
		exec(`cd ${dir} && npm run build`, (err, stdout, stderr) => {
			if (err) {
				console.err(err);
				return;
			}
			if(stderr) {
				console.err(stderr);
				return;
			}
			console.log(stdout);
		});
	}
});
