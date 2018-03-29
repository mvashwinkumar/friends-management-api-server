import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
chai.use(chaiHttp)

import mongoose from 'mongoose'

import { app, serverInstance } from '../server'

const request = chai.request(app)

describe('Test API Server', () => {

    before(function (done) {
        for (var collection in mongoose.connection.collections) {
            mongoose.connection.collections[collection].remove(function () { })
        }
        done()
    })

    describe('#1 As a user, I need an API to create a friend connection between two email addresses', () => {
        it('Create a valid friend connection between users', done => {
            request
                .post('/api/v2/friends/connection')
                .send({ friends: ['andy@example.com', 'john@example.com'] })
                .then(response => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.eql({ success: true })
                    done()
                }).catch(done)
        })
    })

    describe('#2 As a user, I need an API to retrieve the friends list for an email address', () => {
        it('Get list of friends for a valid user', done => {
            request
                .get('/api/v2/friends?email=andy@example.com')
                .then(response => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.eql({ success: true, friends: ['john@example.com'], count: 1 })
                    done()
                }).catch(done)
        })
    })

    describe('#3 As a user, I need an API to retrieve the common friends list between two email addresses', () => {
        it('Get list of common friends between two valid users', done => {
            request
                .get('/api/v2/friends/common?emails=andy@example.com&emails=john@example.com')
                .then(response => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.eql({ success: true, friends: [], count: 0 })
                    done()
                }).catch(done)
        })
    })

    describe('#4 As a user, I need an API to subscribe to updates from an email address', () => {
        it('Add a valid subscriber to an existing user', done => {
            request
                .put('/api/v2/subscribers')
                .send({ requestor: 'lisa@example.com', target: 'john@example.com' })
                .then(response => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.eql({ success: true })
                    done()
                }).catch(done)
        })
    })

    describe('#5 As a user, I need an API to block updates from an email address', () => {
        it('Remove a valid subscriber from an existing user', done => {
            request
                .delete('/api/v2/subscribers')
                .send({ requestor: 'lisa@example.com', target: 'john@example.com' })
                .then(response => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.eql({ success: true })
                    done()
                }).catch(done)
        })
    })

    describe('#6 As a user, I need an API to retrieve all email addresses that can receive updates from an email address', () => {
        it('Get all valid subscribers of an existing user', (done) => {
            request
                .get('/api/v2/subscribers?sender=john@example.com&text=Hello World! kate@example.com')
                .then(response => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.eql({ success: true, recipients: ['andy@example.com', 'kate@example.com'] })
                    done()
                }).catch(done)
        })
    })

    after(done => {
        mongoose.disconnect().then(() => {
            done()
            serverInstance.close(() => {
                console.log('closed all instances')
            })
        })
    })

})
