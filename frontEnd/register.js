import React, { Component } from 'react';
import { StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  AsyncStorage,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';


ACCESS_TOKEN = 'access_token';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      errors: [],
    }
    this.storeToken = this.storeToken.bind(this);
    this.getToken = this.getToken.bind(this)
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch(error){
      console.log('error:', error)
      console.log('accessToken:', accessToken)
      console.log("something went wrong")
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem(ACCESS_TOKEN);
    } catch(error){
      console.log("something went wrong")
    }
  }
  async onRegisterPressed() {
    { fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        })
      })
      .then( (res) => {
        console.log(res)
        if (res.status >= 200 && res.status < 300) {
        this.setState({error: ""});
        let accessToken = JSON.parse(res._bodyText).accessToken;
        this.storeToken(accessToken);
        console.log("res token: " + accessToken);
        Actions.form();
      } 
    })
      .catch(errors => {
        console.log(errors)
      console.log("catch errors: " + errors);
      let formErrors = JSON.parse(errors);
      let errorsArray = [];
      for(let key in formErrors) {
        if(formErrors[key].length > 1) {
          formErrors[key].map(error => errorsArray.push(`${key} ${error}`))
        } else {
          errorsArray.push(`${key} ${formErrors[key]}`)
        }
      }
      this.setState({errors: errorsArray});
    })
  }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Meet Pets now!
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} placeholder="Name">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>
        <Errors errors={this.state.errors} />
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
    {props.errors.map((error, i) => <Text key={i} style={styles.error}>{error}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Register