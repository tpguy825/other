import { Heart, Twitter, Youtube, Github, Code, Bug } from "./Icons";

const githublink = "https://github.com/tpguy825/other"

/**
 * General footer for the website
 */
function Footer({ children }: { children?: JSX.Element | string }): JSX.Element {
	return (
		<footer className="d-flex flex-wrap justify-content-between align-items-center py-3">
			<span className="mb-4 mb-md-0">
				Made with {Heart} by tpguy825 - <a rel="noopener" title="Twitter" target="_blank" href="https://twitter.com/tobypayneyt">{Twitter}</a> <a title="Youtube" rel="noopener" target="_blank" href="https://youtube.com/verydankmemes">{Youtube}</a> <a title="Github" rel="noopener" target="_blank" href="https://github.com/tpguy825">{Github}</a> - <a rel="noopener" target="_blank" href={githublink}>{Code} Source Code</a> - <a href={githublink + "/issues/new"}>{Bug} Got a problem?</a>
			</span>
			{typeof children === "string" ? <span>{children}</span> : children}
		</footer>
	);
}

export default Footer;

