import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
} from 'native-base';

const methods = [
  {name: 'Cash on Delivery', value: 1},
  {name: 'Bank Transfer', value: 2},
  {name: 'Card Payment', value: 3},
];

const paymentCards = [
  {name: 'Wallet', value: 1},
  {name: 'Visa', value: 2},
  {name: 'MasterCard', value: 3},
  {name: 'Other', value: 4},
];

const Payment = props => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  console.log('🚀 ~ file: Payment.js ~ line 5 ~ Payment ~ props', props);

  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose your payment method</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem onPress={() => setSelected(item.value)}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}
        {/* {selected == 3 ? (
          <Picker
            mode="dropdown" */}
      </Content>
    </Container>
  );
};

export default Payment;
