import mongoose from 'mongoose';

async function connectToDatabase() {
    const uri = 'mongodb+srv://leonardo0294:wdwPqZxDPHKyc5jp@cluster0.o1znu.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0';

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
    }
}

export default connectToDatabase;
