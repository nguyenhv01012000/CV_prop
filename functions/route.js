module.exports = function (app) {
    const service = require('./service');

    app.route('/service/print-resume').get(service.printResume);
};