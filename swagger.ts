
import swaggerAutogen from 'swagger-autogen';


const doc = {
    info: {
        title: 'Eyekontact API',
        description: 'Eyekontact API',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/index.js', "./routes/users/index.js", "./routes/products/index.js", "./routes/orders/index.js", "./routes/webpage/index.js", "./routes/blogs/index.js"]

swaggerAutogen(outputFile, endpointsFiles, doc)