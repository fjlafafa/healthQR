import React from 'react'
import Text from 'react-native-paper'
import {StatusBar} from 'expo-status-bar'
import create from 'zustand'
import {setUserToken} from 'Globals/TokenStore'
import {UserLoginMessage} from 'Impl/Messages/UserLoginMessage'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {TextClock} from 'Utils/PageUtils/ClockUtil'
import {AllowAdmin} from 'Globals/GlobalVariables'
import {TSMSPReply} from 'Impl/Replies/TSMSPReply'
import {TextInputTemplate} from 'Utils/PageUtils/TextInputUtil'
import {ScreenTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {TextTemplate} from '../../Utils/PageUtils/TextUtil'
import {Dimensions, View} from 'react-native'
import {Appbar, Button, Dialog, Paragraph, Portal, Provider} from 'react-native-paper'
import {myscreen, SCREEN_WIDTH} from '../../Utils/Styles'
import {PagesID} from "../PagesStack";

//const image = { uri: 'https://zh-hans.reactjs.org/logo-og.png' }

// import LoginIcon from '@mui/icons-material/Login'

const loginStore= create(() => ({
    userName:'',
    password:''
}))

const setUserName= (userName:string) => loginStore.setState({ userName })
const setPassword= (password:string) => loginStore.setState({ password })
const clearLoginInfo= ()=> loginStore.setState(({userName: '', password: ''}))

export function LoginPage({ navigation }: any){
    const {userName,password}=loginStore()
/*
    const [visible, setVisible] = React.useState(true)

    const hideDialog = () => setVisible(false)*/
    return (<ScreenTemplate>
        {/*<ImageBackground source={image} style={styles.backgroundImage}></ImageBackground>*/}
            {/*<Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>This is a title</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>This is simple dialog</Paragraph>
                    </Dialog.Content>
                </Dialog>
            </Portal>*/}

        <TextInputTemplate placeholder={'真实姓名'} value={userName} onChangeText={(newText: string)=>setUserName(newText)}/>
        <TextInputTemplate placeholder={'密码'}  value={password} onChangeText={(newText: string)=>setPassword(newText)} secureTextEntry={true}/>
            <ButtonToSendMessage
            icon = 'login'
            toSendMessage ={new UserLoginMessage(userName, password)}
            ifSuccess = {(replyJson:TSMSPReply)=>{
                setUserToken(replyJson.message)
                navigation.navigate(PagesID.Overview,{})
                clearLoginInfo()
            }}
            text = '登录'
        />
        {/*<LoginIcon fontSize='large' > </LoginIcon>*/}
        <ButtonTemplate
            onPress = {()=> {
                navigation.navigate(PagesID.Register,{})
                clearLoginInfo()
            }}
            text = '注册'
        />
        {
            //管理员界面唯一入口
            AllowAdmin?
            <ButtonTemplate
                onPress={
                () => {
                    navigation.navigate(PagesID.Admin,{})
                    clearLoginInfo()
                }
            }
                text='管理员'
            /> :null
        }

        <StatusBar style='auto' />
    </ScreenTemplate>)
}