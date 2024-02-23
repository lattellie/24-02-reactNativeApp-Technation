import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
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
    <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.checkbox}>
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
        {questions.map((item, index) => (
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
            ))}
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  wrapper: {},
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
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 30,
    marginBottom: 10,
    width: '100%',
  },
  optionText: {
    fontSize: 18,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
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
    right: 10,
  },
  // Add other styles as needed
});

export default SurveyScreen;