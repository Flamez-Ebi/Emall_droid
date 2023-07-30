import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key

const OpenAIComponent = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: inputText,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (response && response.data && response.data.choices) {
        setOutputText(response.data.choices[0].text);
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
        multiline
        placeholder="Enter your prompt here..."
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Generate" onPress={handleGenerate} />
      <Text>{outputText}</Text>
    </View>
  );
};

export default OpenAIComponent;
