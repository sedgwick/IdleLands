import { Game } from './game/game';

const SCWorker = require('socketcluster/scworker');
const express = require('express');
const morgan = require('morgan');
const healthChecker = require('sc-framework-health-check');

const allEvents = require('../modules');

const GRACE_PERIOD_DISCONNECT = process.env.GRACE_PERIOD_DISCONNECT ? +process.env.GRACE_PERIOD_DISCONNECT : 30000;

export class GameWorker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);

    const game = new Game();
    game.init();

    const environment = this.options.environment;

    const app = express();

    const httpServer = this.httpServer;
    const scServer = this.scServer;

    if (environment === 'dev') {
      // Log every HTTP request. See https://github.com/expressjs/morgan for other
      // available formats.
      app.use(morgan('dev'));
    }

    // Add GET /health-check express route
    healthChecker.attach(this, app);

    httpServer.on('request', app);

    // initialize all the socket commands for the newly connected client
    scServer.on('connection', (socket) => {
      Object.values(allEvents).forEach((EvtCtor: any) => {
        const evtInst = new EvtCtor(game, socket);
        socket.on(evtInst.event, (args) => evtInst.callback(args));
      });
    });

    // handle disconnecting the client from the player
    // if they do not come back within GRACE_PERIOD_DISCONNECT, we remove their player from the game, too
    scServer.on('disconnection', (socket) => {
      if(!socket.playerName) return;

      const player = game.playerManager.getPlayer(socket.playerName);
      if(!player) return;

      player.loggedIn = false;

      setTimeout(() => {
        if(player.loggedIn) return;
        game.playerManager.removePlayer(player);
        game.databaseManager.savePlayer(player);
      }, GRACE_PERIOD_DISCONNECT);
    });
  }
}

const gameWorker = new GameWorker();
