import {TSMSPMessage} from "Messages/TSMSPMessage";
import {Token} from "Types/UserMeta/Token";
import {Roles} from "Types/UserMeta/Roles";

export class AdminChangePermissionMessage extends TSMSPMessage {
    adminToken: Token
    clientToken: Token
    newPermission: Roles

    constructor(adminToken: Token, clientToken: Token, newPermission: Roles) {
        super()
        this.adminToken = adminToken
        this.clientToken = clientToken
        this.newPermission = newPermission
    }
}