class ChatEngine {
    constructor( chatBoxId , userEmail , userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;

        //initiate a connection
        this.socket = io.connect('http://localhost:3000' , {
            transports: ['websocket'],
            // Specify CORS configuration here
            withCredentials: false,
            extraHeaders: {
                "Access-Control-Allow-Origin": "http://localhost:8000"
            }
        });
        //fires the connection in client side in line number 6 in chat_socket.js file

        if( this.userEmail){
            this.connectionHandler();
        }
    }


    //this handler have the to and from connection between the serevr/observer nd the users
    connectionHandler(){

        let self = this;
        

        this.socket.on('connect', function(){
            // console.log('connection establised using sockets...');

            self.socket.emit('join_room' , {
                user_email: self.userEmail,
                user_name: self.userName,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined' , function(data){
                console.log(data);
            });
        })


        //whenever i send the message
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            $('#chat-message-input').val('');


            if ( msg != '' ){

                $.ajax({
                    url: '/chat/messages', // Endpoint to handle message creation
                    method: 'POST',
                    data: {
                        message: msg,
                        user_email: self.userEmail,
                        user_name: self.userName,
                        chatroom: 'codeial'
                    },
                    success: function(response) {
                        console.log('Message sent successfully');
                    },
                    error: function(err) {
                        console.error('Error sending message:', err);
                    }
                });

                
                self.socket.emit('send_message' , {
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.userName,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message' , function(data){
            console.log('message received' , data);

            let newMess = $('<li>');

            let messageType = 'other-message';

            if( data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMess.append($('<span>' , {
                'html' : data.message
            }))

            newMess.append($('<sub>', {
                'html': data.user_name
            }));

            newMess.addClass(messageType);

            $('#chat-messages-list').append(newMess);
        });
    }
}

