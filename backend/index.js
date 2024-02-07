const server = require("./src/server.js");
const { conn, isLocal } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
server.listen(PORT)
})
.catch(error => console.error(error))