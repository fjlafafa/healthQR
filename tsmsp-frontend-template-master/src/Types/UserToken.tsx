import {UserId} from "./UserMeta/UserId"
import {Token} from "./UserMeta/Token"
import {DateClass} from "./Templates/DateClass";

export class UserToken {
        userId : UserId
        token : Token
        refreshTime : DateClass
    constructor(
        userId : UserId,
        token : Token,
        refreshTime : DateClass) {
        this.userId = userId
        this.token = token
        this.refreshTime = refreshTime
    }
}