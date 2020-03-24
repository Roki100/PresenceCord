// *************************
// ******** REQUIRE ********
// *************************
const logger = require('./logger.js');
const os = require('os');
const sys = require('systeminformation');
const fs = require('fs');
const readline = require('readline');
const colors = require('colors/safe');
const q = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// *************************
// ********* INIT **********
// *************************
let cpu = os.cpus()[0]
let rpcs = fs.readdirSync('./presences');
let rpclist = [];
for (let i = 0; i < rpcs.length; i++) {
    rpclist.push(`${i+1}. ${rpcs[i]}`);
}
//console.log((await sys.graphics()).controllers[0].model);
async function run() {
logger.log(`Hello ${os.hostname}!`);
logger.log('==================== Using ====================');
logger.log(`CPU: ${cpu.speed / 1000}GHz - ${cpu.model}`);
logger.log(`GPU: ${(await sys.graphics()).controllers[0].model || 'None'}`);
logger.log(`OS: ${os.platform} ${os.arch} ${os.release}`);
logger.log(`MEM: ${(os.totalmem / 1024 / 1024).toFixed()} MB`);
logger.log('===============================================');
console.log(colors.brightGreen(`Available presences to run:\n${colors.red(rpclist.map(e=>e.replace('.js', '').replace('_', ' ')).join('\n'))}\n`))
q.question(colors.brightGreen('Which presence do you want to run? '), async rpc => {
    if(!rpcs[rpc-1]) {
        logger.error(`Presence number ${rpc} was not found.`); 
        return q.close();
    }
    logger.log(`Okay, launching ${rpcs[rpc-1].replace('.js', '').replace('_', ' ')}...`)
    logger.debug(`Requiring ${rpcs[rpc-1]}`);
    try {
    await require(__dirname + `/presences/${rpcs[rpc-1]}`);
    } catch(e) {
        logger.error(`Error occured while trying to load ./presences/${rpcs[rpc-1]}\nError:${e}`)
    }
    q.close();
});
}; run();