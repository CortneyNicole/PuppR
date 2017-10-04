import React, { Component } from 'react';
import { Text, View, Picker, Button, TextInput, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Actions } from 'react-native-router-flux';
import CarouselExample from './ShowCarousel';
import axios from 'axios';
import faves from './faves.jpg';
import logo from './logo.png';

class Form extends Component {
  static onEnter = () => {
    Actions.refresh()
  }


  constructor(props){
    super(props);
    this.state = {
      size: '',
      age: '',
      sex: '',
      results: [],
      location: ''
    };
    this.dogSearcher = this.dogSearcher.bind(this);
  };

  dogSearcher = () => {
    axios.get('http://localhost:3000/petfinder/index', {
      params: {
        age: this.state.age,
        size: this.state.size,
        sex: this.state.sex,
        location: this.state.location
      }
    })
    .then( (response) => {
      this.setState({
        results: response.data
      });
      Actions.flip(dogs=this.state.results);
    })
    .catch(error => console.log(error))
  }


render(){
  let sizeData = [{
    value: 'S',
  }, {
    value: 'M',
  }, {
    value: 'L'
  }];

  let ageData = [{
    value: 'Baby',
  }, {
    value: 'Young',
  }, {
    value: 'Adult'
  }, {
    value: 'Senior'
  }];

  let sexData = [{
    value: 'F',
  }, {
    value: 'M'
  }];



  return (
        <View style={styles.formContainer}>
        <View style={styles.locationContainer}>
              <Image style={styles.imageStyle} source={logo} />

          <Text style={styles.locationTitle}>Find Nearest Shelter</Text>

          <TextInput
            textAlign="center"
            selectionColor="#B8B8C4"
            itemColor="#9E59D3"
            animationDuration={5}
            maxLength={5}
            placeholder="Enter Your Zipcode"
            onChangeText={(location) => this.setState({location})}
          />
        </View>

      <Dropdown
      label='Select Size'
      data={sizeData}
      onChangeText={(value, index, data) => this.setState({size:value})}
      />

      <Dropdown
      label='Select Age'
      data={ageData}
      onChangeText={(value, index, data) => this.setState({age:value})}
      />

      <Dropdown
      label='Select Sex'
      data={sexData}
      onChangeText={(value, index, data) => this.setState({sex:value})}
      />

      <View style={styles.buttonStyle}>
        <Button title="Submit" color="#74F363" onPress={() => this.dogSearcher()}/>
      </View>

      <View style={styles.buttonStyle}>
        <Button title="View Favorites" color="#74F363" onPress={() => Actions.favorites()}/>
      </View>


  </View>
    );
  };
};

const styles = {
  locationContainer: {
    marginTop: 100,
    alignItems: 'center'
  },
  locationTitle: {
    fontSize: 18,
    color: '#BBB193'
  },
  formContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  imageStyle: {
    width: 375,
    height: 150,
    marginBottom: 10
  },
  buttonStyle: {
    borderWidth: 2,
    borderColor: '#F3E263',
    marginLeft: 90,
    marginRight: 90,
    borderRadius: 5,
    marginTop: 10
  }
};

export default Form;
