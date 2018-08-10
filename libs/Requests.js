let isTokenReceived = false;

module.exports.init = function (connection) {
  connection.on('message', function (message) {
    if (isTokenReceived) {
      console.log(message);
      if (message.type === 'utf8') {
        console.log("Received : " + message.utf8Data);
      }
      let receiveMsg = message.utf8Data;
      const salt = getSalt(receiveMsg);
      const iv = getIv(receiveMsg);
      const msg = receiveMsg.replace(salt, '').replace(iv, '');
      const decMsg = decryptMsg(salt, iv, t_token, msg);
      console.log(decMsg);
      //return (decMsg);
    }
    else {
      if (message.type === 'utf8') {
        console.log("Received Token !");
      }
      let receiveMsg = message.utf8Data;
      const resSalt = getSalt(receiveMsg);
      const resIv = getIv(receiveMsg);
  
      receiveMsg = receiveMsg.replace(resSalt, '').replace(resIv, '');
  
      const resObj = JSON.parse(decryptMsg(resSalt, resIv, pw, receiveMsg));
      let deToken = resObj.data.token;
      const deTokenSalt = getSalt(deToken);
      const deTokenIv = getIv(deToken);
  
      deToken = deToken.replace(deTokenSalt, '').replace(deTokenIv, '');
  
      const token = decryptMsg(deTokenSalt, deTokenIv, pw, deToken);
  
      console.log("TOKEN : " + token);
      isTokenReceived = true;
      //return (token);
    }
  });
}