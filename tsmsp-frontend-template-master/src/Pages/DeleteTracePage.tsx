import React from 'react'
import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {TokenStore} from "Globals/TokenStore";
import {UserUpdateTraceMessage} from "Messages/UserUpdateTraceMessage";
import {UserGetTraceMessage} from "Messages/UserGetTraceMessage";
import {APIUrl} from "Globals/GlobalVariables";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const registerStore= create(() => ({
    newTrace: "",
    traceHistory:["暂无踪迹"]
}))

export const setNewTrace= (newTrace:string) => registerStore.setState({ newTrace })
export const setTraceHistory = (traceHistory:string[]) => registerStore.setState({traceHistory})

export function TracePage({ navigation }: any){
    const {token} = TokenStore()
    const {newTrace, traceHistory}=registerStore()
    return <View style={styles.container}>


        <TextInput placeholder={"删除轨迹地点名称"} value={newTrace} onChangeText={(newText)=>setNewTrace(newText)}/>


        <Pressable
            onPress={() => {
                fetch(APIUrl, {
                    method: "POST",
                    headers: {"Content-Type":"text/plain"},
                    body: JSON.stringify(new UserDeleteTraceMessage(token, newTrace))
                }).then((response) => response.json()).then((replyJson) => {
                    console.log(replyJson)
                    if (replyJson.status === 0) {
                        alert(replyJson.message)
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
            <Text> 删除记录 </Text>
        </Pressable>


        <Pressable onPress={() => navigation.navigate('Root')}>
            <Text>返回登录页</Text>
        </Pressable>


        <FlatList data={traceHistory} renderItem={({item}) => <Text>{item}</Text>} keyExtractor={(item : any, index : number) => index.toString()}/>
        {/*<Pressable*/}
        {/*    onPress={() => navigation.navigate('NotFound')}*/}
        {/*    style={({ pressed }) => ({*/}
        {/*        opacity: pressed ? 0.5 : 1,*/}
        {/*    })}>*/}
        {/*    <Text> 按我跳转 </Text>*/}
        {/*</Pressable>*/}
        <StatusBar style="auto" />
    </View>
}