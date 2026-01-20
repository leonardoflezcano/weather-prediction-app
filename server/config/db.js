import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export const clearDatabase = async () => {
  try {
    const collections = await mongoose.connection.db.collections();
    
    // Iterar sobre todas las colecciones y eliminar los documentos
    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(`All documents removed from the ${collection.collectionName} collection`);
    }

    console.log('All data cleared from the database');
  } catch (err) {
    console.error('Error clearing the database:', err);
  }
};

export default connectDB;
