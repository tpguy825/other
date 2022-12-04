import { useState } from "react";

const binarytable: KeyArray<BinaryStringCount, number> = {
	"8": 1,
	"7": 2,
	"6": 4,
	"5": 8,
	"4": 16,
	"3": 32,
	"2": 64,
	"1": 128,
};

type BinaryStringCount = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
type KeyArray<K extends string | number | symbol, I> = {
	[P in K]: I;
};

export default function App() {
	const [denary, setdenary] = useState("0");
	const [binary, setbinary] = useState("00000000");
	const [calc, setcalc] = useState("");
	const [result, setresult] = useState("");

	return (
		<div>
			{/* make a bootstrap form with two number inputs */}
			<form>
				<div className="form-group">
					<label htmlFor="num1">
						Denary{" "}
						{isvaliddenary(Number(denary)) ? null : <span className="error">- Invalid denary number (needs to be between 0-255)</span>}
					</label>
					<input type="text" className="form-control" id="num1" value={denary} onChange={(e) => setdenary(e.target.value)} />
				</div>
				<div className="form-group">
					<label htmlFor="num2">
						Binary{" "}
						{binary.length !== 8 ? (
							<span className="error">- Binary number needs to be 8 digits long (not {binary.length})</span>
						) : isvalidbinary(binary) ? null : (
							<span className="error">- Invalid binary</span>
						)}
					</label>
					<input type="number" className="form-control" id="num2" value={binary} onChange={(e) => setbinary(e.target.value)} />
				</div>
				<div className="form-group">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							const [result, calc] = denarytobinary(Number(denary));
							setresult(result);
							setcalc(calc);
						}}
						disabled={!isvaliddenary(Number(denary))}>
						Denary {`=>`} Binary
					</button>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							const [result, calc] = binarytodenary(binary);
							setresult(String(result));
							setcalc(calc);
						}}
						disabled={!isvalidbinary(binary)}>
						Binary {`=>`} Denary
					</button>
				</div>
				<div className="form-group">
					<label htmlFor="result">Result</label>
					<input type="text" className="form-control" id="result" value={result} disabled />
				</div>
				<div className="form-group">
					<label htmlFor="calc">Calculation</label>
					<input type="text" className="form-control" id="calc" value={calc} disabled />
				</div>
			</form>
		</div>
	);
}

window.onerror = (message, source, lineno, colno) => {
	alert(`Error: ${message} at ${source}:${lineno}:${colno}`);
};

function isvalidbinary(binary: string) {
	return binary.length === 8 && !/[^01]/.test(binary);
}

function binarytodenary(binary: string): [number, string] {
	let denary = 0;
	let calc = "";
	let binaryarray = binary.split("");
	if (binaryarray.length !== 8) {
		alert("Binary number must be 8 digits long");
	} else {
		// convert binary to denary
		for (let i = 8; i > binaryarray.length - 8; ) {
			i--;
			const digit = binaryarray[i];
			if (digit === "1") {
				denary += 1 * binarytable[String(i + 1) as BinaryStringCount];
				if (calc !== "") {
					calc += ` + ${digit}`;
				} else {
					calc += `${digit}`;
				}
			} else if (digit !== "0") {
				alert("Invalid binary number: " + digit);
			}
		}
	}

	if (calc !== "") {
		calc += ` = ${denary}`;
	}

	return [denary, calc];
}

function isvaliddenary(denary: number) {
	if (Number.isNaN(denary)) {
		return false;
	}
	return denary >= 0 && denary <= 255;
}

function denarytobinary(denary: number): [string, string] {
	let binary = "";
	let calc = "";
	const originaldenary = denary;

	// convert denary to binary
	for (let i = 0; i < 8; i++) {
		const digit = binarytable[String(i + 1) as BinaryStringCount];
		if (denary >= digit) {
			denary -= digit;
			binary += "1";
			if (calc !== "") {
				calc += ` + (${binarytable[String(i + 1) as BinaryStringCount]} * 1)`;
			} else {
				calc += `(${binarytable[String(i + 1) as BinaryStringCount]} * 1)`;
			}
		} else {
			binary += "0";
		}
	}
	if (calc !== "") {
		calc += ` = ${originaldenary}`;
	}
	return [binary, calc];
}
