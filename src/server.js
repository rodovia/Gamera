//PRecisamos de um servidor local para que o repl.it não mate o processo quando fechar a aba

var http = require('http');

http.createServer(function (req, res) {
  res.write("Server pronto");
  res.end();
}).listen(8080);