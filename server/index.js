// const express = require("express")
// const app = express();

// const userRoutes = require("./Routes/User")
// const profileRoutes = require("./Routes/Profile")
// const paymentRoutes = require("./Routes/Payment")
// const courseRoutes = require("./Routes/Course")

// const {dbconnect} = require('./config/Database')
// const cookieParser = require('cookie-parser')
// const cors = require('cors')
// const {cloudinaryConnect} = require('./config/Cloudinary')
// const fileUpload = require('express-fileupload')
// require("dotenv").config();


// const PORT = process.env.PORT || 4000;

// dbconnect();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//     cors({
//         origin:"https://ktech-silk.vercel.app",
//         credentials : true
//     })
// )

//         // push karte wakt uncomment karna
//         // origin:"http://localhost:3000",


// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

// cloudinaryConnect();

// app.use("/api/v1/auth" , userRoutes);
// app.use("/api/v1/profile" , profileRoutes);
// app.use("/api/v1/course" , courseRoutes);
// app.use("/api/v1/payment" , paymentRoutes);


// app.get('/' , async(req ,res)=>{
//     return res.json({
//         success:true,
//         message : 'your server is up and running'
//     })
// });


// app.listen(PORT , ()=>{
//     console.log(`app listen at port ${PORT}`)
// });




// after correction 
const express = require("express");
const app = express();

const userRoutes = require("./Routes/User");
const profileRoutes = require("./Routes/Profile");
const paymentRoutes = require("./Routes/Payment");
const courseRoutes = require("./Routes/Course");

const { dbconnect } = require("./config/Database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/Cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Connect Database
dbconnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORRECT CORS CONFIG (LOCAL + VERCEL DONO KE LIYE)
const allowedOrigins = [
  "http://localhost:3000",
  "https://ktech-silk.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);

// File Upload Config
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect Cloudinary
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running 🚀",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
