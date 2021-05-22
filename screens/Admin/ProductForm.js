import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {Item, Picker} from 'native-base';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import baseURL from '../../assets/common/baseUrl';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';

const ProductForm = props => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category._id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${baseURL}categories`)
      .then(res => setCategories(res.data))
      .catch(error => alert('Error to load categories'));
    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        setImage(source.uri);
        setMainImage(source.uri);
      }
    });
  };

  const addProduct = () => {
    console.log('click');
    if (
      name == '' ||
      brand == '' ||
      description == '' ||
      category == '' ||
      countInStock == ''
    ) {
      setError('Please fill in the form correctly');
    }

    let formData = new FormData();

    const newImageUri = 'file:///' + image.split('file:/').join('');

    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });

    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('richDescription', richDescription);
    formData.append('rating', rating);
    formData.append('numReviews', numReviews);
    formData.append('isFeatured', isFeatured);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      console.log('id', formData);
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Product successfuly updated',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500);
          }
        })
        .catch(error => {
          console.trace(error);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    } else {
      axios
        .post(`${baseURL}products`, formData, config)
        .then(res => {
          console.log(
            '🚀 ~ file: ProductForm.js ~ line 136 ~ addProduct ~ res',
            res,
          );

          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'New Product added',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500);
          }
        })
        .catch(error => {
          console.trace(error);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    }
  };

  return (
    <FormContainer title="Add Product">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: mainImage}} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{color: 'white'}} name="camera" />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text
          style={{
            textDecorationLine: 'underline',
          }}>
          Brand
        </Text>
      </View>
      <Input
        placeholder="Brand"
        name="brand"
        id="brand"
        value={brand}
        onChangeText={text => setBrand(text)}
      />
      <View style={styles.label}>
        <Text
          style={{
            textDecorationLine: 'underline',
          }}>
          Name
        </Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Count in Stock</Text>
      </View>
      <Input
        placeholder="Stock"
        name="stock"
        id="stock"
        value={countInStock}
        keyboardType={'numeric'}
        onChangeText={text => setCountInStock(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="description"
        id="description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Item picker style={{width: 200}}>
        <Picker
          mode="dropdown"
          selectedValue={pickerValue}
          style={{height: 50}}
          onValueChange={e => [setPickerValue(e), setCategory(e)]}>
          {categories.map(c => {
            return <Picker.Item key={c._id} label={c.name} value={c._id} />;
          })}
        </Picker>
      </Item>
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <EasyButton large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});
export default ProductForm;
