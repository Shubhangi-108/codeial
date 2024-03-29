//observer or receiver which recieves the message from incomming connection/listernier

module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    //recieve a connection and send back to client
    io.sockets.on('connection', function(socket){
        console.log('new connection received' , socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        //detect the user using on
        socket.on('join_room' , function(data){
            console.log('user joined the room' , data);
            socket.join(data.chatroom);


            io.in(data.chatroom).emit('user_joined' , data);
            // console.log('user joined the room' , socket.id);
        });

        //detecting the message

        socket.on('send_message' , function(data){
            io.in(data.chatroom).emit('receive_message' , data);
            console.log('server recieved message')
        });
    });
}
