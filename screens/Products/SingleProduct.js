import {Container, Footer, H1, Left, Right} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TrafficLight from '../../Shared/Form/TrafficLight';

const SingleProduct = props => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState('');

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText('Unvailable');
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText('Limited Stock');
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText('Available');
    }

    return () => {
      setAvailability(null);
      setAvailabilityText('');
    };
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{marginRight: 10}}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>
      <Footer
        style={{
          borderColor: 'white',
          backgroundColor: 'white',
        }}>
        <Left>
          <Text style={styles.price}>$ {item.price}</Text>
        </Left>
        <Right>
          <TouchableOpacity>
            <Text style={{color: '#1E90FF', fontSize: 20, margin: 10}}>
              ADD
            </Text>
          </TouchableOpacity>
        </Right>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
    backgroundColor: 'white',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    color: 'red',
    margin: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default SingleProduct;
