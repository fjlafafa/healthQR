import React from 'react'
import {APIUrl} from '../Globals/GlobalVariables'
import {TSMSPReply} from '../Impl/Replies/TSMSPReply'
import {TSMSPMessage} from '../Impl/Messages/TSMSPMessage'

export function SendData(
    toSendMessage: TSMSPMessage,
    ifSuccess: (reply: TSMSPReply) => void = (replyJson: TSMSPReply)=>{alert(replyJson.message)},
    ifFail: (reply: TSMSPReply) => void = (replyJson: TSMSPReply)=>{alert(replyJson.message)}) {
    fetch(APIUrl, {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: JSON.stringify(toSendMessage)
    }).then((response) => response.json()).then((replyJson: TSMSPReply) => {
        console.log(replyJson)
        if (replyJson.status === 0)
            ifSuccess(replyJson)
        else
            ifFail(replyJson)
    }).catch((e) => console.log(e))
}