import React from 'react'
import {APIUrl} from '../Globals/GlobalVariables'
import {TSMSPReply} from '../Impl/TSMSPReply'
import {TSMSPMessage} from '../Impl/Messages/TSMSPMessage'
import {Impl} from 'Types/Enums'

export function SendData(
    toSendMessage: TSMSPMessage,
    ifSuccess: (reply: TSMSPReply) => void = (replyJson: TSMSPReply)=>{alert(toSendMessage.getReplyMessage(replyJson))},
    ifFail: (reply: TSMSPReply) => void = (replyJson: TSMSPReply)=>{alert(toSendMessage.getReplyMessage(replyJson))}) {
    fetch(APIUrl, {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: JSON.stringify(toSendMessage)
    }).then((response) => response.json()).then((replyJson: TSMSPReply) => {
        console.log(replyJson)
        if (replyJson.status === Impl.STATUS_OK)
            ifSuccess(replyJson)
        else
            ifFail(replyJson)
    }).catch((e) => console.log(e))
}