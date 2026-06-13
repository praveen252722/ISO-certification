import mongoose from "mongoose";

const cached = globalThis.__vjMongooseConnection ?? {
  connection: null,
  promise: null
};

globalThis.__vjMongooseConnection = cached;

export async function connectMongoDB(uri = process.env.MONGODB_URI) {
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  if (uri.includes("<db_password>") || uri.includes("YOUR_DATABASE_PASSWORD")) {
    throw new Error("MONGODB_URI still contains the placeholder password. Replace <db_password> with the real MongoDB Atlas database user password in backend/.env.local.");
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false
    }).catch((error) => {
      cached.promise = null;
      throw enhanceMongoError(error, uri);
    });
  }

  cached.connection = await cached.promise;
  return cached.connection;
}

export function sanitizeMongoUri(uri = "") {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
}

function enhanceMongoError(error, uri) {
  const message = error?.message ?? "";
  const code = error?.code;

  if (code === 8000 || message.toLowerCase().includes("bad auth") || message.toLowerCase().includes("authentication failed")) {
    error.message = [
      "MongoDB Atlas authentication failed.",
      "Check backend/.env.local MONGODB_URI:",
      "- Replace <db_password> with the real database user password.",
      "- URL-encode special characters in the password, such as @, #, %, /, :, or spaces.",
      "- Confirm the Atlas database user exists and has readWrite access.",
      `Current URI target: ${sanitizeMongoUri(uri)}`
    ].join(" ");
  } else if (message.toLowerCase().includes("querysrv") || message.toLowerCase().includes("enotfound")) {
    error.message = `MongoDB Atlas DNS/network connection failed. Check internet access and cluster hostname. Current URI target: ${sanitizeMongoUri(uri)}`;
  }

  return error;
}

export function getMongoConnectionState() {
  return {
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name
  };
}
