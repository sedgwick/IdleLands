"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var models_1 = require("../../shared/models");
var interfaces_1 = require("../../shared/interfaces");
var GMMotdEvent = /** @class */ (function (_super) {
    tslib_1.__extends(GMMotdEvent, _super);
    function GMMotdEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.event = interfaces_1.ServerEventName.GMSetMOTD;
        _this.description = 'GM: Set the MOTD for the game';
        _this.args = 'motd';
        return _this;
    }
    GMMotdEvent.prototype.callback = function (_a) {
        var motd = (_a === void 0 ? { motd: '' } : _a).motd;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var player;
            return tslib_1.__generator(this, function (_b) {
                player = this.player;
                if (!player)
                    return [2 /*return*/, this.notConnected()];
                if (player.modTier < interfaces_1.ModeratorTier.GameMod)
                    return [2 /*return*/, this.gameError('Lol no.')];
                this.game.gmHelper.initiateSetMOTD(motd);
                return [2 /*return*/];
            });
        });
    };
    return GMMotdEvent;
}(models_1.ServerSocketEvent));
exports.GMMotdEvent = GMMotdEvent;
var GMToggleMuteEvent = /** @class */ (function (_super) {
    tslib_1.__extends(GMToggleMuteEvent, _super);
    function GMToggleMuteEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.event = interfaces_1.ServerEventName.GMToggleMute;
        _this.description = 'GM: Toggle mute for a player';
        _this.args = 'playerName, duration';
        return _this;
    }
    GMToggleMuteEvent.prototype.callback = function (_a) {
        var _b = _a === void 0 ? { playerName: '', duration: 60 } : _a, playerName = _b.playerName, duration = _b.duration;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var player;
            return tslib_1.__generator(this, function (_c) {
                player = this.player;
                if (!player)
                    return [2 /*return*/, this.notConnected()];
                if (player.modTier < interfaces_1.ModeratorTier.ChatMod)
                    return [2 /*return*/, this.gameError('Lol no.')];
                this.game.gmHelper.initiateMute(playerName, duration);
                return [2 /*return*/];
            });
        });
    };
    return GMToggleMuteEvent;
}(models_1.ServerSocketEvent));
exports.GMToggleMuteEvent = GMToggleMuteEvent;
var GMChangeModTierEvent = /** @class */ (function (_super) {
    tslib_1.__extends(GMChangeModTierEvent, _super);
    function GMChangeModTierEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.event = interfaces_1.ServerEventName.GMChangeModTier;
        _this.description = 'GM: Change mod tier for a player';
        _this.args = 'playerName, newTier';
        return _this;
    }
    GMChangeModTierEvent.prototype.callback = function (_a) {
        var _b = _a === void 0 ? { playerName: '', newTier: 0 } : _a, playerName = _b.playerName, newTier = _b.newTier;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var player;
            return tslib_1.__generator(this, function (_c) {
                player = this.player;
                if (!player)
                    return [2 /*return*/, this.notConnected()];
                if (player.modTier < interfaces_1.ModeratorTier.Admin)
                    return [2 /*return*/, this.gameError('Lol no.')];
                this.game.gmHelper.initiateChangeModTier(playerName, newTier);
                return [2 /*return*/];
            });
        });
    };
    return GMChangeModTierEvent;
}(models_1.ServerSocketEvent));
exports.GMChangeModTierEvent = GMChangeModTierEvent;
var GMStartFestivalEvent = /** @class */ (function (_super) {
    tslib_1.__extends(GMStartFestivalEvent, _super);
    function GMStartFestivalEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.event = interfaces_1.ServerEventName.GMStartFestival;
        _this.description = 'GM: Start a festival';
        _this.args = 'festival';
        return _this;
    }
    GMStartFestivalEvent.prototype.callback = function (_a) {
        var festival = (_a === void 0 ? { festival: null } : _a).festival;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var player;
            return tslib_1.__generator(this, function (_b) {
                player = this.player;
                if (!player)
                    return [2 /*return*/, this.notConnected()];
                if (player.modTier < interfaces_1.ModeratorTier.GameMod)
                    return [2 /*return*/, this.gameError('Lol no.')];
                if (!festival)
                    return [2 /*return*/, this.gameError('No festival specified.')];
                this.game.festivalManager.startGMFestival(player, festival);
                return [2 /*return*/];
            });
        });
    };
    return GMStartFestivalEvent;
}(models_1.ServerSocketEvent));
exports.GMStartFestivalEvent = GMStartFestivalEvent;
//# sourceMappingURL=gm.js.map