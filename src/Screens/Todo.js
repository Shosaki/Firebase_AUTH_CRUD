import {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  SafeAreaView,
  TextInput,
  FlatList,
  Keyboard,
  Pressable,
  Image,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AddButton from '../Components/AddButton';
import {db} from '../Firebase/firebase-config';
import {
  query,
  collection,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const Todo = ({navigation}) => {
  useEffect(() => {
    // Needs to be nav stack reset, change later saketh
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Landing');
      return true;
    });
  }, []);

  // Read data from DB and populate incomplete todo's list
  useEffect(() => {
    const q = query(collection(db, 'todoList'));
    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      let todosArr = [];
      QuerySnapshot.forEach(doc => {
        todosArr.push({...doc.data(), id: doc.id});
      });

      console.log('Saketh - ', todosArr);

      let filteredIncompleteArr = todosArr.filter(
        item => item.completed === false,
      );
      let filteredCompleteArr = todosArr.filter(
        item => item.completed === true,
      );

      setTodoList(filteredIncompleteArr);
      setCompletedTodoList(filteredCompleteArr);
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   textInputRef?.current?.focus();
  // });

  const addToDo = async () => {
    let newId = todoList.length + completedTodoList.length + 1;
    let newToDoValue = todo;

    if (todo !== '') {
      await addDoc(collection(db, 'todoList'), {
        id: newId,
        todoItem: newToDoValue,
        completed: false,
      });
      setTodo('');
    }

    // if (todo !== '') {
    //   // Add todo
    //   let currentTodoId = todoList.length + completedTodoList.length + 1;
    //   setTodoList([
    //     ...todoList,
    //     {id: currentTodoId, todoItem: todo, completed: false},
    //   ]);
    //   setTodo('');
    //   Keyboard.dismiss();
    // }

    // else if (editItemId !== '' && todo !== '') {
    //   // Edit todo
    //   textInputRef?.current?.focus();
    //   let filteredItem = todoList.filter(item => item.id == editItemId);
    //   let filteredArray = todoList.filter(item => item.id != editItemId);

    //   let mutatedItem = [
    //     {
    //       id: filteredItem[0]?.id,
    //       todoItem: todo,
    //       completed: false,
    //     },
    //   ];

    //   setTodoList([...filteredArray, ...mutatedItem]);
    //   setTodo('');
    //   setEditItemID('');
    // }
  };

  const editToDo = async id => {
    if (todo !== '') {
      await updateDoc(doc(db, 'todoList', id), {
        todoItem: todo,
      });
    }

    setTodo('');

    // if (todo !== '') {
    //   // Edit todo
    //   // let filteredItem = todoList.filter(item => item.id == id);
    //   let filteredArray = todoList.filter(item => item.id != id);

    //   let mutatedItem = [
    //     {
    //       id: id,
    //       todoItem: todo,
    //       completed: false,
    //     },
    //   ];

    //   setTodoList([...filteredArray, ...mutatedItem]);
    //   setTodo('');
    // }
  };

  const deleteToDo = async (id, completed) => {
    await deleteDoc(doc(db, 'todoList', id));
    // if (completed) {
    //   let filteredArray = completedTodoList.filter(item => item.id != id);
    //   setCompletedTodoList([...filteredArray]);
    // } else {
    //   let filteredArray = todoList.filter(item => item.id != id);
    //   setTodoList([...filteredArray]);
    // }
  };

  const Item = ({listItem}) => {
    return (
      <View
        style={[
          styles.todo,
          {
            flexDirection: 'row',
            borderColor: listItem.completed ? 'green' : 'red',
            borderWidth: 2,
          },
        ]}>
        {!listItem.completed ? (
          <>
            <BouncyCheckbox
              fillColor="gray"
              unfillColor={'white'}
              onPress={async isChecked => {
                let filteredItem = todoList.filter(
                  item => item.id == listItem.id,
                );

                await updateDoc(doc(db, 'todoList', listItem.id), {
                  id: listItem.id,
                  todoItem: filteredItem[0]?.todoItem,
                  completed: true,
                });

                // let filteredItem = todoList.filter(
                //   item => item.id == listItem.id,
                // );
                // let filteredArray = todoList.filter(
                //   item => item.id != listItem.id,
                // );

                // let mutatedItem = [
                //   {
                //     id: filteredItem[0]?.id,
                //     todoItem: filteredItem[0]?.todoItem,
                //     completed: true,
                //   },
                // ];
                // setTodoList([...filteredArray]);
                // setCompletedTodoList([...completedTodoList, ...mutatedItem]);
              }}
            />
          </>
        ) : null}

        <Text style={{fontSize: 16, color: 'black', width: 150}}>
          {listItem.todoItem}
        </Text>

        {!listItem.completed ? (
          <Pressable
            onPress={() => editToDo(listItem.id)}
            style={{alignSelf: 'center', marginLeft: 25}}>
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={require('../../assets/editing.png')}
            />
          </Pressable>
        ) : null}

        <Pressable
          onPress={() => deleteToDo(listItem.id, listItem.completed)}
          style={{
            alignSelf: 'center',
            marginLeft: listItem.completed ? 110 : 20,
          }}>
          <Image
            style={{
              height: 25,
              width: 25,
            }}
            source={require('../../assets/trash.png')}
          />
        </Pressable>
      </View>
    );
  };

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedTodoList, setCompletedTodoList] = useState([]);
  // const [editItemId, setEditItemID] = useState('');
  const textInputRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.todoContainer}>
        <View style={{flexShrink: 0.2}}>
          <Text style={{fontSize: 28, color: 'black', alignSelf: 'center'}}>
            To Do
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={textInputRef}
              autoFocus={true}
              editable
              maxLength={40}
              placeholder={'Enter To do'}
              placeholderTextColor={'black'}
              onChangeText={val => setTodo(val)}
              value={todo}
              inputStyle={{color: 'white'}}
              style={[styles.textInput, {marginBottom: 15}]}
            />
            <AddButton addToDo={addToDo} />
          </View>
        </View>

        <View style={{flexShrink: 1}}>
          {todoList.length === 0 && completedTodoList.length === 0 ? (
            <>
              <Text
                style={[
                  styles.flatlistHeaders,
                  {fontSize: 28, marginTop: 200},
                ]}>
                No Todo's
              </Text>
            </>
          ) : null}

          {todoList.length !== 0 ? (
            <>
              <Text style={styles.flatlistHeaders}>Incomplete</Text>
              <FlatList
                data={todoList}
                renderItem={({item}) => <Item listItem={item} />}
                keyExtractor={item => item.id}
              />
            </>
          ) : null}

          {completedTodoList.length !== 0 ? (
            <View style={{flexShrink: 1, marginBottom: 40}}>
              <Text style={styles.flatlistHeaders}>Completed</Text>

              <FlatList
                data={completedTodoList}
                renderItem={({item}) => <Item listItem={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Todo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
  },
  todoContainer: {
    flex: 0.9,
    backgroundColor: 'white',
    marginTop: 70,
    marginHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#b38600',
  },
  textInput: {
    height: 55,
    width: 265,
    paddingLeft: 30,
    marginTop: 7,
    marginHorizontal: 15,
    borderWidth: 2,
    color: '#b38600',
    borderColor: '#b38600',
    borderRadius: 10,
  },
  todo: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#b38600',
    borderRadius: 10,
  },
  flatlistHeaders: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'black',
  },
});
