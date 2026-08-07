type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {
		/** Set by middleware when Accept prefers text/markdown over text/html. */
		prefersMarkdown: boolean;
	}
}

/// <reference types="@sanity/astro/module" />