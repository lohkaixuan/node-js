require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const ngrok = require("ngrok");
const authRoutes = require("./Route/Routes");
const eventRoutes = require("./Route/eventRoute");
const eventsRoutes = require("./Route/eventsRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use("", authRoutes);
app.use("/event", eventRoutes);
app.use("/events", eventsRoutes);


//https://mobile-test-b4a52.uc.r.appspot.com/
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT} http://localhost:${PORT}/`);
  // await startNgrok(PORT);
});

// async function startNgrok(port) {
//   try {
//     const url = await ngrok.connect({
//       addr: port,
//       authtoken: process.env.NGROK_AUTH_TOKEN, // Use token from .env
//     });
//     console.log(`🌍 Ngrok tunnel active: ${url}`);
//   } catch (err) {
//     console.error("❌ Error starting Ngrok:", err);
//   }
// }
