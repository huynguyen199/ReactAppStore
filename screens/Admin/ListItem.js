import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

var {width} = Dimensions.get('window');
const ListItem = props => {
  console.log('🚀 ~ file: ListItem.js ~ line 19 ~  props', props);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}>
              <View>
                <Icon style={{textAlign: 'right'}} name="close" size={20} />
                <EasyButton
                  medium
                  secondary
                  onPress={() => [
                    props.navigation.navigate('ProductForm', {item: props}),
                    setModalVisible(false),
                  ]}>
                  <Text>Edit</Text>
                </EasyButton>
                <EasyButton
                  medium
                  danger
                  onPress={() => [
                    console.log('delete', props),
                    props.delete(props._id),
                    setModalVisible(false),
                  ]}>
                  <Text>Delete</Text>
                </EasyButton>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: props.index % 2 == 0 ? 'white' : 'gainsboro',
          },
        ]}
        onPress={() => {
          props.navigation.navigate('Product Detail', {item: props});
        }}
        onLongPress={() => {
          setModalVisible(true);
        }}>
        <Image
          source={{
            uri: props.image
              ? props.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>{props.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>

        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.category.name}
        </Text>
        <Text style={styles.item}>$ {props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 65,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
  },
});

export default ListItem;
