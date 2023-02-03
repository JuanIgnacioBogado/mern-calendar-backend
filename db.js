import mongoose from 'mongoose';

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`DB: ${mongoose.connection.name} is connected`);
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing database')
  }
})();
