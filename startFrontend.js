const dotenv = require('dotenv');
const child_process = require('child_process');

const config = dotenv.config()
const env = process.env
env.PORT = process.env.PORT || process.env.FRONTEND_PORT || 4200

const child = child_process.exec(`cd Frontend && npm i && npm run serve -- --PORT=${env.PORT}`, {env: env});
child.stderr.on('data', err => console.error(err));
child.stdout.on('data', data => console.log(data.toString()));
