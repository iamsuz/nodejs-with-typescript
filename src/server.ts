import { build } from "./app.ts";

type FastifyOptions = {
	// Define the type of options you want to pass to Fastify
	// For example, you can define a logger option
	logger:
		| boolean
		| {
				transport: {
					target: string;
					options: { translateTime: string; colorize: boolean; ignore: string };
				};
		  };
};

const opts: FastifyOptions = {
	logger: true,
};

// We want to use pino-pretty only if the human is using a TTY
// (terminal) and not when the server is running in a container
// or in a non-TTY environment (like a CI/CD pipeline).
if (process.stdout.isTTY) {
	opts.logger = {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "SYS:standard",
				colorize: true,
				ignore: "pid,hostname",
			},
		},
	};
}

const app = await build(opts);

app.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err);
		// process.exit(1);
	}
	console.log(`Server is running at ${address}`);
});
