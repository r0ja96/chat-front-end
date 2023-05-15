import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ socket, id }) {

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const enterChat = (e) => {
        e.preventDefault();
        console.log(socket.id);
        socket.emit('enterChat', { id: socket.id, username });
        navigate('/chat');
    }

    return (
        <form onSubmit={enterChat}>
            <label>Name:</label>
            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} required />
            <input type="submit" value={'Enter'} />
        </form>
    );
}

export default Home;