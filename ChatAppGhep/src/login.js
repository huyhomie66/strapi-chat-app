import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import { socket } from "../config/web-sockets";

function Login(props) {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [error, setError] = useState("");


    const handleOnClick = () => {
        if (username && room) {
            socket.emit("join", { username, room }, (error) => {
                if (error) {
                    console.info("err", error);
                    setError(error);
                    console.error("error", error);
                }
                socket.on("welcome", (data) => {
                    // console.log('data', data);
                    props.navigation.navigate('Chat', { username: data.userData.username, room: data.userData.rooms, joinData: data })
                });
            });
        }
    };
    const handleOnChange = (text, setter) => {
        const value = text;
        setter(value);
    };
    return (
        <View>

            <TextInput
                style={styles.input}
                onChangeText={text => handleOnChange(text, setUsername)}
            />
            <TextInput
                style={styles.input}
                onChangeText={text => handleOnChange(text, setRoom)}
            />

            <TouchableOpacity
                onPress={handleOnClick} >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});
export default Login;