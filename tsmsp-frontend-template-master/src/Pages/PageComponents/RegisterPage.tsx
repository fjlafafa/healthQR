import React from 'react'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {setUserToken} from 'Globals/TokenStore'
import {UserRegisterMessage} from '../../Impl/Messages/UserMessages/UserRegisterMessage'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {TSMSPReply} from '../../Impl/TSMSPReply'
import {} from 'Utils/PageUtils/PageContainerUtil'
import {TextInputTemplate} from 'Utils/PageUtils/TextInputUtil'
import {checkIdentityNumber} from 'Utils/FormatUtils/IdentityNumberUtil'
import {checkPassword} from 'Utils/FormatUtils/PasswordUtil'
import {checkRealName} from 'Utils/FormatUtils/RealNameUtil'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'

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
    return <ScreenTemplate>
        <TextInputTemplate placeholder={'真实姓名'} value={realName} onChangeText={(newText: string)=>setUserName(newText)}/>
        <TextInputTemplate placeholder={'密码'}  value={password} onChangeText={(newText: string)=>setPassword(newText)} secureTextEntry={true}/>
        <TextInputTemplate placeholder={'身份证号'} value={identityNumber} onChangeText={(newText: string)=>setRealName(newText)}/>

        {/*console.log('试图使用用户名'+userName+',密码'+password + ',真实姓名'+realName + '注册！')*/}
        <ButtonToSendMessage
            checkBeforeSendMessage = {()=>(checkRealName(realName) && checkPassword(password) && checkIdentityNumber(identityNumber))}
            checkElse = {()=>{
                alert('姓名、密码（至少六位）或身份证号不符要求！')
            }}
            toSendMessage ={new UserRegisterMessage(realName, password, identityNumber)}
            text = '注册'
            ifSuccess = {(reply:string)=>{
                setUserToken(reply)
                navigation.navigate('Overview',{})
                clearRegisterInfo()
            }}
        />
        <ButtonTemplate
            onPress = {()=>navigation.navigate('Login',{})}
            text = '返回登录界面'/>
        <StatusBar style='auto' />
    </ScreenTemplate>
}