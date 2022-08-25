import React from 'react'
import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {TokenStore} from "Globals/TokenStore";
import {UserDeleteAccountMessage} from "Messages/UserDeleteAccountMessage"
import {APIUrl} from "Globals/GlobalVariables";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export function DeleteAccountPage({ navigation }: any){
    const {token} = TokenStore()
    return <View style={styles.container}>

        <Pressable
            onPress={() => {
                alert("Warning: 注销用户后不可恢复，请谨慎选择！")
                fetch(APIUrl, {
                    method: "POST",
                    headers: {"Content-Type":"text/plain"},
                    body: JSON.stringify(new UserDeleteAccountMessage(token))
                }).then((response) => response.json()).then((replyJson) => {
                    console.log(replyJson)
                    if (replyJson.status === 0) {
                        alert("用户\"" + replyJson.message + "\"注销成功！")
                        navigation.navigate('Root')
                    }
                    else {
                        alert(replyJson.message)
                    }
                })
                    .catch((e) => console.log(e))
            }}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
            <Text> 确认注销 </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Trace')}>
            <Text>返回</Text>
        </Pressable>

        <StatusBar style="auto" />
    </View>
}