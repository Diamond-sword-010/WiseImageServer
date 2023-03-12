const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }
    const queue = 'clientMessages'
    const msg = '{"longitude": 3.4, "latitude": 5.4, "name": "idk"}'

    channel.assertQueue(queue, {
      durable: false
    })

    channel.sendToQueue(queue, Buffer.from(msg))
    console.log('Sent %s', msg)

    setTimeout(function () {
      connection.close()
      process.exit(0)
    }, 500)
  })
})
