import User from '../models/userModel'

// #2: As a user, I need an API to retrieve the friends list for an email address
export const getFriends = emailToFind => new Promise(function (resolve, reject) {
    User.findOne({ email: emailToFind })
        .then(user => {
            if (!user) { reject(emailToFind + ' not found in db') }
            resolve(user.getFriends())
        }).catch(err => {
            reject(err)
        })
})