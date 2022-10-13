
export default {
    mongodb: {
        URI: 'mongodb://localhost:27017/login-node'
      },
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/login-node'
    },

    fileSystem: {
        path: './DB'
    }
}
