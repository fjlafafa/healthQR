import {TSMSPMessage} from "Messages/TSMSPMessage";
import {Token} from "Types/UserMeta/Token";
import {Permission} from "Types/UserMeta/Permission";

export class AdminChangePermissionMessage extends TSMSPMessage {
    adminToken: Token
    clientToken: Token
    newPermission: Permission

    constructor(adminToken: Token, clientToken: Token, newPermission: Permission) {
        super()
        this.adminToken = adminToken
        this.clientToken = clientToken
        this.newPermission = newPermission
    }
}