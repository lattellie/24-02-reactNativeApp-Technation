import * as FileSystem from 'expo-file-system';

const DATA_FILE_URI = `${FileSystem.documentDirectory}state.json`;

// export const saveDataToFile = async (data) => {
//   try {
//     await FileSystem.writeAsStringAsync(DATA_FILE_URI, JSON.stringify(data));
//     console.log(DATA_FILE_URI)
//     console.log('Data saved successfully');
//   } catch (error) {
//     console.error('Error saving data:', error);
//   }
// };

export const saveDataToFile = async (field,data) => {
    try {
        let existingData = {};
        try {
            const fileContent = await FileSystem.readAsStringAsync(DATA_FILE_URI);
            existingData = JSON.parse(fileContent);
            // console.log('in try')
          } catch (error) {
            // File does not exist or cannot be read
            console.warn('Error reading existing data:', error);
          }
        // Update the specified field with new data
        existingData[field] = data;
        // console.log(existingData['medlist']);
        // console.log(existingData['timeframe']);
        // console.log(existingData['medmatrix']);
        // Write updated data back to the file
        await FileSystem.writeAsStringAsync(DATA_FILE_URI, JSON.stringify(existingData));
        // console.log(DATA_FILE_URI);
        // console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

// Function to load data from file
export const loadDataFromFile = async (field) => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(DATA_FILE_URI);
    const content = JSON.parse(fileContent);
    // setData(JSON.parse(fileContent));
    // console.log(JSON.parse(fileContent))
    // console.log('Data loaded successfully');
  } catch (error) {
    console.error('Error loading data:', error);
  }
};