const swaggerJsdoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')
const options={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'PrimeTrade API',
      version:'1.0.0',
      description:'REST API with Authentication & Task Management'
    },
    servers:[
      {url:'http://localhost:4000/api/v1',description:'Development Server'}
    ],
    components:{
      securitySchemes:{
        bearerAuth:{
          type:'http',
          scheme:'bearer',
          bearerFormat:'JWT'
        }
      }
    }
  },
  apis:['./src/routes/*.js']
}
const specs=swaggerJsdoc(options)
module.exports=(app)=>{
  app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))
  console.log('Swagger UI available at http://localhost:4000/api-docs')
}
