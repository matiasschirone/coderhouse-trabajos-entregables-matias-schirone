
export default {
    mongoRemote: {
        client: 'mongodb',
        cnxStr: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`
    },

    fileSystem: {
        path: './DB'
    }
}
