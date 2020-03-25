const info = module.exports = {
    name: 'Nothing',
    description: 'Play nothing for a few days',
    author: 'MILLION#1321',
    github: 'https://github.com/Million900o'
};
const rpc = require("discord-rpc");
const logger = require('../logger.js');
const client = new rpc.Client({ transport: 'ipc' });
client.login({ clientId: '683017681376772116' });

async function worker() {
    setInterval(async () => {
        let presence = {
            startTimestamp: new Date(Date.now() - (69 * 24 * 60 * 60 * 1000)),
            smallImageKey: 'untitled',
            smallImageText: 'Yeet',
            largeImageKey: 'untitled',
            largeImageText: 'Wow, you found this!',
            state: 'Playing Solo',
            details: 'Not doing anything',
            partySize: 420,
            partyMax: 69,
            instance: true
        };
        try {
            await client.setActivity(presence);
        } catch (e) {
            logger.error(`Error ocurred while trying to update presence. Error: ${e}`);
        }
    }, 5000);
}

client.once('ready', () => {
    logger.log(`Started up ${info.name} presence by MILLION#1321!`);
    let presence = { state: 'Loading...' };
    client.setActivity(presence);
    worker();
});
client.on('error', (e) => {
    logger.error(`Something went wrong while connecting to discord. Please try again.`);
    logger.debug(`ERROR Event: ${e}`);
});