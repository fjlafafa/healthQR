import {Dimensions, StyleSheet} from 'react-native'

//All style should only exist in its own utils, this page will only contain some params

export const mywindow = Dimensions.get('window')
export const myscreen = Dimensions.get('screen')

export const SCREEN_WIDTH = (myscreen.width>500?500:myscreen.width)
export const SCREEN_HEIGHT = myscreen.height
export const INNER_WIDTH  = SCREEN_WIDTH-60


export const styles = {
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerView:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    shrinkView:{
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    }
}