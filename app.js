const express = require('express');
const app = express();
const port = process.env.PORT || 4001;

app.get('/', (req, res) => {
  res.send('Hello from Full CI/CD + Kubernetes 🚀');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

