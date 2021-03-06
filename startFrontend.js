const dotenv = require('dotenv');
const child_process = require('child_process');

const config = dotenv.config()
const env = process.env
if (env.IS_BACKEND === "1") {
    //Frontend doesn't need to run in production
    return false;
}
env.PORT = process.env.PORT || process.env.FRONTEND_PORT || 4200

const child = child_process.exec(`cd Frontend && npm run start`, {env: env});
child.stderr.on('data', err => console.error(err));
child.stdout.on('data', data => console.log(data.toString()));
