import React, {useEffect, useState} from 'react'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {setUserToken} from '../../../Globals/TokenStore'
import {UserRegisterMessage} from '../../../Impl/Messages/UserMessages/UserRegisterMessage'
import {ButtonTemplate, ButtonToSendMessage} from '../../../Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from '../../../Impl/TSMSPReply'
import {} from '../../../Utils/PageUtils/PageContainerUtil'
import {TextInputTemplate} from '../../../Utils/PageUtils/TextInputUtil'
import {checkIdentityNumber} from '../../../Utils/FormatUtils/IdentityNumberUtil'
import {checkPassword} from '../../../Utils/FormatUtils/PasswordUtil'
import {checkRealName} from '../../../Utils/FormatUtils/RealNameUtil'
import {ScreenTemplate} from '../../../Utils/PageUtils/PageContainerUtil'
import {Permission} from "../../../Types/UserMeta/Permission";
import {RealName} from "Types/UserMeta/RealName";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Password} from "Types/UserMeta/Password";

const registerStore= create(() => ({
    realName:'',
    password:'',
    identityNumber:'',
}))

const setUserName= (realName:string) => registerStore.setState({ realName })
const setPassword= (password:string) => registerStore.setState({ password })
const setRealName= (identityNumber:string) => registerStore.setState({ identityNumber })
const clearRegisterInfo= ()=> registerStore.setState(({realName: '', password: '', identityNumber: ''}))

export function RegisterPage({ navigation }: any){
    const {realName, password, identityNumber}=registerStore()

    const goBack=()=>navigation.navigate('Login')

    return <ScreenTemplate goBack={goBack}>
        <TextInputTemplate label={'真实姓名'} value={realName} onChangeText={(newText: string)=>setUserName(newText)}/>
        <TextInputTemplate label={'密码'}  value={password} onChangeText={(newText: string)=>setPassword(newText)} secureTextEntry={true}/>
        <TextInputTemplate label={'身份证号'} value={identityNumber} onChangeText={(newText: string)=>setRealName(newText)}/>

        {/*console.log('试图使用用户名'+userName+',密码'+password + ',真实姓名'+realName + '注册！')*/}
        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(checkRealName(realName) && checkPassword(password) && checkIdentityNumber(identityNumber))}
            checkElse = {()=>{
                alert('姓名、密码（至少六位）或身份证号不符要求！')
            }}
            toSendMessage ={new UserRegisterMessage(new RealName(realName), new Password(password), new IdentityNumber(identityNumber))}
            text = '注册'
            ifSuccess = {(reply:string)=>{
                setUserToken(reply)
                navigation.navigate('User.Overview')
                clearRegisterInfo()
            }}
        />
        <StatusBar style='auto' />
    </ScreenTemplate>
}