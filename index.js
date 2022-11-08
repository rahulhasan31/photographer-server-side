const express= require('express')
const app= express()
const cors= require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port= process.env.PORT || 5000
require('dotenv').config()

// middel wares
app.use(cors())
app.use(express.json())


console.log(process.env.USER_DB);



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.sayatpw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection=client.db('photographer').collection('services')
        const reviewCollection= client.db('photographer').collection('review')
        app.get('/services', async (req, res)=>{
            const query= {}
            const cursor= serviceCollection.find(query)
            const services= await cursor.toArray()
            res.send(services)
        })
        app.get('/', async (req, res)=>{
            const query= {}
            const cursor= serviceCollection.find(query)
            const services= await cursor.limit(3).toArray()
            res.send(services)
        })
        
        app.get('/services/:id', async (req, res)=>{
            const id= req.params.id
            const query= {_id : ObjectId(id)}
            const  service= await serviceCollection.findOne(query)
            res.send(service)
        })
        
    }

    finally{

    }
}

run().catch(e=>{console.error(e)})












app.listen(port, ()=>{console.log(`server running${port}`)})