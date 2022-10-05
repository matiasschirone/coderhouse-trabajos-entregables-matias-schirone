
export default {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://matias:Coder1234@cluster0.sngjgjx.mongodb.net/?retryWrites=true&w=majority'
    },
    fileSystem: {
        path: './DB'
    }
}
