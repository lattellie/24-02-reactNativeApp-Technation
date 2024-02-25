import * as FileSystem from 'expo-file-system';

const DATA_FILE_URI = `${FileSystem.documentDirectory}state.json`;


export const saveDataToFile = async (field,data) => {
    try {
        let existingData = {};
        try {
            const fileContent = await FileSystem.readAsStringAsync(DATA_FILE_URI);
            existingData = JSON.parse(fileContent);
          } catch (error) {
            console.warn('Error reading existing data:', error);
          }
        existingData[field] = data;
        await FileSystem.writeAsStringAsync(DATA_FILE_URI, JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

export const clearData = async() => {
    try {
        let existingData = {};
        await FileSystem.writeAsStringAsync(DATA_FILE_URI, JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
};
// Function to load data from file
export const loadDataFromFile = async (field) => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(DATA_FILE_URI);
    const content = JSON.parse(fileContent);
    const contentfield = content[field];
    // console.log(contentfield)
    return contentfield;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};