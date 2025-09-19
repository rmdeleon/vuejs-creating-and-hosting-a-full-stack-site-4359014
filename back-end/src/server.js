import express, { application } from 'express';
import {MongoClient} from 'mongodb';
import path from 'path';

async function start() {
  const client = new MongoClient(`mongodb+srv://rmdeleon_db_user:4md9fiBVtvoFK3gf@cluster0.rgfljse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
  await client.connect();
  const db = client.db('fsv-db');

  const app = express();
  app.use(express.json());

  app.use('/images', express.static(path.join(__dirname, '../assets')));
  
  app.get('/api/products', async (req, res) => {
    const products = await db.collection('products').find({}).toArray();
  
    res.json(products);
  });
  
  async function populateCartIds(ids) {
    return Promise.all(ids.map(id => db.collection('products').findOne({id})));
  }
  
  app.get('/api/users/:userId/cart', async (req, res) => {
    const user = await db.collection('users').findOne({id:req.params.userId});
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });
  
  app.get('/api/products/:productId', async (req, res) => {
    const products = await db.collection('products').findOne({id:req.params.productId});
    res.json(products);
  });
  
  app.post('/api/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    const existingUser = await db.collection('users').findOne({id:userId});

    if (!existingUser) {
      await db.collection('users').insertOne({id:userId, cartItems: []});
    }

    await db.collection("users").updateOne({id:userId}, {
      $addToSet: {cartItems: productId}
    });

    const user = await db.collection('users').findOne({id:req.params.userId});
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });
  
  app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    await db.collection("users").updateOne({id:userId}, {
      $pull: {cartItems: productId}
    });

    const user = await db.collection('users').findOne({id:userId});
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  })
  
  app.listen(8000, () => {
    console.log('Server is listening on port 8000');
  });
}
start();