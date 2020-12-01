const app = require("./server");

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server Listening on Port: ${port}`);
