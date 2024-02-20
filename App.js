import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import Checkbox from './components/Checkbox';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // setting up all the medicines in the list
  const med1 = {
    name: 'Medicine A',
    often: [1,0,0],
    exp: [2024,3,15],
    description: 'this is the description for medicine A.',
    selected: -1,
  }
  const med2 = {
    name: 'Medicine B',
    often: [1,1,1],
    exp: [2024,3,1],
    description: 'this is the description for medicine B.',
    selected: -1,
  }
  const med3 = {
    name: 'Medicine C',
    often: [1,0,1],
    exp: [2024,3,10],
    description: 'this is the description for medicine C.',
    selected: -1,
  }
  const med4 = {
    name: 'Medicine D',
    often: [0,0,1],
    exp: [2024,3,19],
    description: 'this is the description for medicine D.',
    selected: -1,
  }
  const timeFrameList = ['morning','lunch','evening'];
  const [medList, setMedList] = useState([med1, med2, med3, med4]);
  const userName = 'John';
  const changeselect = (index) => {
    let medCopy = [...medList];
    // console.log(medCopy[index]);
    medCopy[index] = { ... medCopy[index],selected:-medCopy[index].selected};
    setMedList(medCopy);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select the notifications you want</Text>
            <View style={styles.items}>
                {
                    medList.map((item,index)=>{
                        return (
                            <TouchableOpacity onPress={()=>changeselect(index)}>
                                <Checkbox text={item.name} selected={item.selected}></Checkbox>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Save Setting</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.todoHeader}>{userName}'s ToDo List</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Preference Setting</Text>
      </Pressable>
      <View style={styles.todoFrame}>
        {
            timeFrameList.map((item,index) => {
                return(
                    <View style={styles.timeFrame}>
                        <Text style={styles.timeCaption}>{item}</Text>
                        {
                            medList.map((med, medIdx) => {
                                if (med.selected == 1 & med.often[index]==1){
                                    return(
                                        <Text>{med.name}</Text>
                                    )
                                }
                            })
                        }
                    </View>
                )
            }

            )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    todoFrame:{
        marginVertical: 20,
        width: '80%',
    },
    timeFrame:{

    },
    timeCaption:{
        fontSize: 20,
        textAlign: 'center',
    },
    items:{
        padding: 0,
        margin: 0,
    },
    todoHeader:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        marginTop: 100,
    },
    modalView: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
        textAlign: 'center',
    },
});

export default App;