import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import Checkbox from './components/Checkbox';
import MedToDo from './components/MedToDo';
const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [displayInstruction, setDisplayInstruction] = useState('');
  const [medModalVisible, setMedModalVisible] = useState(false);
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
  
  const [medsMatrix, setMedsMatrix] = useState(Array.from({ length: 3 }, () => Array(4).fill(0)));
  const timeFrameList = ['morning','lunch','evening'];
  const [medList, setMedList] = useState([med1, med2, med3, med4]);
  const userName = 'John';
  const changeselect = (index) => {
    let medCopy = [...medList];
    medCopy[index] = { ... medCopy[index],selected:-medCopy[index].selected};
    setMedList(medCopy);
    let matCopy = [...medsMatrix];
    if (medCopy[index].selected == 1) {
        matCopy.forEach((row, idx) => {
            row[index] = medCopy[index].often[idx];
        })
    } else {
        matCopy.forEach((row, idx) => {
            row[index] = 0;
        })
    }
    setMedsMatrix(matCopy);
    // [[1, 1, 1, 0], [0, 1, 0, 0], [0, 1, 1, 0]]: morning ABC, lunch B, night BC
    // index: morning/ lunch/ evening
    // medIdx: medA/ medB/ medC/ medD
  }

  const getModal = () => {
    return (
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
        </Modal>)
  };
  const getMedModal = () => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={medModalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setMedModalVisible(!medModalVisible);
            }}>
            <View style={styles.centeredView}>
            <View style={styles.medDescription}>
                <Text style={styles.textDescription}>{displayInstruction}</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setMedModalVisible(false)}>
                    <Text style={styles.textStyle}>Close instruction</Text>
                </Pressable>
            </View>
          </View>
        </Modal>)
  };
  const checkItem = (timeindex, medindex) => {
    let matCopy = [...medsMatrix];
    matCopy[timeindex][medindex] = !matCopy[timeindex][medindex];
    setMedsMatrix(matCopy);
  };
  const expandInstruction = (med) => {
    // console.log(med.description);
    setDisplayInstruction(med.description);
    setMedModalVisible(true);
  };
  const renderMedList = (item,index) => {
    // index: morning/lunch/evening
    // medIdx: A/B/C/D
    // medsMatrix[morning][C]
    return(
        medList.map((med, medIdx) => {
        if (med.selected == 1 & med.often[index]==1){
        return(
            <View style = {styles.eachmed}>
                <TouchableOpacity 
                    style = {[styles.square, medsMatrix[index][medIdx]==1 ? null:styles.itemSelected]}
                    onPress = {()=>checkItem(index,medIdx)}
                >
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.textInstruction} 
                    onPress={()=>expandInstruction(med)}
                >
                    <Text>{med.name}</Text>
                </TouchableOpacity>
            </View>
        )
        }
        })
    )
  };
  return (
    <View style={styles.centeredView}>
      {
        getModal()
      }
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
                            renderMedList(item,index)
                        }
                    </View>
                )
            }
            )
        }
      </View>
        {
            getMedModal()
        }
    </View>
  );
};

const styles = StyleSheet.create({
    textDescription:{
        fontSize: 20,
        paddingVertical: 20,
    },
    medDescription:{
        marginTop: 100,
        justifyContent:'center',
        textAlign:'center',
        backgroundColor: '#ebebeb',
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
    square:{
        width: 24,
        height: 24,
        backgroundColor: '#e0e0e0',
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
    eachmed:{
        padding: 10,
        backgroundColor:'#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    }
});

export default App;