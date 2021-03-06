'use strict';

module.exports = {
    state: 'Not Authenticated',

    schema: [{
        name: 'username',
        type: 'string'
    }, {
        name: 'password',
        type: 'string'
    }],

    handler(command, callback) {

        let username = (command.attributes[0].value || '').toString().trim();
        let password = (command.attributes[1].value || '').toString().trim();

        if (!this.secure && !this._server.options.ignoreSTARTTLS) {
            // Only allow authentication using TLS
            return callback(null, {
                response: 'BAD',
                message: 'Run STARTTLS first'
            });
        }

        // Check if authentication method is set
        if (typeof this._server.onAuth !== 'function') {
            this._server.logger.info('[%s] Authentication failed for %s using %s', this.id, username, 'LOGIN');
            return callback(null, {
                response: 'NO',
                message: 'Authentication not implemented'
            });
        }

        // Do auth
        this._server.onAuth({
            method: 'LOGIN',
            username,
            password
        }, this.session, (err, response) => {

            if (err) {
                this._server.logger.info('[%s] Authentication error for %s using %s\n%s', this.id, username, 'LOGIN', err.message);
                return callback(err);
            }

            if (!response || !response.user) {
                this._server.logger.info('[%s] Authentication failed for %s using %s', this.id, username, 'LOGIN');
                return callback(null, {
                    response: 'NO',
                    message: 'Authentication failure'
                });
            }

            this._server.logger.info('[%s] %s authenticated using %s', this.id, username, 'LOGIN');
            this.session.user = response.user;
            this.state = 'Authenticated';

            callback(null, {
                response: 'OK',
                message: username + ' authenticated'
            });

        });
    }
};
