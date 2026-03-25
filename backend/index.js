const app = require('./src/app');
const { port } = require('./src/config/appConfig');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
