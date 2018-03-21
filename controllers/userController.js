import User from '../models/userModel'

// #1: As a user, I need an API to create a friend connection between two email addresses
export const connectFriends = (userOne, userTwo) => new Promise((resolve, reject) => {
    Promise.all([getOrCreateUser(userOne), getOrCreateUser(userTwo)])
        .then(results => {
            const [userOneResult, userTwoResult] = results

            userOneResult.addFriend(userTwoResult.email)
            userTwoResult.addFriend(userOneResult.email)

            Promise.all([
                userOneResult.save((err, updated) => err ? Promise.reject(err) : Promise.resolve(updated)),
                userTwoResult.save((err, updated) => err ? Promise.reject(err) : Promise.resolve(updated))
            ]).then((updatedUserOne, updatedUserTwo) => resolve(updatedUserOne, updatedUserTwo))
                .catch(err => reject(err))

        }).catch(err => reject(err))
})

const getOrCreateUser = emailToFind => new Promise((resolve, reject) => {
    User.findOne({ email: emailToFind })
        .then(result => {
            if (!result) {
                User.create({ email: emailToFind }, (err, createdUser) => err ? reject(err) : resolve(createdUser))
            } else {
                resolve(result)
            }
        }).catch(err => {
            reject(err)
        })
})

// #2: As a user, I need an API to retrieve the friends list for an email address
export const getFriends = emailToFind => new Promise((resolve, reject) => {
    User.findOne({ email: emailToFind })
        .then(user => {
            if (!user) { reject(emailToFind + ' not found in db') }
            resolve(user.getFriends())
        }).catch(err => {
            reject(err)
        })
})

// #3: As a user, I need an API to retrieve the common friends list between two email addresses
export const getCommonFriends = (userOneEmail, userTwoEmail) => new Promise((resolve, reject) => {
    Promise.all([getFriends(userOneEmail), getFriends(userTwoEmail)])
        .then(response => {
            const [userOneFriends, userTwoFriends] = response
            let commonFriends = []

            userOneFriends.forEach(userOneFriend => {
                if (userTwoFriends.findIndex(userTwoFriend => userOneFriend === userTwoFriend) !== -1) {
                    commonFriends.push(userOneFriend)
                }
            })
            resolve(commonFriends)
        }).catch(err => {
            reject(err)
        })
})

// user story 4: As a user, I need an API to subscribe to updates from an email address
export const subscribeToUser = (emailToFind, emailToSubscribe) => new Promise((resolve, reject) => {
    User.findOne({ email: emailToFind })
        .then(user => {
            if (!user) { reject(emailToFind + ' not found in db') }

            user.addSubscriber(emailToSubscribe)
            user.save((err, updated) => err ? reject(err) : resolve(updated))
        }).catch(err => {
            reject(err)
        })
})

// user story 5: As a user, I need an API to block updates from an email address
export const unsubscribeFromUser = (emailToFind, emailToUnsubscribe) => new Promise((resolve, reject) => {
    User.findOne({ email: emailToFind })
        .then(user => {
            if (!user) { reject(emailToFind + ' not found in db') }

            user.removeSubscriber(emailToUnsubscribe)
            user.save((err, updated) => err ? reject(err) : resolve(updated))
        }).catch(err => {
            reject(err)
        })
})

// user story 6: As a user, I need an API to retrieve all email addresses that can receive updates from an email address
export const getSubscribers = (emailToFind, textMentions) => new Promise(function (resolve, reject) {
    User.findOne({ email: emailToFind })
        .then(user => {
            if (!user) { return reject(emailToFind + ' not found in db'); }

            if (!textMentions) { return resolve(user.getSubscribers()); }

            const emails = textMentions.split(/\ +/).filter(t => isValidEmail(t))

            Promise.all(emails.map(email => subscribeToUser(emailToFind, email)))
                .then(() => User.findOne({ email: emailToFind }))
                .then(updatedUser => resolve(updatedUser.getSubscribers()))
                .catch(err => reject(err))

        }).catch(err => {
            reject(err)
        })
})