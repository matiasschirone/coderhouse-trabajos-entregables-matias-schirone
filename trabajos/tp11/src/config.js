
export default {

    mongodb: {
        url: 'mongodb://localhost:27017/node-login-passport-local',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    },

    fileSystem: {
        path: './DB'
    }
}
