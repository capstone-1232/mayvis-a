import mongoose from 'mongoose';

const connectMongoDB = async () => {
  console.log(process.env.NEXT_PUBLIC_MONGODB_URI);
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectMongoDB;
