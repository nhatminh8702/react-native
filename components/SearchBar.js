import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const API = 'https://provinces.open-api.vn/api/?depth=3';

const SearchBar = () => {
  //Use State
  const [intput, setInput] = useState('');
  const [cityList, setCityList] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  //Use Callback
  const renderSuggestion = useCallback(
    text => {
      setInput(text);
      setSuggestion(cityList.filter(item => item.name.includes(text)));
    },
    [cityList],
  );
  const handleFetch = useCallback(async () => {
    const Response = await fetch(API);
    if (Response.ok) {
      const data = await Response.json();
      setCityList(data);
    }
  }, []);
  //Use Effect
  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View style={[style.constainer]}>
      <TextInput
        value={intput}
        style={[style.inputText]}
        placeholder="nhap ten thanh pho de tim kiem"
        onChangeText={text => renderSuggestion(text)}
      />
      <FlatList
        style={{ flexGrow: 0 }}
        data={suggestion}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setInput(item.name);
            }}>
            <View style={style.suggestionBox}>
              <Text style={style.suggestionText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const style = StyleSheet.create({
  suggestionBox: {
    backgroundColor: 'azure',
    alignSelf: 'stretch',
    width: 350,
  },
  suggestionText: {
    fontSize: 15,
    color: 'black',
  },
  inputText: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'azure',
    width: '95%',
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  constainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
export default SearchBar;
