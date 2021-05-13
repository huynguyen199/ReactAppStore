import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

var {width} = Dimensions.get('window');

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
      'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
      'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper
          style={{height: width / 2}}
          showButtons={false}
          autoplay={true}
          autoplayTimeout={2}>
          {bannerData.map(item => {
            return (
              <Image
                key={item}
                style={styles.imageBanner}
                resizeMode="contain"
                source={{uri: item}}
              />
            );
          })}
        </Swiper>
        <View style={{height: 20}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  swiper: {
    width: width,
    height: 200,
    alignItems: 'center',
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    // height: 200,
    // width: 200,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;
