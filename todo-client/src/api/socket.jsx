import io from 'socket.io-client'

export default io.connect("ws://localhost:4000", {
    withCredentials: true,
})