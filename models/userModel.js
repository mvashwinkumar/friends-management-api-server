import { db as mongoose } from '../utils/db'

// schema definition for user model
const UserSchema = new mongoose.Schema({
    email: String,
    friends: [String],
    subscribers: [String]
})

class UserClass {
    addFriend(emailToAdd) {
        if (!emailToAdd) return

        const isExistingFriend = this.friends.findIndex(friend => friend === emailToAdd) !== -1
        if (!isExistingFriend) {
            this.set({
                friends: [...this.friends, emailToAdd],
                subscribers: [...this.subscribers, emailToAdd]
            })
        }
    }

    getFriends() {
        return this.friends
    }

    addSubscriber(emailToAdd) {
        if (!emailToAdd) return

        const isExistingSubscriber = this.subscribers.findIndex(subscriber => subscriber === emailToAdd) !== -1
        if (!isExistingSubscriber) {
            this.set({
                subscribers: [...this.subscribers, emailToAdd]
            })
        }
    }

    removeSubscriber(emailToRemove) {
        if (!emailToRemove) return

        const existingSubscriberIdx = this.subscribers.findIndex(subscriber => subscriber === emailToRemove)
        if (existingSubscriberIdx !== -1) {
            var removed = this.subscribers.splice(existingSubscriberIdx, 1)
            this.set({
                subscribers: [...this.subscribers]
            })
        }
    }

    getSubscribers() {
        return this.subscribers
    }

    speak() {
        console.log('email :' + this.email);
        console.log('friends :' + JSON.stringify(this.friends));
        console.log('subscribers :' + JSON.stringify(this.subscribers));
    }
}

UserSchema.loadClass(UserClass)

export default mongoose.model('User', UserSchema)