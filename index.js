#!/usr/bin/node

'use strict';

const fs = require('fs');

const cd = __dirname;

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require(`${cd}/config.json`);

client.on('ready', () => {
  console.log('Initialized');
});

function shouldPolice(msg, listOfWrongthink, isRegex, ignoreWhitespace) {
  const text = (ignoreWhitespace ? msg.content.replace(/\s+/gi, "") : msg.content).toLowerCase();
  const badStuff = ignoreWhitespace ?
      listOfWrongthink.map(e => e.replace(/\s+/gi, "").toLowerCase()) :
      listOfWrongthink.map(e => e.toLowerCase());
  if (!isRegex) return badStuff.some(e => text.includes(e));
  else return badStuff.some(regex => text.match(RegExp(regex, "g")) != null);
}

function runAction(action, message) {
  switch (action.kind) {
    case 'react':
      message.react(message.guild.emojis.get(action.emoji));
      break;
    case 'reply':
      message.reply(action.message);
      break;
    case 'delete':
      message.delete();
      break;
    default: throw Error(`Bad config, unknown action ${action.kind}`);
  }
}

client.on('message', message => {
  config.forEach(filter => {
    if (shouldPolice(message, filter.triggers, filter.isRegex, filter.ignoreWhitespace)) {
      filter.actions.forEach(action => runAction(action, message));
    }
  });
});

client.login(fs.readFileSync(`${cd}/bot-token`, {encoding: 'utf8'}));
