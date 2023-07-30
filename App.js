import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    KeyboardAvoidingView 
} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

	import axios from 'axios';

const ChattingAppWithAI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const OPENAI_API_KEY = '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'; // Replace this with your actual OpenAI API key

  const handleSend = async () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: inputMessage,
            max_tokens: 50, // Adjust the number of tokens as needed
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );

        const aiReply = response.data.choices[0]?.text.trim();
        if (aiReply) {
          setMessages([...messages, { text: aiReply, sender: 'ai' }]);
        }
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#223333',}}>
      <View style={{ backgroundColor: "#F2E9E4", flex:0.09, height: 60, marginTop: 5 }}></View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={{ alignItems: item.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <Text
              style={{
                backgroundColor: item.sender === 'user' ? '#EAE0D2' : '#22333B',
                padding: 10,
                borderRadius: 50,
                margin: 5,
              }}>
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        inverted // To display the latest messages at the bottom
      />
      <View style={{ flex: 1/4 }}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
          <TextInput
            style={{ flex: 1, height: 50, borderColor: '#F2E9E4', borderWidth: 1, borderRadius: 30, paddingHorizontal: 15 }}
            onChangeText={text => setInputMessage(text)}
            value={inputMessage}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={{ marginLeft: 10, borderColor: '#F2E9E4', borderWidth: 1, borderRadius: 100, padding: 15  }} onPress={handleSend}>
            <Text>
                <FontAwesome
                    name="send"
                    size={18}
                    color="#F2E9E4"
                    style={{ paddingRight: 8 }}
                />
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChattingAppWithAI;