import React from 'react'
import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {TokenStore} from "Globals/TokenStore";
import {UserDeleteAccountMessage} from "Messages/UserDeleteAccountMessage"
import {APIUrl} from "Globals/GlobalVariables";
import {styles} from "../Utils/Styles";
import {ButtonToSendMessage} from "../Utils/PageUtils";

export function DeleteAccountPage({ navigation }: any){
    const {token} = TokenStore()
    return <View style={styles.container}>
        <ButtonToSendMessage
            toSendMessage = {new UserDeleteAccountMessage(token)}
            ifSuccess = {(replyJson:any)=>{
                alert("用户\"" + replyJson.message + "\"注销成功！");
                navigation.navigate('Root');
            }}
            text = '确认注销'/>
        <Pressable onPress={() => navigation.navigate('Trace')}>
            <Text style={styles.text}>返回</Text>
        </Pressable>

        <StatusBar style="auto" />
    </View>
}