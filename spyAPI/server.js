const app = require('./app');
const cors = require('cors');
const config = require('./config/config');

// Enable CORS before defining any routes
app.use(cors());

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
