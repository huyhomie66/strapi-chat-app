import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { socket } from "../config/web-sockets";

function Chat({ route }) {
    const navigation = useNavigation();
    const [listMessages, setListMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const { username, room, joinData } = route.params;
    useEffect(() => {
        if (Object.keys(joinData).length) {
            setListMessages([joinData]);

            socket.on("message", (message, error) => {
                setListMessages((prevMessages) => [...prevMessages, message]);
            });

            socket.on("roomInfo", ({ users }) => {
                setUsers(users);
            });
        } else {
            navigation.goBack()
        }
    }, [joinData]);


    const handleOnMessageType = (text) => {

        setMessage(text);
    };

    const handleOnMessageSend = (event) => {
        if (message) {
            sendMessage(message);
        }
    };



    const sendMessage = (message) => {
        socket.emit(
            "sendMessage",
            { userId: joinData.userData.id, message },
            (error) => {
                if (error) {
                    console.error(error);

                    navigation.goBack()
                }
            }
        );

        setMessage("");
    };

    return (
        <View>
            {listMessages.map((e, id) => {
                return <Text key={id}>{e?.text}</Text>
            })}
            <TextInput style={styles.input} onChangeText={text => handleOnMessageType(text)}></TextInput>
            <TouchableOpacity onPress={handleOnMessageSend}><Text>chat</Text></TouchableOpacity>
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
export default Chat;