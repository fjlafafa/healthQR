import React from 'react'
import {APIUrl} from '../Globals/GlobalVariables'
import {TSMSPReply} from '../Impl/TSMSPReply'
import {TSMSPMessage} from '../Impl/Messages/TSMSPMessage'
import {Impl} from 'Types/Enums'

export function SendData(
    toSendMessage: TSMSPMessage,
    ifSuccess: (replyMessage: any) => void = (replyMessage: any)=>{alert(replyMessage)},
    ifFail: (replyMessage: any) => void = (replyMessage: any)=>{alert(replyMessage)}) {
    fetch(APIUrl, {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: JSON.stringify(toSendMessage)
    }).then((response) => response.json()).then((replyJson: TSMSPReply) => {
        console.log(replyJson)
        if (replyJson.status === Impl.STATUS_OK)
            ifSuccess(toSendMessage.getReplyMessage(replyJson))
        else
            ifFail(toSendMessage.getReplyMessage(replyJson))
    }).catch((e) => console.log(e))
}