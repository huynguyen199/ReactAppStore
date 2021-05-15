import React, {useState, useEffect} from 'react';
import {
  View,
  VirtualizedView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ProductList from './ProductList';
import {Container, Header, Item, Input, Icon, Text} from 'native-base';
import SearchedProducts from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

const data = require('../../assets/data/products.json');
const ProductCategories = require('../../assets/data/categories.json');
var {width, height} = Dimensions.get('window');

const ProductContainer = props => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();

  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsCtg(data);
    setInitialState(data);
    setProductsFiltered(data);
    setFocus(false);
    setActive(-1);
    setCategories(ProductCategories);
    return () => {
      setProducts([]);
      setProductsCtg([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = text => {
    setProductsFiltered(
      products.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };
  // i.name.toLowerCase.includes(text.toLowerCase())

  const openList = () => {
    console.log('test');
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories dang loi
  const changeCtg = ctg => {
    console.log('ctg', ctg);
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(-1)]
        : [
            setProductsCtg(i => products.filter(i => i.category.$oid === ctg)),
            setActive(true),
          ];
    }
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="search" size={30} />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={text => {
              searchProduct(text);
            }}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus == true ? (
        <SearchedProducts
          navigation={props.navigation}
          productsFiltered={productsFiltered}
        />
      ) : (
        <ScrollView nestedScrollEnabled>
          <View>
            <Banner />
          </View>
          <View>
            <CategoryFilter
              categories={categories}
              categoryFilter={changeCtg}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
          </View>
          {productsCtg.length > 0 ? (
            <View>
              <FlatList
                numColumns={2}
                data={productsCtg}
                renderItem={({item}) => (
                  <ProductList
                    navigation={props.navigation}
                    key={item._id}
                    item={item}
                  />
                )}
                keyExtractor={item => item.name}
              />
            </View>
          ) : (
            <View style={[styles.center, {height: height / 2}]}>
              <Text>No Products Found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductContainer;
