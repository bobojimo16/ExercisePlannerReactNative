import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import {LoginInput} from '../components/LoginInput'
import firebase from "firebase";


export default class SignUpScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }


    }

    static navigationOptions = ({navigation}) => ({
        title: 'Sign Up',
    });

    handleRegister() {
        console.log(this.props);
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( () => {
                console.log('registered');
                var user = {id: firebase.auth().currentUser.uid, plans: [{name: 'My First Plan'}]};
                var eReference = firebase.database().ref('users/');
                var eRefereneceRegister = eReference.push();
                eRefereneceRegister.set(
                    user
                ).catch(error => console.log(error) );

                this.props.navigation.navigate('Login');
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });

    }


    render() {

        /* if (!this.state.loaded) {
             return null;
         }*/


        return (
            <View style={styles.container}>

                <LoginInput
                    label={'Email'}
                    placeholder={'Enter Your Email Here'}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />

                <LoginInput
                    label={'Password'}
                    placeholder={'Enter Your Password'}
                    secureTextEntry
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />

                <Button
                    title="Sign Up"
                    onPress={() => this.handleRegister()}
                />

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    exerciseImage: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    instructionsContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    instructionsText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    exersises: {
        marginTop: 15,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    muscleSelector: {
        marginTop: 15,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    equiptmantSelector: {
        marginTop: 15,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

