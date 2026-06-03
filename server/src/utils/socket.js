// Shared Socket.io instance — set once in server.js, imported by controllers

let io = null;

export const setIO = (ioInstance) => {
    io = ioInstance;
};

export const getIO = () => {
    if (!io) {
        console.warn('[SOCKET] io instance not initialized yet');
    }
    return io;
};
