import create from 'zustand'
import {Token} from "Types/UserMeta/Token"

export const TokenStore = create(() => ({token: new Token('')}))

export const setUserToken = (token:Token) => TokenStore.setState({token:token})
export const clearUserToken = () => TokenStore.setState({token: new Token('')})
