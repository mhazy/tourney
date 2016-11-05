"use strict";
var Tourney = (function () {
    function Tourney() {
        this.id = -1;
        this.name = '';
        this.description = '';
        this.rules = '';
        this.registration = { start: undefined, end: undefined };
        this.duration = { start: undefined, end: undefined };
        this.participants = { min: 0, max: 0 };
        this.playoffs = undefined;
        this.schedule = undefined;
    }
    return Tourney;
}());
exports.Tourney = Tourney;
//# sourceMappingURL=tourney.js.map