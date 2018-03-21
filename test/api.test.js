import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('#1 As a user, I need an API to create a friend connection between two email addresses', () => {
    it('Create a valid friend connection between users', done => {
        expect(false).to.eq(true)
        done()
    })
})

describe('#2 As a user, I need an API to retrieve the friends list for an email address', () => {
    it('Get list of friends for a valid user', done => {
        expect(false).to.eq(true)
        done()
    });
});

describe('#3 As a user, I need an API to retrieve the common friends list between two email addresses', () => {
    it('Get list of common friends between two valid users', done => {
        expect(false).to.eq(true)
        done()
    });
});

describe('#4 As a user, I need an API to subscribe to updates from an email address', () => {
    it('Add a valid subscriber to an existing user', done => {
        expect(false).to.eq(true)
        done()
    });
});

describe('#5 As a user, I need an API to block updates from an email address', () => {
    it('Remove a valid subscriber from an existing user', done => {
        expect(false).to.eq(true)
        done()
    });
});

describe('#6 As a user, I need an API to retrieve all email addresses that can receive updates from an email address', () => {
    it('Get all valid subscribers of an existing user', (done) => {
        expect(false).to.eq(true)
        done()
    });
});
