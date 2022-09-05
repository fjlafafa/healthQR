import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {setUserToken} from 'Globals/TokenStore'
import {ButtonTemplate, ButtonToSendMessage} from 'Utils/PageUtils/ButtonUtil'
import {ScreenTemplate, ScrollTemplate} from 'Utils/PageUtils/PageContainerUtil'
import {UserRegisterMessage} from 'Messages/UserMessages/UserRegisterMessage'
import {RealName} from "Types/UserMeta/RealName";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Password} from "Types/UserMeta/Password";
import {DataTable} from "react-native-paper";
import {TextTemplate} from "Utils/PageUtils/TextUtil";
import {checkPermission, Permissions, Roles} from "Types/UserMeta/Roles";

//This is just a page for test
export function AdminPage({navigation}: any) {
    const goBack = () => navigation.navigate('Login')
    return <ScreenTemplate goBack={goBack}>
        <ScrollTemplate>
            <TextTemplate>{checkPermission(Roles.admin,Permissions.setAdmin)?1:0}</TextTemplate>
            <TextTemplate>{checkPermission(Roles.user,Permissions.setAdmin)?1:0}</TextTemplate>
            <TextTemplate>{checkPermission(Roles.government,Permissions.setRiskOfPlace)?1:0}</TextTemplate>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title sortDirection='descending'>
                        风险
                    </DataTable.Title>
                    <DataTable.Title numeric>省</DataTable.Title>
                    <DataTable.Title numeric>市</DataTable.Title>
                    <DataTable.Title numeric>区</DataTable.Title>
                    <DataTable.Title numeric>街道</DataTable.Title>
                    <DataTable.Title numeric>时间</DataTable.Title>
                </DataTable.Header>
            </DataTable>

            <ButtonTemplate
                onPress={() => navigation.navigate('AdminBrother')}
                text='返回副测试'/>

            <ButtonToSendMessage
                toSendMessage={new UserRegisterMessage(new RealName(''), new Password(''), new IdentityNumber(''))}
                text='注册空用户'
                ifSuccess={(reply: string) => {
                    setUserToken(reply)
                    navigation.navigate('User.Overview', {})
                }}/>
            <ButtonToSendMessage
            toSendMessage={new UserRegisterMessage(new RealName(new Date().getTime().toString()), new Password(''), new IdentityNumber(''))}
            text='注册全新用户'
            ifSuccess={(reply: string) => {
                setUserToken(reply)
                navigation.navigate('User.Overview', {})
            }}/>
            <ButtonTemplate
                onPress={() => navigation.navigate('User.Overview')}
                text={'免登录进入用户'}
            />
            <ButtonTemplate
                onPress={() => navigation.navigate('Admin.Overview')}
                text={'免登录进入管理员'}/>
            <ButtonTemplate
                onPress={() => navigation.navigate('ThirdParty.Overview')}
                text={'免登录进入第三方'}/>
            <ButtonTemplate
                onPress={() => navigation.navigate('Login')}
                text='返回登录界面'/>


            <StatusBar style='auto'/>
        </ScrollTemplate>
    </ScreenTemplate>
}