import React from 'react'
import {SCREEN_WIDTH} from '../SettingsAndConstants'
import {Text} from 'react-native-paper'

export class TextClock extends React.Component<any> {
    clockID: any
    state: { date: any }

    constructor(props: any) {
        super(props)
        this.state = {date: new Date()}
    }

    componentDidMount() {
        this.clockID = setInterval(() => this.setState({date: new Date()}), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.clockID)
    }

    render() {
        return <Text style={{fontSize: SCREEN_WIDTH * 0.1}}>
            {this.state.date.toLocaleDateString() + ' ' + this.state.date.toLocaleTimeString()}
        </Text>
    }
}