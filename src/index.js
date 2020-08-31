const KirihimeClient = require('./Structures/KirihimeClient');
const config = require('../config.json');

const client = new KirihimeClient(config);
client.start();