import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/john.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>JOHN, SMITH</Text>
        <Text style={styles.noticeText}>
          This cannot be used as photo ID, a driver's licence, or a health card.
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Personal Health Number</Text>
        <Text style={styles.value}>1234 567 890</Text>
        
        <Text style={styles.label}>Account type</Text>
        <Text style={styles.value}>BC Services Card with photo</Text>
        
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>1000 MARINE DR VANCOUVER, BC V0N 1V1 </Text>
        
        <Text style={styles.label}>Date Of Birth</Text>
        <Text style={styles.value}>JANUARY 1, 1940</Text>
        
        <Text style={styles.label}>Email address</Text>
        <Text style={styles.value}>johnsmith@gmail.com</Text>

        <Text style={styles.label}>Family Doctor</Text>
        <Text style={styles.value}>Alex White</Text>
      </View>
      
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>button</Text>
      </TouchableOpacity>
       */}
      {/* The bottom tab bar would be rendered by your navigation library,
           so it's not included in this component. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000080', // Dark blue background
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  nameText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  noticeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
  },
  label: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    color: '#666',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFD700', // Gold color
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
