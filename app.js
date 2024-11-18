const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs'); // Import ejs
const app = express();
const path = require('path');

// Initialize Firebase Admin SDK with your service account credentials
// const serviceAccount = require('./transitrace-e6a39-firebase-adminsdk-82k0g-70df591990.json'); // Replace with your service account key file
const router = require('./router/router');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://transitrace-e6a39-default-rtdb.firebaseio.com" // Replace with your database URL
// });

// const db = admin.database();
// const driverRef = db.ref('driver');
// const busListRef = db.ref('bus_list');

app.use('/css', express.static(path.resolve(__dirname, 'views/css')));
app.use('/js', express.static(path.resolve(__dirname, 'views/js')));
app.use('/scss', express.static(path.resolve(__dirname, 'views/scss')));
app.use('/vendor', express.static(path.resolve(__dirname, 'views/vendor')));
app.use('/IMG', express.static(path.resolve(__dirname, "views/img")));

// const fs = admin.firestore();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/",router)

// Route to render the form
// app.get('/deletebus',(req,res)=>{
//     res.render('deletebus',{bus:null});
// })


// app.get('/deletebus',(req,res)=>{
//     res.render('deletebus', { bus: null });
// });
// app.get('/updatebus',(req,res)=>{
//     res.render('updatebus', { bus: null });
// });
// app.get('/addbus',(req,res)=>{
//     res.render('addbus')
// });
// app.get('/searchbus',(req,res)=>{
//     res.render('searchbus', { bus: null });
// });
// Route to render the updatedriver page

// app.get('/deletedriver', (req, res) => {
//     res.render('deletedriver', { user: null });
// });
// Route to handle searching for a driver by phone number

// app.get('/complaints', async (req, res) => {
//     try {
//        const complaintsSnapshot = await fs.collection('complaints').get();
//        const complaints = complaintsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//        res.json(complaints);
//     } catch (error) {
//        console.error('Error fetching complaints:', error);
//        res.status(500).send('Internal Server Error');
//     }
//    });

// Route to render the users page
app.get('/users', async (req, res) => {
    try {
        const driverRef = db.ref('driver');

        driverRef.on('value', (snapshot) => {
            const drivers = snapshot.val();
            const driversArray = Object.values(drivers || {});

            res.render('users', { drivers: driversArray });
        }, (error) => {
            console.error('Error fetching data: ', error);
            res.status(500).send('Internal Server Error');
        });
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/complaints', async (req, res) => {
//     try {
//         // Fetch complaints from Firestore
//         const complaintsSnapshot = await fs.collection('complaints').get();
//         const complaints = complaintsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         res.render('complaints', {complaints});
//     } catch (error) {
//         console.error('Error fetching complaints:', error);
//         res.status(500).json({ error: 'Internal Server Error', message: error.message });
//     }
// });


// app.get('/feedback', async (req, res) => {
//     try {
//         const feedbackSnapshot = await fs.collection('feedback').get();
//         const feedback = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         res.render('feedback',{feedback});
//     } catch (error) {
//         console.error('Error fetching feedback:', error);
//         res.status(500).json({ error: 'Internal Server Error', message: error.message });
//     }
// });
// app.get('/emergency', async (req, res) => {
//     try {
//         const emergencySnapshot = await fs.collection('emergency').get();
//         const emergency = emergencySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//        // res.status(200).json({emergency});
//         res.render('emergency',{emergency});
//     } catch (error) {
//         console.error('Error fetching feedback:', error);
//         res.status(500).json({ error: 'Internal Server Error', message: error.message });
//     }
// });


// Listen on the specified port
const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Route to search for a driver to update
// app.post('/search_update_driver', (req, res) => {
//     const busNumber = req.body.busNumber;
//     if (!busNumber) {
//         return res.status(400).json({ error: 'Bus number is required.' });
//     }
    
//     busListRef.once('value', (snapshot) => {
//         const buses = snapshot.val();
//         let foundBus = null;
    
//         if (buses) {
//             Object.values(buses).forEach((bus) => {
//                 if (bus.busNumber === busNumber) {
//                     foundBus = bus;
//                 }
//             });
//         }
    
//         if (foundBus) {
//             res.render('updatebus', { bus: foundBus });
//         } else {
//             res.render('updatebus', { bus: null });
//         }
//     });
// });



// app.post('/search_bus', async (req, res) => {
//     const busNumber = req.body.busNumber;
//     if (!busNumber) {
//         return res.status(400).json({ error: 'Bus number is required.' });
//     }
    
//     busListRef.once('value', (snapshot) => {
//         const buses = snapshot.val();
//         let foundBus = null;
    
//         if (buses) {
//             Object.values(buses).forEach((bus) => {
//                 if (bus.busNumber === busNumber) {
//                     foundBus = bus;
//                 }
//             });
//         }
    
//         if (foundBus) {
//             res.render('searchbus', { bus: foundBus });
//         } else {
//             res.render('searchbus', { bus: null });
//         }
//     });
    
// });


// Route to update driver details
// app.post('/update_driver', async (req, res) => {
//     try {
//         const updatedData = req.body;
//         const phone = req.body.originalPhone; // Assuming you're sending the phone number in the request body

//         if (!phone) {
//             return res.status(400).json({ error: 'Phone number is required.' });
//         }

//         // Find the driver by phone number to get the unique key
//         const driverSnapshot = await driverRef.orderByChild('Phone').equalTo(phone).once('value');
//         if (!driverSnapshot.exists()) {
//             return res.status(404).json({ error: 'Driver not found.' });
//         }

//         // Assuming there's only one driver with the given phone number
//         const driverKey = Object.keys(driverSnapshot.val())[0];
//         await driverRef.child(driverKey).update(updatedData); // Update the driver using the unique key

//         console.log('Driver details updated successfully:', updatedData);
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error updating driver details:', error);
//         res.status(500).send('Internal Server Error');
//     }
//});


// app.post('/delete_driver', async (req, res) => {
//     try {
//         const phone = req.body.originalPhone; // Assuming you're sending the phone number in the request body
//         if (!phone) {
//             return res.status(400).json({ error: 'Phone number is required.' });
//         }

//         // Find the driver by phone number
//         const driverSnapshot = await driverRef.orderByChild('Phone').equalTo(phone).once('value');
//         if (!driverSnapshot.exists()) {
//             return res.status(404).json({ error: 'Driver not found.' });
//         }

//         // Assuming there's only one driver with the given phone number
//         const driverKey = Object.keys(driverSnapshot.val())[0];
//         await driverRef.child(driverKey).remove(); // Delete the driver

//         console.log('Driver deleted successfully');
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error deleting driver:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/delete_bus', async (req, res) => {
//     try {
//         const busNumber = req.body.originalBusNumber; // Assuming you're sending the original bus number in the request body
//         if (!busNumber) {
//             return res.status(400).json({ error: 'Bus number is required.' });
//         }

//         // Find the bus by bus number
//         const busSnapshot = await busListRef.orderByChild('busNumber').equalTo(busNumber).once('value');
//         if (!busSnapshot.exists()) {
//             return res.status(404).json({ error: 'Bus not found.' });
//         }

//         // Assuming there's only one bus with the given bus number
//         const busKey = Object.keys(busSnapshot.val())[0];
//         await busListRef.child(busKey).remove(); // Delete the bus

//         console.log('Bus deleted successfully');
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error deleting bus:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// app.post('/search_delete_driver', (req, res) => {
//     const phone = req.body.phone;
//     if (!phone) {
//         return res.status(400).json({ error: 'Phone number is required.' });
//     }

//     driverRef.once('value', (snapshot) => {
//         const drivers = snapshot.val();
//         let foundDriver = null;

//         if (drivers) {
//             Object.values(drivers).forEach((driver) => {
//                 if (driver.Phone === phone) {
//                     foundDriver = driver;
//                 }
//             });
//         }

//         if (foundDriver) {
//             res.render('deletedriver', { user: foundDriver });
//         } else {
//             res.render('deletedriver', { user: null });
//         }
//     });
// });




// app.post('/search_delete_bus', (req, res) => {
//     const busNumber = req.body.busNumber;
//     if (!busNumber) {
//         return res.status(400).json({ error: 'Bus number is required.' });
//     }

//     busListRef.once('value', (snapshot) => {
//         const buses = snapshot.val();
//         let foundBus = null;

//         if (buses) {
//             Object.values(buses).forEach((onebus) => {
//                 if (onebus.busNumber === busNumber) {
//                     foundBus = onebus;
//                 }
//             });
//         }

//         if (foundBus) {
//             res.render('deletebus', { bus: foundBus });
         
//         } else {
//             res.render('deleteebus', { bus: null });
//         }
//     });
// });



// app.post('/addbus', (req, res) => {
//     const newBus = req.body;
//     const newBusKey = busListRef.push().key;

//     busListRef.child(newBusKey).set(newBus)
//         .then(() => {
//             res.status(200).send({ message: 'Bus added successfully', busKey: newBusKey });
//         })
//         .catch((error) => {
//             console.error('Error adding bus:', error);
//             res.status(500).send({ message: 'Error adding bus', error: error });
//         });
// });
// app.post('/update_bus', async (req, res) => {
//     try {
//         const updatedData = req.body;
//         const busNumber = req.body.originalBusNumber; // Assuming you're sending the original bus number in the request body

//         if (!busNumber) {
//             return res.status(400).json({ error: 'Bus number is required.' });
//         }

//         // Find the bus by bus number to get the unique key
//         const busSnapshot = await busListRef.orderByChild('busNumber').equalTo(busNumber).once('value');
//         if (!busSnapshot.exists()) {
//             return res.status(404).json({ error: 'Bus not found.' });
//         }

//         // Assuming there's only one bus with the given bus number
//         const busKey = Object.keys(busSnapshot.val())[0];
//         await busListRef.child(busKey).update(updatedData); // Update the bus using the unique key

//         console.log('Bus details updated successfully:', updatedData);
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error updating bus details:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// app.post('/search_update_bus', (req, res) => {
//     const busNumber = req.body.busNumber;
//     if (!busNumber) {
//         return res.status(400).json({ error: 'Bus number is required.' });
//     }

//     busListRef.once('value', (snapshot) => {
//         const buses = snapshot.val();
//         let foundBus = null;

//         if (buses) {
//             Object.values(buses).forEach((onebus) => {
//                 if (onebus.busNumber === busNumber) {
//                     foundBus = onebus;
//                 }
//             });
//         }

//         if (foundBus) {
//             res.render('updatebus', { bus: foundBus });
         
//         } else {
//             res.render('updatebus', { bus: null });
//         }
//     });
// });

