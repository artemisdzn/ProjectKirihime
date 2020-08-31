const fs = require('fs').promises;
const path = require('path');
const Command = require('./Command');
const Event = require('./Event');

module.exports = class Util {

	constructor(client) {
		this.client = client;
	}

	getCodeBlock(txt) {
		const match = /^```(\S*)\n?([^]*)\n?```$/.exec(txt);
		if (!match) return { lang: null, code: txt };
		if (match[1] && !match[2]) return { lang: null, code: match[1] };
		return { lang: match[1], code: match[2] };
	}

	toProperCase(str) {
		return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
	}


	isClass(input) {
		return typeof input === 'function' &&
			typeof input.prototype === 'object' &&
			input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	capitalise(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
	}

	async *loadFiles(dir) {
		const files = await fs.readdir(dir);
		for (const file of files) {
			const pathToFile = path.join(dir, file);
			const isDirectory = (await fs.stat(pathToFile)).isDirectory();
			if (isDirectory) {
				yield* this.loadFiles(pathToFile);
			} else {
				yield pathToFile;
			}
		}
	}

	async loadCommands() {
		for await (const commandFile of this.loadFiles(`${this.directory}Commands`)) {
			delete require.cache[commandFile];
			const { name } = path.parse(commandFile);
			const File = require(commandFile);
			if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
			const command = new File(this.client, name.toLowerCase());
			if (!(command instanceof Command)) throw new TypeError(`Comamnd ${name} doesnt belong in Commands.`);
			this.client.commands.set(command.name, command);
			if (command.aliases.length) {
				for (const alias of command.aliases) {
					this.client.aliases.set(alias, command.name);
				}
			}
		}
	}

	async loadEvents() {
		for await (const eventFile of this.loadFiles(`${this.directory}Events`)) {
			delete require.cache[eventFile];
			const { name } = path.parse(eventFile);
			const File = require(eventFile);
			if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
			const event = new File(this.client, name);
			if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in Events`);
			this.client.events.set(event.name, event);
			event.emitter[event.type](name, (...args) => event.run(...args));
		}
	}

};