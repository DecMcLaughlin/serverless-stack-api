const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const { User, UserEmail } = require('../entities')

const createUser = async (user) => {
    try {
        const params = {
            TransactItems: [
                {
                    Put: {
                        Item: User.toItem(),
                        TableName: 'Global-incorrectstation-Users',
                        ConditionExpression: "attribute_not_exists(PK)"
                    },
                    Put: {
                        Item: UserEmail.toItem(),
                        TableName: 'Global-incorrectstation-Users',
                        ConditionExpression: "attribute_not_exists(PK)"
                    }
                }
            ]
        }

        await executeTransactWrite({ client: dynamodb, params })
        return {
            user
        }
    } catch (error) {
        console.log('Error creating User');
        console.log(error);
        let errorMessage = 'Could not create user';
        if (error.code === 'TransactionCanceledException') {
            if (error.cancellationReasons[0].code === 'ConditionalCheckFailed') {
                errorMessage = 'User with this mobile number already exists.'
            } else if (error.cancellationReasons[1].code === 'ConditionalCheckFailed') {
                errorMessage = 'User with this email already exists.'
            }
            return {
                errorMessage
            }
        }
    }
}

module.exports = {
    createUser
}