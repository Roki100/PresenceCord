const info = module.exports = {
    name: 'Example presence',
    description: 'This is a example presence implementation',
    author: 'Roki_100#0230',
    github: 'https://github.com/Roki100'
}
const rpc = require("discord-rpc");
const logger = require('../logger.js');
const client = new rpc.Client({ transport: 'ipc' });
client.login({ clientId: '625733912953487370' });

async function worker() {
setInterval(async () => {
    let presence = {
    state: `PresenceCord`,
    details: `Example presence`,
    instance: true
    };
    try {
    await client.setActivity(presence);
    } catch(e) {
    logger.error(`Error occured while trying to update presence. Error: ${e}`);
    }
}, 5000);
}


client.once('ready', () => {
    logger.log(`Started up ${info.name} presence!`);
    let presence = {state: 'Loading...'}; client.setActivity(presence);
    worker();
});
client.on('error', (e) => {
    logger.error(`Something went wrong while connecting to discord. Please try again.`);
    logger.debug(`ERROR Event: ${e}`);
});