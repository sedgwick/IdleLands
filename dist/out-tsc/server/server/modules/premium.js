"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var models_1 = require("../../shared/models");
var interfaces_1 = require("../../shared/interfaces");
var PremiumUpgradeEvent = /** @class */ (function (_super) {
    tslib_1.__extends(PremiumUpgradeEvent, _super);
    function PremiumUpgradeEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.event = interfaces_1.ServerEventName.PremiumUpgrade;
        _this.description = 'Buy a premium upgrade using ILP.';
        _this.args = 'upgradeName';
        return _this;
    }
    PremiumUpgradeEvent.prototype.callback = function (_a) {
        var upgradeName = (_a === void 0 ? { upgradeName: '' } : _a).upgradeName;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var player, didUpgrade;
            return tslib_1.__generator(this, function (_b) {
                player = this.player;
                if (!player)
                    return [2 /*return*/, this.notConnected()];
                didUpgrade = player.$premium.buyUpgrade(upgradeName);
                if (!didUpgrade)
                    return [2 /*return*/, this.gameError('You do not have enough ILP to buy that upgrade.')];
                player.syncPremium();
                this.gameMessage('Successfully upgraded yourself!');
                this.game.updatePlayer(player);
                return [2 /*return*/];
            });
        });
    };
    return PremiumUpgradeEvent;
}(models_1.ServerSocketEvent));
exports.PremiumUpgradeEvent = PremiumUpgradeEvent;
//# sourceMappingURL=premium.js.map