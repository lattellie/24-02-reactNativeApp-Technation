import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid} from 'react-native';
const MedToDo = (props) => {


    
    // name: 'Medicine D',
    // often: [0,0,1],
    // exp: [2024,3,19],
    // description: 'this is the description for medicine D.',
    // selected: -1,
    return (
        <View style = {styles.item}>
            <TouchableOpacity 
                style = {[styles.square, props.selected ==1 ? styles.itemSelected : null]}
                onpress = {()=>checkItem()}
            >
            </TouchableOpacity>
            <TouchableOpacity 
                style = {styles.textInstruction} 
                onPress={()=>expandInstruction()}
            >
                <Text>{props.med.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        padding: 4,
        backgroundColor:'#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    square:{
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemSelected:{
        backgroundColor: '#000',
    },
    textInstruction:{
        width: '90%',
    },
});
export default MedToDo;