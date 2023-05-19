import {View, Pressable, Image} from 'react-native';

const AddButton = ({addToDo}) => {
  return (
    <>
      <Pressable onPress={() => addToDo()}>
        <Image
          style={{
            borderRadius: 50,
            height: 50,
            width: 50,
            marginTop: 7,
          }}
          source={require('../../assets/plus.png')}
        />
      </Pressable>
    </>
  );
};
export default AddButton;
