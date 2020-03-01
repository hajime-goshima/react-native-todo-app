import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Todo() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState(['お出かけ', '勉強', '明日の準備']);

  const onSubmitEditingHandler = e => {
    setTasks(tasks.concat([e.nativeEvent.text]));
    setText('');
  };

  const changeTextHandler = text => {
    setText(text);
  };

  pressDissmissHandler = index => {
    console.log('pressDissmissHandler');
    console.log(index);
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const renderItem = ({ item, index, separators }) => {
    return (
      <View
        style={[styles.renderItem, index === 0 ? styles.renderItemZero : {}]}
      >
        <View style={styles.renderItemInner}>
          <Text style={styles.renderItemText}>{item}</Text>
          <TouchableOpacity
            onPress={() => pressDissmissHandler(index)}
            style={styles.renderItemButton}
          >
            <AntDesign
              name="close"
              size={20}
              color="gray"
              style={styles.renderItemButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        onSubmitEditing={onSubmitEditingHandler}
        placeholder="ここに入力して下さい。"
        style={styles.inputText}
        value={text}
        onChangeText={changeTextHandler}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <FlatList
        data={tasks}
        ItemSeparatorComponent={itemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  inputText: {
    height: 60,
    fontSize: 22,
    flexGrow: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    paddingHorizontal: 10
  },
  flatList: {
    flexGrow: 1
  },
  renderItem: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  renderItemZero: {
    marginTop: 5
  },
  renderItemInner: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  renderItemText: {
    width: 0,
    flexGrow: 1,
    fontSize: 22
  },
  renderItemButton: {
    flexGrow: 0,
    flexShrink: 0
  },
  renderItemButtonIcon: {
    marginRight: 10
  },
  separator: {
    height: 1,
    backgroundColor: 'gray'
  }
});
