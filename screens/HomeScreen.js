import React, {useState, useEffect, useRef} from 'react';
import { Button, View, Text } from 'react-native';
import {saveDataToFile,loadDataFromFile,clearData} from '../components/manageData';
import * as Notifications from 'expo-notifications';
import { sendPushNotification,registerForPushNotificationsAsync } from '../components/setNot';

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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
      <Button
      title="Take the Survey"
      onPress={() => navigation.navigate('Survey')}
      />
      <Button
      title="update data"
      onPress={() => {
        console.log('pressed-in-onpress')
        sendPushNotification(expoPushToken);
        console.log(expoPushToken)
      }}
      />
      <Button
      title="clear data"
      onPress={() => {
        clearData();
        console.log('cleared data!');
      }}
      />
      <Text >{currentDateTime.toLocaleString()}</Text>
    </View>
  );
}

export default HomeScreen;
