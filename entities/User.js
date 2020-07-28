class User {
    constructor({phone, email, firstName, lastName, roles = []}) {
        this.phone = phone,
        this.email = email,
        this.firstName = firstName,
        this.lastName = lastName,
        this.roles = roles
    }

    key() {
        return {
            'PK': {'S': `USER#${this.phone}`},
            'SK': {'S': `USER#${this.phone}`},
        }
    }

    toItem() {
        return {
            ...this.key,
            'Type': {'S': 'User'},
            'Mobile Number':{ 'S': this.phone },
            'Email': { 'S': this.email },
            'First Name' : { 'S': this.firstName },
            'Last Name' : { 'S': this.lastName },
            'Roles' : { 'L': this.roles }
        }
    }
}

class UserEmail {
    constructor({ email, phone }) {
        this.email = email,
        this.phone = phone
    }

    key() {
        return {
            'PK': {'S': `USEREMAIL#${this.email}`},
            'SK': {'S': `USEREMAIL#${this.email}`},
        }
    }

    toItem() {
        return {
            ...this.key,
            'Type': {'S': 'UserEmail'},
            'Email': { 'S': this.email },
            'Mobile Number':{ 'S': this.phone }
        }
    }
}

const UserFromItem = (attributes) => {
    return new User ({
        phone: attributes.phone.S,
        email: attributes.email.S,
        firstName: attributes.firstName.S,
        lastName: attributes.lastName.S,
        roles: attributes.roles.L
    })
}

module.exports = {
    User
}