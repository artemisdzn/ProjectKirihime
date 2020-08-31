const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['covid19', 'coronavirus', 'covid-19'],
            description: 'Track a country, continent or worldwide COVID-19 cases.',
            category: 'Information',
            usage: '<country (name of country)|continent (name of continent)> [all]'
        });
    }

    async run(message, args) {

        if (!args[0]) return message.channel.send(`\`${this.client.commands.get(this.name).usage}\``)
        if (this.client.utils.capitalise(args[0]) === 'Country') {
            const country = args.slice(1).join(' ')
            if (!args[1]) return message.channel.send('Which country are you fetching statistics for?')
            const stats = await fetch(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country)}`).then(response => response.json())
            if (stats.message === 'Country not found or doesn\'t have any cases') return message.reply('that country either doesn\'t exist, or has no cases.')
            const embed = new MessageEmbed()
                .setTitle(`Statistics for ${this.client.utils.capitalise(country)}`)
                .setColor(message.guild.me.displayHexColor || 'RANDOM')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/765px-SARS-CoV-2_without_background.png')
                .addField('Total cases', stats.cases.toLocaleString(), true)
                .addField('New cases', stats.todayCases.toLocaleString(), true)
                .addField('Total deaths', stats.deaths.toLocaleString(), true)
                .addField('New deaths', stats.todayDeaths.toLocaleString(), true)
                .addField('Recovered', stats.recovered.toLocaleString(), true)
                .addField('Critical condition', stats.critical.toLocaleString(), true)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            message.channel.send(embed)
        } else if (this.client.utils.capitalise(args[0]) === 'Continent') {
            let continent = args.slice(1).join(' ')
            if (!args[1]) return message.channel.send('Which continent are you fetching statistics for?')
            if (this.client.utils.capitalise(args[1]) === 'North' && this.client.utils.capitalise(args[2]) === 'America') continent = 'North America'
            if (this.client.utils.capitalise(args[1]) === 'South' && this.client.utils.capitalise(args[2]) === 'America') continent = 'South America'
            if (this.client.utils.capitalise(args[1]) === ('Australia' || 'Oceania')) continent = 'Australia/Oceania'

            const stats = await fetch(`https://disease.sh/v3/covid-19/continents/${encodeURIComponent(continent)}`).then(response => response.json())
            if (stats.message === 'Continent not found or doesn\'t have any cases') return message.reply('that continent either doesn\'t exist, or has no cases.')
            const embed = new MessageEmbed()
                .setTitle(`Statistics for ${this.client.utils.capitalise(continent)}`)
                .setColor(message.guild.me.displayHexColor || 'RANDOM')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/765px-SARS-CoV-2_without_background.png')
                .addField('Total cases', stats.cases.toLocaleString(), true)
                .addField('New cases', stats.todayCases.toLocaleString(), true)
                .addField('Total deaths', stats.deaths.toLocaleString(), true)
                .addField('New deaths', stats.todayDeaths.toLocaleString(), true)
                .addField('Active cases', stats.active.toLocaleString(), true)
                .addField('Recovered', stats.recovered.toLocaleString(), true)
                .addField('Critical condition', stats.critical.toLocaleString(), true)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            message.channel.send(embed)
        } else {
            const stats = await fetch('https://disease.sh/v3/covid-19/all').then(response => response.json())
            const embed = new MessageEmbed()
                .setTitle('Statistics for all countries')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/765px-SARS-CoV-2_without_background.png')
                .setColor(message.guild.me.displayHexColor || 'RANDOM')
                .addField('Total cases', stats.cases.toLocaleString(), true)
                .addField('New cases', stats.todayCases.toLocaleString(), true)
                .addField('Total deaths', stats.deaths.toLocaleString(), true)
                .addField('New deaths', stats.todayDeaths.toLocaleString(), true)
                .addField('Recovered', stats.recovered.toLocaleString(), true)
                .addField('Cases per million', stats.casesPerOneMillion.toLocaleString(), true)
                .addField('Deaths per million', stats.deathsPerOneMillion.toLocaleString(), true)
                .addField('Affected countries', stats.affectedCountries.toLocaleString(), true)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            message.channel.send(embed)
        }

    }

};
