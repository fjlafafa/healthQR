import {UserId} from "./UserMeta/UserId";
import {Password} from "./UserMeta/Password";
import {RealName} from "./UserMeta/RealName";
import {IdentityNumber} from "./UserMeta/IdentityNumber";
import {Permission} from "./UserMeta/Permission";
import {Token} from "Types/UserMeta/Token";
import {DateClass} from "Types/Templates/DateClass";

export class UserIdentity {
    userId: UserId
    identityNumber: IdentityNumber
    password: Password
    realName: RealName
    token: Token
    refreshTime: DateClass
    permission: Permission

    constructor(
        userId: UserId,
        identityNumber: IdentityNumber,
        password: Password,
        realName: RealName,
        token: Token,
        refreshTime: DateClass,
        permission: Permission
    ) {

        this.userId = userId
        this.realName = realName
        this.password = password
        this.token = token
        this.refreshTime = refreshTime
        this.identityNumber = identityNumber
        this.permission = permission
    }
}