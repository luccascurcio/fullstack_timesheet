var sails = require('sails');
const request = require('supertest');

describe('CreateUser', () => {
  it('Create a new user', (done) => {
    const newUser = {
        name: 'Jest_Test',
        email: 'jest_test@gmail.com',
        password: 'holamundo'
    }
    request(sails.hooks.http.app)
        .post('/users/store')
        .send(newUser)
        .expect(200)
        .then(res => {
            done();
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
})
})

beforeAll(function (done) {
    sails.lift({
        hooks: { grunt: false },
        log: { level: 'warn' },

    }, function (err) {
        if (err) { return done(err); }

        // here you can load fixtures, etc.
        // (for example, you might want to create some records in the database)

        return done();
    });
});

// Global after hook
afterAll(function (done) {
    // here you can clear fixtures, etc.
    // (e.g. you might want to destroy the records you created above)
    sails.lower(done);
});