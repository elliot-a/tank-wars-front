import io from 'socket.io-client'

let playerNumber = 0;

export default {

  init(callback){

    this.socket = io('https://tank-wars-elliot.herokuapp.com/');
    //this.socket = io('http://localhost:3000/');

    this.socket.emit('player added');

    this.socket.on('playerNumber', player => {
      playerNumber = player;
      callback(playerNumber);
    });
  },

  killAll(){
    this.socket.close();
  },

  listen(func, event){
    this.socket.on(event, function(msg){
      console.log(msg);
      func(msg)
    });
  },

  sendData(data, event){
    this.socket.emit(event, data);
  }

}