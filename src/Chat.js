import { useState } from "react";

function ChatBox({ user, socket }) {

    const { id, username } = user;
    const [msgInput, setMsgInput] = useState('');
    const [message, setMessage] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', { to: `${socket.id}${id}`, msg: msgInput });
        setMessage([...message, { me: true, msg: msgInput }]);
    }

    socket.on(`${id}${socket.id}`, (data) => {
        const { msg } = data;
        setMessage([...message, { me: false, msg }]);
    });

    return (
        <form onSubmit={sendMessage} style={{ padding: "1rem" }}>
            <h1>{username}</h1>
            <div style={{ width: "300px", height: "150px", border: "black solid 3px", overflowY: "auto" }}>
                {
                    message.map(({ msg }, i) => {
                        return (<p key={i}>{msg}</p>);
                    })
                }
            </div>
            <input type="text" value={msgInput} onChange={(e) => { setMsgInput(e.target.value) }} required />
            <input type="submit" value={'Send'} />
        </form>
    );
}

function Chat({ socket }) {


    const [allUsers, setAllUsers] = useState([]);

    socket.on('newUser', (data) => {
        setAllUsers(data.allUsers);
    });

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {
                allUsers.map((user) => {

                    if (socket.id == user.id) {
                        return null;
                    }

                    return (<ChatBox key={user.id} user={user} socket={socket} />);
                })
            }
        </div>
    );
}

export default Chat;