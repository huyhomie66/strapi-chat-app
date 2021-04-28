"use strict";

const getUsersByUsernameAndRoom = async (username, name) => {
    try {
        const result = await strapi.services.users.find({
            username,
            // rooms: [{ name }],
        });
        console.info("result", result);
    } catch (error) {
        console.info(error);
    }
};

const findUserById = async (userId) =>
    await strapi.services.users.findOne({ id: userId });

const createUser = async ({ username, room, status, socketId }) => {
    console.info({ username, room, status, socketId });
    try {
        let rooms = [];

        const roomCreated = await strapi.services.room.create({ name: room });
        rooms.push(roomCreated);
        const user = await strapi.services.users.create({
            username,
            status,
            rooms,
            socketId,
        });
        return user;
    } catch (error) {
        console.info("error", error);
    }
};

const deleteUserBySocketId = async (socketId) =>
    await strapi.services.users.delete({ socketId });

const getUsersInRoom = async (name) => {
    try {
        const result = await strapi.services.users.find({ rooms: [{ name }] });
        console.info(result);
    } catch (error) {
        console.info(error);
    }
};

module.exports = {
    getUsersByUsernameAndRoom,
    createUser,
    findUserById,
    getUsersInRoom,
    deleteUserBySocketId,
};
