import {Token} from "Types/UserMeta/Token";
import {SendData} from "Utils/SendDataUtil";
import {UserCheckRoleMessage} from "Messages/UserMessages/UserCheckRoleMessage";
import {Roles} from "Types/UserMeta/Roles";

export function UserLogin(navigation:any,token:Token,clearInfo=()=>{}){

    SendData(new UserCheckRoleMessage(token), (reply: Roles) => {

        if (reply === Roles.normal) {
            navigation.navigate('User.Overview')
        } else {
            navigation.navigate('SuperUser.InfoQRCodePage')
        }
        clearInfo()
    })
}