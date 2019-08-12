"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Channel;
(function (Channel) {
    // party create, remove, modify
    Channel["Party"] = "party";
    // receive/send an event from the server
    Channel["PlayerAdventureLog"] = "eventMessage";
    // used to send/receive player chat messages
    Channel["PlayerChat"] = "playerChat";
    // used to communicate updates to clients
    Channel["PlayerUpdates"] = "playerUpdates";
    // internal: used to sync player add/remove between servers
    Channel["Players"] = "internal:players";
    // internal: used to sync player buff grants (party buffers)
    Channel["PlayerBuff"] = "internal:playerBuffs";
    // internal: used to sync player events for parties (blessxp, blessgold)
    Channel["PlayerEvent"] = "internal:playerEvents";
    // internal: used to sync festivals between servers
    Channel["Festivals"] = "internal:festivals";
    // internal: used to sync game settings between servers
    Channel["GameSettings"] = "internal:gamesettings";
})(Channel = exports.Channel || (exports.Channel = {}));
//# sourceMappingURL=GameEvent.js.map