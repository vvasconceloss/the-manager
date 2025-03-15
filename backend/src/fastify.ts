import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify();
fastify.register(cors, { origin: "*" });

export default fastify;