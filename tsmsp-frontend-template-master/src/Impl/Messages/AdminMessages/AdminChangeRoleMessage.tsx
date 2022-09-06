import {TSMSPMessage} from "Messages/TSMSPMessage";
import {Token} from "Types/UserMeta/Token";
import {Roles} from "Types/UserMeta/Roles";

export class AdminChangeRoleMessage extends TSMSPMessage {
    adminToken: Token
    clientToken: Token
    newRole: Roles

    constructor(adminToken: Token, clientToken: Token, newRole: Roles) {
        super()
        this.adminToken = adminToken
        this.clientToken = clientToken
        this.newRole = newRole
    }
}