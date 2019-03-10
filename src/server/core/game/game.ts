import { Singleton, Inject } from 'typescript-ioc';
import { DatabaseManager } from './database-manager';
import { PlayerManager } from './player-manager';

import { Player } from '../../../shared/models/entity';
import { ServerEventName } from '../../../shared/interfaces';

const GAME_DELAY = process.env.GAME_DELAY ? +process.env.GAME_DELAY : 5000;

@Singleton
export class Game {

  @Inject public databaseManager: DatabaseManager;
  @Inject public playerManager: PlayerManager;

  private ticks = 0;

  public init() {
    this.databaseManager.init();
    this.loop();
  }

  public loop() {

    this.ticks++;

    // intentionally, we don't wait for each player to save (we could do for..of)
    // we just want to make sure their player event is done before we send an update
    this.playerManager.allPlayers.forEach(async player => {
      await player.loop();

      this.updatePlayer(player);

      if((this.ticks % 60) === 0) this.databaseManager.savePlayer(player);
    });

    if(this.ticks > 600) this.ticks = 0;

    setTimeout(() => {
      this.loop();
    }, GAME_DELAY);
  }

  public updatePlayer(player: Player) {
    const socket = this.playerManager.getPlayerSocket(player.name);
    const patch = this.playerManager.getPlayerPatch(player.name);

    socket.emit(ServerEventName.CharacterPatch, patch);
  }
}
