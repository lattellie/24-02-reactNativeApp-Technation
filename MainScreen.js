import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Tasks';
import DropDownPicker from 'react-native-dropdown-picker';


function MainScreen() {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    // Other states and functions remain the same
    const handleAddTask = () => {
        // Keyboard.dismiss();
        console.log(task)
        setTaskItems([...taskItems, task])
        // puts out everything in this task as a new array and add new task to it
        setTask(null);
      }
      const [open, setOpen] = useState(false);
      const [value, setValue] = useState(null);
      const [items, setItems] = useState([
        {label: 'Monday', value: 'Monday'},
        {label: 'B', value: 'banana'}
      ]);
    
      const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        // remove that one array from index index
        setTaskItems(itemsCopy);
      }
  
    // Your return statement remains the same
    return (
      // Your existing view structure
      <View style={styles.container}>
      {/* Today's Tasks */}
      <View style = {styles.tasksWrapper}>
        <Text style = {styles.sectionTitle}> Today's tasks</Text>
        <View style = {styles.items}>
          {/* Where all the tasks will go */}
          {/* Iterate through the array */}
          {
            taskItems.map((item,index) => {
              return (
                <TouchableOpacity onPress={() => completeTask(index)}>
                  <Task text = {item}></Task>
                </TouchableOpacity>
              )
              // return <Task key={index} text={item}></Task>
            })
          }
        </View>
      </View>
      {/* Write the add task */}
      <KeyboardAvoidingView
        behavior={Platform.OS ==='ios'? 'padding':'height'}
        style={styles.writeTaskWrapper}
      >
        <View style = {styles.textInputs}>
          <TextInput 
            style = {styles.input} 
            placeholder={'Write a task'} 
            value = {task}
            onChangeText={text =>setTask(text)}
          ></TextInput>
          <View style = {styles.dropdown}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={value => console.log(value)}
          />
          </View>
        </View>
        <TouchableOpacity onPress={()=>handleAddTask()}>
          <View style = {styles.addWraper}>
            <Text style = {styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
    );
  }
  
  // Remember to export MainScreen
  export default MainScreen;
  
  // Your StyleSheet remains here
  const styles = StyleSheet.create({
    // All your style definitions
    container: {
        flex: 1,
        backgroundColor: '#e8eaed',
      },
      textInputs:{
        width: '70%'
      },
      dropdown:{
        paddingVertical: 10
      },
      tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      items: {
        marginTop: 30,
      },
      writeTaskWrapper:{
        position:'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
      },
      input:{
        paddingVertical: 15,
        paddingHorizontal: 15,
        maxWidth: 250,
        backgroundColor: '#fff',
        borderRadius: 60,
        width: 250,
        borderColor: '#c0c0c0',
        borderWidth: 1,
      },
      addWraper:{
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c0c0c0',
        borderWidth: 1,
      },
      addText:{
    
      },
  });
