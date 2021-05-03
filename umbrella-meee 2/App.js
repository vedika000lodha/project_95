import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import {createSwitchNavigator} from 'react-navigation';

export default class App extends Component {
   //adding a state to get the weather through it
   constructor() {
    super();
    this.state = {
      weather: '',
    };
  }

  getWeather = async () => {
    //change latitude and longitude
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          weather: responseJson,
        });
        console.log(this.state.weather)
      })
      .catch(error => {
        console.error(error);
      });
  };

  //to make sure the component is working or has been mounted in the app
  componentDidMount = () => {
    this.getWeather();
  };

 render() {
    if (this.state.weather === '') {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
           
           <Text style = {{fontSize : 30, marginTop : 10, color : ''}}> Umbrella Me </Text>
            
            {/*getting the app main image*/}
            <Image
      source = {require('./assets/umb.gif')}
      style = {{width : "60%", height : 90, marginTop : 30}}
       />
            {/*getting temprature*/}
            <View>
            <Text style={{ fontSize: 18, marginTop : 80, color : '#c9ddff', fontFamily : ""}}>
              Temprature : {this.state.weather.main.temp}&deg;C
            </Text>
            </View>
            
            {/*getting humidity*/}
            <View>
            <Text style={{ fontSize: 20, margin:10, color : '#a3bce6', fontFamily : "bold"}}>
              Humidity : {this.state.weather.weather[0].description}
            </Text>
            </View>
            
            {/*getting the main i.e if its gonna rain or not, technically the weather */}
            <View>
            <Text style={{fontSize: 20, color : '#43546b', fontFamily : "bold"}}>
              {this.state.weather.weather[0].main}
              </Text>
            </View>
            
            {/*this is for the text to show up and tell the user if they take an umbrella with them or not */}
            <View>
              {this.state.weather.weather[0].main.toLowerCase() === "rain"
                ?(
                  <View>
                  <Text style = {{marginTop : 30, fontFamily : "bold", fontSize : 20, textAlign : 'center', color : '#ccd8e8'}}>Taking an umbrella would be good today...unless you like get drenched</Text>
                  </View>
                )
                :(
                  <View>
                    <Text style = {{marginTop : 30, fontFamily : "bold", fontSize : 20, textAlign : 'center', color : '#ccd8e8'}}>Let ur poor umbrella rest at home mate</Text>
                  </View>
                )
              }
            </View>

              {/*this is the for the bottom image to show up */}
             <Image
      source = {require('./assets/rain.gif')}
      style = {{width : "90%", height : 110, marginTop : 30}}
       />
          </View>
          </View>    
      );
    }
  }
}

/*to give attributes*/
const styles = StyleSheet.create({
  container: {
   flex:1,
   backgroundColor : '#718299'
  },
  subContainer : { 
    flex: 1, 
    borderWidth: 1, 
    alignItems: 'center' 
    },
});