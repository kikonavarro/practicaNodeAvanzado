const server = require('./bin/www')
const supertest = require ('supertest')
const mongoose = require ('mongoose')

const app = require ('./app')

const api = supertest(app)

test('anuncios necessitan token', async () => {
    await api
        .get('/api/anuncios')
        .expect(401) // nos debe dar unauthorized al no tener el token
    
})

afterAll((done) => {
    server.close()
    mongoose.connection.close()
    done();
});