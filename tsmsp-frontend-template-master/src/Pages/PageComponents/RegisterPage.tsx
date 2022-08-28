import React from 'react'
import {StatusBar} from "expo-status-bar";
import create from 'zustand'
import {setUserToken} from "../../Globals/TokenStore";
import {UserRegisterMessage} from "../../Impl/Messages/UserRegisterMessage";
import {ButtonTemplate, ButtonToSendMessage} from "../../Utils/PageUtils/PageButtonUtil";
import {TSMSPReply} from "../../Impl/TSMSPReply";
import {PageContainerTemplate} from "../../Utils/PageUtils/PageContainerUtil";
import {TextInputTemplate} from "../../Utils/PageUtils/TextInputUtil";

const registerStore= create(() => ({
    userName:"",
    password:"",
    realName:"",
}))

const setUserName= (userName:string) => registerStore.setState({ userName })
const setPassword= (password:string) => registerStore.setState({ password })
const setRealName= (realName:string) => registerStore.setState({ realName })
const clearRegisterInfo= ()=> registerStore.setState(({userName: "", password: "", realName: ""}))

export function RegisterPage({ navigation }: any){
    const {userName,password, realName}=registerStore()
    return <PageContainerTemplate>
        <TextInputTemplate placeholder={"真实姓名"} value={userName} onChangeText={(newText: string)=>setUserName(newText)}/>
        <TextInputTemplate placeholder={"密码"}  value={password} onChangeText={(newText: string)=>setPassword(newText)} secureTextEntry={true}/>
        <TextInputTemplate placeholder={"身份证号"}  value={realName} onChangeText={(newText: string)=>setRealName(newText)}/>

        {/*console.log("试图使用用户名"+userName+",密码"+password + ",真实姓名"+realName + "注册！")*/}
        <ButtonToSendMessage
            toSendMessage ={new UserRegisterMessage(userName, password, realName)}
            text = '注册'
            ifSuccess = {(replyJson: TSMSPReply)=>{
                setUserToken(replyJson.message);
                navigation.navigate("Trace");
                clearRegisterInfo();
            }}
        />
        <ButtonTemplate
            onPress = {()=>navigation.navigate("Root")}
            text = '返回登录界面'/>
        <StatusBar style="auto" />
    </PageContainerTemplate>
}