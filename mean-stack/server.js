const http = require('http');
const debug = require("debug");
const app = require('./backend/app');

//make sure that a port is a valid number
const normalizePort = val =>{
  var port  = parseInt(val, 10);

  if(isNaN(port)){
    //named pipe
    return val;
  }

  if(port>=0){
    //port number
    return port;
  }

  return false;
}

const onError = error  =>{
  if(error.syscall !=="listen"){
    throw error;
  }

  const bind = typeof addr== "string" ? "pipe " + addr : "port " +port;

  switch(error.code){
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "requires elevated privileges" );
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListenning = () =>{
  const addr =  server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port "+ port;
  debug('Listening on' + bind);
};

const port = normalizePort(process.env.Port || "3000");

app.set('port', port);

const server =  http.createServer(app);

server.on("error", onError);

server.on("listening", onListenning);

server.listen(port);
