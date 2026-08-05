import crypto from "crypto";

const optGenerator = () => crypto.randomInt(100000, 1000000).toString();

export default optGenerator;
