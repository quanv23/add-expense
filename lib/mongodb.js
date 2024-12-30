import mongoose from 'mongoose'; // import mongoose
// import dotenv from 'dotenv'; // import dotenv to use environment variables
// dotenv.config();

let isConnected = false;

// Exports connection function to allow connections to DB
const uri = process.env.URI;
export default async function connectDB() {
	// Cancels connection if already connected
	if (isConnected) {
		console.log(`MongoDB is already connected`);
		return;
	}
	// Attempts to connect
	try {
		await mongoose.connect(uri);
		console.log('Connected to MongoDB');
	} catch (e) {
		console.error(e);
	}
	isConnected = true;
}
