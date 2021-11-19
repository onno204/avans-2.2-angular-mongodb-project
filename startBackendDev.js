const dotenv = require('dotenv');
const child_process = require('child_process');

const config = dotenv.config()
const env = process.env
if (env.IS_BACKEND === "1") {
    env.PORT = process.env.PORT || process.env.BACKEND_PORT || 8080
}else{
    env.PORT = process.env.BACKEND_PORT || 8080
}

const child = child_process.exec(`cd Backend && npm run dev`, {env: env});
child.stderr.on('data', err => console.error(err));
child.stdout.on('data', data => console.log(data.toString()));
