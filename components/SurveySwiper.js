import React, { useState } from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Swiper from 'react-native-swiper';

const questions = [
    {
      question: 'Pain',
      options: [
        'I have no pain.',
        'There is mild pain not needing medication.',
        'I have moderate pain - requires regular medication (codeine or nonnarcotic).',
        'I have severe pain controlled only by narcotics.',
        'I have severe pain, not controlled by medication.',
      ],
    },
    {
      question: 'Appearance',
      options: [
        'There is no change in my appearance.',
        'The change in my appearance is minor.',
        'My appearance bothers me but I remain active.',
        'I feel significantly disfigured and limit my activities due to my appearance.',
        'I cannot be with people due to my appearance.',
      ],
    },
  ];

  const QuestionOption = ({ label, onPress, isSelected }) => (
    <TouchableOpacity style={[styles.option, isSelected && styles.optionSelected]} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <View style={styles.selectedCheckbox} />}
      </View>
      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

const SurveyScreen = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const selectOption = (questionIndex, option) => {
    setSelectedAnswers(currentAnswers => ({
      ...currentAnswers,
      [questionIndex]: option,
    }));
  };
  let nextidx = questions.length;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.paginationStyle}
      >
        {/* {questions.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.questionCount}>Question {index + 1}</Text>
            <Text style={styles.question}>{item.question}</Text>
            {item.options.map((option, optionIndex) => (
              <QuestionOption
                key={optionIndex}
                label={option}
                onPress={() => selectOption(index, option)}
                isSelected={selectedAnswers[index] === option}
              />
            ))
            }
          </View>
        ))} */}
        <View key={0} style={styles.slide}>
            <Text style={styles.questionCount}>Question {0 + 1}</Text>
            <Text style={styles.question}>{questions[0].question}</Text>
            {questions[0].options.map((option, optionIndex) => (
              <QuestionOption
                key={optionIndex}
                label={option}
                onPress={() => selectOption(1, option)}
                isSelected={selectedAnswers[1] === option}
              />
            ))
            }
        </View>
        <View key={1} style={styles.slide}>
            <Text style={styles.questionCount}>Question {1 + 1}</Text>
            <Text style={styles.question}>{questions[1].question}</Text>
            {questions[1].options.map((option, optionIndex) => (
              <QuestionOption
                key={optionIndex}
                label={option}
                onPress={() => selectOption(1, option)}
                isSelected={selectedAnswers[1] === option}
              />
            ))
            }
        </View>
        <View key={nextidx+3} style={styles.slide}>
          <Text style={styles.result}>Question: {questions[0].question}</Text>
          <Text style={styles.resultSub}>36% of patients has similar symptoms</Text>
          <Image
            source={require('../assets/q1.png')} // Replace with your image path
            style={styles.image}
          />
          <Text style={styles.result}>Question: {questions[1].question}</Text>
          <Text style={styles.resultSub}>20% of patients has similar symptoms</Text>
          <Image
            source={require('../assets/q2.png')} // Replace with your image path
            style={styles.image}
          />
        </View>
      </Swiper>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  wrapper: {},
  result:{
    marginVertical: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultSub:{
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 400, 
    height: 200,
    resizeMode: 'contain', 
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  questionCount: {
    fontSize: 16,
    marginBottom: 10,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 30,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#fff', // default background color
  },
  optionSelected: {
    backgroundColor:  '#000080', // background color when selected
    borderColor:  '#000080', // border color when selected
  },
  optionText: {
    fontSize: 18,
    color: '#000', // default text color
    marginHorizontal: 10,
    paddingRight: 10,
  },
  selectedOptionText: {
    color: '#fff', // text color when selected
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    borderColor: '#fff', // checkbox border color when selected
  },
  selectedCheckbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff', // checkbox inner color when selected
  },
  dot: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  // Add other styles as needed
});

export default SurveyScreen;