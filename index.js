const express = require('express'); 
const app = express();

require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

const swaggerDocs = require("./swagger"); 

app.use(express.json());

const userManagment = require('./routes/authRoutes');  
const event = require('./routes/eventRoutes');  
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api', userManagment);  
app.use('/api', event); 
app.use('/api', bookingRoutes); 

swaggerDocs(app); 

const port = process.env.PORT || 5000;
app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}`); 
});
