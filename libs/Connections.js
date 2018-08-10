module.exports.init = function (client) {
  return new Promise((resolve) => {
    client.connect('ws://localhost:8880/', '');
    client.on('connect', function (connection) {
      resolve(connection);
    });
  });
}
