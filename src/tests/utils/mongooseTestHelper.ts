import mongoose, { ConnectOptions } from 'mongoose';

const connect = async (): Promise<void> => {
  const options: ConnectOptions = {
    // Remova as opções obsoletas ou não suportadas
  };

  try {
    await mongoose.connect('mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api', options);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error', error);
    throw error;
  }
};

const close = async (): Promise<void> => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection', error);
    throw error;
  }
};

const clear = async (): Promise<void> => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  } catch (error) {
    console.error('Error clearing database collections', error);
    throw error;
  }
};

export default {
  connect,
  close,
  clear,
};
