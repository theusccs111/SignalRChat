
//First 3 lines are about setting up the transport type(WebSockets in our case)
//and HttpConnection.We provide the URL of the Hub and transport type.
debugger;
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

//After that, we start the connection.We listen to the Send event, which will happen once server
//triggers its Send method.When we get the message from the server, we just add it to the list.

connection.start().catch(err => console.error(err.toString()));
connection.on('Send', (nick, message) => {
    appendLine(nick, message);
});

//On form submit, we fetch the message from
//the input and simply invoke Send on server Hub sending in one parameter(message).
document.getElementById('frm-send-message').addEventListener('submit', event => {
    let message = $('#message').val();
    let nick = $('#spn-nick').text();

    $('#message').val('');

    connection.invoke('Send', nick, message);
    event.preventDefault();
});

//Do notice that we will see our own messages appended to the list of the message.Since we are
//broadcasting the message to everyone on the server, once we submit the form and it triggers Send on the server,
//    immediately after our client - side Send Hub method will be triggered and the message will be appended.

function appendLine(line, color) {
    let nameElement = document.createElement('strong');
    nameElement.innerText = `${nick}:`;

    let msgElement = document.createElement('em');
    msgElement.innerText = ` ${message}`;

    let li = document.createElement('li');
    li.appendChild(nameElement);
    li.appendChild(msgElement);

    $('#messages').append(li);
}

function continueToChat() {
    $('#spn-nick').text($('#nick').val());
    $('#entrance').hide();
    $('#chat').show();
}