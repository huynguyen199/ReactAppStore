import React, {useState, useEffect} from 'react';
import {
  View,
  VirtualizedView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import ProductList from './ProductList';
import {Container, Header, Item, Input, Icon, Text} from 'native-base';
import SearchedProducts from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

const data = require('../../assets/data/products.json');
const ProductCategories = require('../../assets/data/categories.json');

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState();
  const [active, setActive] = useState();

  const [initialState, setInitialState] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setActive(-1);
    setCategories(ProductCategories);
    return () => {
      console.log('return effect');
      setProducts([]);
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
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [setProductsCtg(i => i.category._id === ctg, setActive(true))];
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
        <SearchedProducts productsFiltered={productsFiltered} />
      ) : (
        <ScrollView>
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
          <FlatList
            numColumns={2}
            data={products}
            renderItem={({item}) => <ProductList key={item.id} item={item} />}
            keyExtractor={item => item.name}
          />
        </ScrollView>
      )}
    </Container>
  );
};

export default ProductContainer;
