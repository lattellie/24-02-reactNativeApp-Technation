import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid} from 'react-native';
const Checkbox = (props) => {
    return (
        <View style = {styles.item}>
            <View style = {styles.itemLeft}>
                <View style = {[styles.square, props.selected ==1 ? styles.itemSelected:null]}></View>
                <Text style = {styles.itemText}>{props.text}</Text>
            </View>
            <View style = {styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor:'#fff',
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    itemSelected:{
        backgroundColor: '#000',
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square:{
        width: 24,
        height: 24,
        backgroundColor: '#e0e0e0',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText:{
        maxWidth: '80%',

    },
    circular:{
        width: 12,
        height: 12,
        borderColor: '#55bcf6',
        borderWidth: 2,
        borderRadius: 5,
    },
});
export default Checkbox;