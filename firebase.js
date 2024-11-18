const admin = require('firebase-admin');

// Fetch the service account key JSON file contents
const serviceAccount = require('./transitrace-e6a39-firebase-adminsdk-82k0g-70df591990.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: "https://transitrace-e6a39-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.firestore();

module.exports = db;
