import Fastify from "fastify";

const fastify = Fastify({
	logger: true,
});

fastify.get("/", function (request, reply) {
	reply.send({ hello: "world" });
});

console.log("Starting server...");
fastify.listen({ port: 3000 }, (err, address) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	fastify.log.info(`Server listening at ${address}`);
});
