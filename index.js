const express = require('express');
const db = require('./firebase-config');
const app = express();

app.set('view engine', 'ejs');

app.get('/employees', async (req, res) => {
  const querySnapshot = await db.collection('employees').get();
  const employees = querySnapshot.docs.map(doc => doc.data());
  res.render('employees', { employees });
});
router.get('/dashboard',getadmindashboard = async (req, res) => {
  try {
    const counts = {};

    for (let i = 0; i < collections.length; i++) {
      const snapshot = await db.ref(collections[i]).once('value');
      counts[`count${i + 1}`] = snapshot.numChildren();
    }

    res.render('admindashboard', { counts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const admin = require('firebase-admin');

// const serviceAccount = require('./transitrace-e6a39-firebase-adminsdk-82k0g-70df591990.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://transitrace-e6a39-default-rtdb.firebaseio.com",
//   });
//   const db = admin.database();
//   const categoriesRef = db.ref('categories');

  
// exports.getadmindashboard = async (req, res) => {
//   try {
//     const counts = {};

//     for (let i = 0; i < collections.length; i++) {
//       const snapshot = await db.ref(collections[i]).once('value');
//       counts[`count${i + 1}`] = snapshot.numChildren();
//     }

//     res.render('admindashboard', { counts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };