import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    if (mongoose.connection.readyState >= 1) {
      console.log('MongoDB connection already established.');
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectMongoDB;
