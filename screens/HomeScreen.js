import React, {useState, useEffect, useRef} from 'react';
import { ImageBackground,StyleSheet,Button, View, Text } from 'react-native';
import {saveDataToFile,loadDataFromFile,clearData} from '../components/manageData';
import * as Notifications from 'expo-notifications';
import { sendPushNotification,registerForPushNotificationsAsync } from '../components/setNot';
import { TouchableOpacity } from 'react-native-gesture-handler';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function HomeScreen({ navigation }) {
  const [medsMatrix, setMedsMatrix] = useState(Array.from({ length: 3 }, () => Array(5).fill(0)));


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDateTime(new Date());
      setNotificationSent(false);
    }, 1000);

    registerForPushNotificationsAsync().then(token => {
      // console.log(token);

      setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });


    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalID);
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);

  useEffect(() => {
    if (!notificationSent && (currentDateTime.getSeconds()%60) === 0) {
      // console.log('Sending push notification');
      sendPushNotification(expoPushToken);
      setNotificationSent(true); // Set notificationSent flag to true after sending the notification
      const medmatrix = loadDataFromFile('medmatrix');
    }
  }, [currentDateTime, notificationSent]);

  const [bgImage, setBgImage] = useState(require('../assets/bgDark.png'));
  const [carer, setcarer] = useState(false);
  const switchToCarer = () => {
    setBgImage(require('../assets/bgLight.png'));
    saveDataToFile('name','Carer');
    setcarer(true);
  }
  const switchToPatient = () => {
    setBgImage(require('../assets/bgDark.png'));
    saveDataToFile('name','John');
    setcarer(false);
  }
  return (
    <ImageBackground 
      source={bgImage}
      style={styles.background}
    >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <Text style={styles.text}>{currentDateTime.toLocaleTimeString()}</Text>
      <Text style={styles.title}>Welcome back!</Text>
      {!carer && <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('Survey')}
      >
        <Text style={styles.buttontext}>Take the daily Survey</Text>
      </TouchableOpacity>}
      {!carer && <TouchableOpacity style={styles.button}
      onPress={() => switchToCarer()}
      >
        <Text style={styles.buttontext}>Switch to carer mode</Text>
      </TouchableOpacity>}
      {carer && <TouchableOpacity style={styles.button}
      onPress={() => switchToPatient()}
      >
        <Text style={styles.buttontext}>Switch to patient mode</Text>
      </TouchableOpacity>}

      
    </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  title:{
    fontSize: 40,
    color: '#fff',
    fontWeight:'500',
  },
  button:{
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    backgroundColor:'#fff',
  },
  buttontext:{
    fontSize: 20,
    color: '#000080',
  },
  text:{
    color: '#fff',
    fontSize: 20,
  }
})
export default HomeScreen;
