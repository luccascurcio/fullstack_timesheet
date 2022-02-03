var sails = require('sails');
const request = require('supertest');

describe('Landing page', () => {
    it('Should return status 200', (done) => {
        request(sails.hooks.http.app)
            .get('/')
            .expect(200, done)
    })
})

beforeAll(function (done) {
    sails.lift({
        hooks: { grunt: false },
        log: { level: 'warn' },

    }, function (err) {
        if (err) { return done(err); }
        return done();
    });
});

afterAll(function (done) {
    sails.lower(done);
});