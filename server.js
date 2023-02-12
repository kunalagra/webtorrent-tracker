const Server = require('bittorrent-tracker').Server

const server = new Server({
  udp: false, // enable udp server? [default=true]
  http: false, // enable http server? [default=true]
  ws: true, // enable websocket server? [default=true]
  stats: false, // enable web-based statistics? [default=true]
  trustProxy: false, // enable trusting x-forwarded-for header for remote IP [default=false]
})

// Internal http, udp, and websocket servers exposed as public properties.
server.on('error', function (err) {
  // fatal server error!
  console.log(err.message)
})

server.on('warning', function (err) {
  // client sent bad data. probably not a problem, just a buggy client.
  console.log(err.message)
})

server.on('listening', function () {
  // fired when all requested servers are listening

  // WS
  const wsAddr = server.ws.address()
  const wsHost = wsAddr.address !== '::' ? wsAddr.address : 'localhost'
  const wsPort = wsAddr.port
  console.log(`WebSocket tracker: ws://${wsHost}:${wsPort}`)

})


// start tracker server listening! Use 0 to listen on a random free port.

server.listen('8080')
// server.listen(port, hostname, () => {
//   // Do something on listening...
// })

