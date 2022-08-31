import {TSMSPReply} from './TSMSPReply'
import {Place} from "../../Types/Place";

export class AdminTestReply extends TSMSPReply {
    override getStatus(): number {
        return super.getStatus()
    }

    override getMessage(): string {
        const thePlace=JSON.parse(super.getMessage()) as Place
        return thePlace.riskLevel.toString()
    }
}