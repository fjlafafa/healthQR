import {JacksonSerializable} from '../JacksonSerializable'

/**经过一些尝试，决定只在前端扩展reply类（后端由于泛型写不出来，实际也无用，就没写）
 *
 */

export class TSMSPReply extends JacksonSerializable {
    status : number
    message : string
    constructor(status : number, message : string) {
        super()
        this.status = status
        this.message = message
    }
    getStatus() {
        return this.status
    }
    getMessage() {
        return this.message
    }
}