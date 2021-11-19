const dotenv = require('dotenv');
const child_process = require('child_process');

const config = dotenv.config()
const FRONTEND_PORT = process.env.PORT || process.env.FRONTEND_PORT || 4200;

console.log("Starting ng with command:", `cd Frontend && npm run start -- --port=${FRONTEND_PORT}`)
const child = child_process.exec(`cd Frontend && npm run start -- --port=${FRONTEND_PORT}`);
child.stderr.on('data', err => console.error(err));
child.stdout.on('data', data => console.log(data.toString()));
