import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodo,
  deleteTodo,
  selectTodo,
  updateTodo,
} from '../Redux/features/todoSlice';

const TodoScreen = () => {
  const items = useSelector(selectTodo);
  const [changeValue, setChangeValue] = useState();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState();
  const [editId, setEditId] = useState();
  const addHandler = () => {
    let m = {
      id: Math.random().toString(),
      text: inputValue,
    };
    dispatch(addTodo(m));
    setInputValue();
  };

  const deleteHandler = id => {
    dispatch(deleteTodo({id}));
  };

  const updateHandler = async id => {
    await dispatch(updateTodo({id: id, text: changeValue}));
    setEditId('');
    setChangeValue('');
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholderTextColor="grey"
        value={inputValue}
        onChangeText={setInputValue}
        className="border border-cyan-400  m-4 rounded-lg p-4 font-bold bg-cyan-100 "
      />
      <Button title="Add Todo" onPress={addHandler} />
      <ScrollView>
        {items?.map(item => {
          return (
            <View
              key={item.id}
              className="flex-row items-center space-x-1 p-5 bg-slate-300 m-4 rounded-lg ">
              {editId == item.id ? (
                <TextInput
                  value={changeValue}
                  onChangeText={setChangeValue}
                  className=" flex-1 border border-red-400 p-4 m-2 rounded-lg "
                />
              ) : (
                <Text className="flex-1 text-lg font-bold">{item.text}</Text>
              )}

              <TouchableOpacity
                className="bg-green-400 p-4 rounded-lg"
                onPress={() => {
                  if (editId == item.id) {
                    updateHandler(item.id);
                  }
                  setEditId(item.id);
                  setChangeValue(item.text);
                }}>
                <Text className="font-bold">
                  {editId == item.id ? 'Save' : 'Edit'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-400 p-4 rounded-lg"
                onPress={() => {
                  if (editId == item.id) {
                    setEditId('');
                    return;
                  }
                  deleteHandler(item.id);
                }}>
                <Text className="text-teal-50 font-bold">
                  {editId == item.id ? 'cancel' : 'X'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodoScreen;
