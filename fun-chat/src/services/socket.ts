const socket = new WebSocket('ws://localhost:4000');
socket.onopen = () => console.log('Connection is open');

export default socket;
