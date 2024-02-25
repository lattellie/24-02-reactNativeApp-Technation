import { Platform } from 'react-native';
import {useState} from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {saveDataToFile,loadDataFromFile} from '../components/manageData';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
export async function sendPushNotification(expoPushToken) {
  console.log('in send push notification')
  let data = await loadDataFromFile('medmatrix');
  const medList = await loadDataFromFile('medlist');
  const timeframe = await loadDataFromFile('timeframe');
  let d = new Date();
  if (d.getHours()<12) {
    d = 0;
  } else if (d.getHours()<18) {
    d = 1;
  } else {
    d = 2;
  }
  // console.log('c')
  // console.log(data);
  // console.log(medList);
  // console.log(timeframe);
  let displayNot = false;
  let todisplay = 'Hey John! remember to take your '+timeframe[d]+' medicines:';
  const nm = await loadDataFromFile('name');
  if (nm=='Carer') {
    todisplay = 'Remind John to take his '+timeframe[d]+' medicines:';
  }
  console.log(nm);
  // (const [index, item] of list.entries()
  for (const [idx, currMed] of data[d].entries()) {
    if (currMed===1 || currMed) {
      todisplay = todisplay + ' ' + medList[idx]['name'];
      displayNot = true;
    }
  }
  if (displayNot) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Take your medicine!',
      body: todisplay,
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}
