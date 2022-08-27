import React from "react";
import {styles} from "../Styles";
import {Text} from "react-native";

export class TextClock extends React.Component<any> {
    clockID: any
    state: {date: any}
    constructor(props: any) {
        super(props);
        this.state = {date: new Date()}
    }
    componentDidMount() {
        this.clockID = setInterval(()=>this.setState({date: new Date()}), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.clockID)
    }
    render(){
        return <Text style={styles.text}>
            {this.state.date.toLocaleDateString()+"\n"+this.state.date.toLocaleTimeString()}
        </Text>
    }
}