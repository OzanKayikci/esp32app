import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  StatusBar,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSuccess = e => {
    console.log(e.data);
    this.props.setQr(e.data);
    this.props.closeQr(false);
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        showMarker={true}
        topContent={
          <Text
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}>
            Qr Kodu Okutun
          </Text>
        }
        bottomContent={
          <View style={{}}>
            <TouchableOpacity
              style={[
                {
                  width: 100,
                  height: 50,

                  borderRadius: 18,
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                  backgroundColor: 'grey',
                },
              ]}
              onPress={() => this.props.closeQr(false)}>
              <Text style={{textAlign: 'center', color: 'white'}}>Kapat</Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}

async function sendData(name,surname,qr){
  console.log("name surname qr : ", name, surname, qr)
 await fetch(`http://192.168.1.101/?name=${name}&surname=${surname}&address=null&qr=${qr}`).then((info)=>{
  console.log("infoo", info)
 })
}

const App = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [qr, setQr] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor="#121212"
        barStyle={'light-content'}
        showHideTransition={'fade'}
        hidden={false}
      />
      <ScrollView style={styles.container}>
        <View style={styles.InputContainer}>
          <View style={styles.InputArea}>
            <Text style={styles.inputLabel}>Adınız:</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={value => {
                setName(value);
              }}
              placeholder="Adınızı Giriniz"
              placeholderTextColor={'grey'}></TextInput>
            {name.length > 0 && name.length < 3 ? (
              <Text style={[ {color: 'red'}]}>
                İsim en az 3 karakterden oluşmalı
              </Text>
            ) : null}
          </View>
          <View style={styles.InputArea}>
            <Text style={styles.inputLabel}>Soyadınız:</Text>
            <TextInput
              style={styles.textInput}
              value={surname}
              onChangeText={value => {
                setSurname(value);
              }}
              placeholder="Soyadınızı Giriniz"
              placeholderTextColor={'grey'}></TextInput>
               {surname.length > 0 && surname.length < 3 ? (
              <Text style={[ {color: 'red'}]}>
                Soyisim  en az 3 karakterden oluşmalı
              </Text>
            ) : null}
          </View>

          <View style={styles.buttonArea}>
            {qr.length > 0 ? (
              <View style={styles.InputArea}>
                <Text style={[styles.inputLabel]}>Taranan Kod:</Text>
                <Text style={styles.inputLabel}>{qr}</Text>
              </View>
            ) : (
              <Text style={[styles.inputLabel, {color: 'red'}]}>
                Lütfen bir qr kodu okutun
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}>
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Qr Tara</Text>
            </View>
          </TouchableOpacity>
        </View>
        {name.length > 2 && surname.length > 2 && qr.length > 0 ? (
          <View style={{marginTop: 50, alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                sendData(name,surname,qr);
              }}>
              <View style={[styles.buttonView, {backgroundColor: '#0de0a1'}]}>
                <Text style={styles.buttonText}>Kaydet</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginTop: 50, alignItems: 'center'}}>
            <Text style={[styles.inputLabel, {color: 'red'}]}>
              Lütfen Tüm Bilgileri Eksiksiz Giriniz
            </Text>
          </View>
        )}
      </ScrollView>

      {/* //?Qr modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <ScanScreen closeQr={setModalVisible} setQr={setQr} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,

    backgroundColor: '#121212',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonArea: {marginTop: 50, flex: 2, width: '100%', alignItems: 'center'},

  button: {
    width: '60%',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#BACFC0',
  },
  buttonView: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#BACFC0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 21,
    color: '#121212',
  },
  buttonTouchable: {
    padding: 16,
  },
  InputContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  InputArea: {
    width: '80%',
    height: 100,
    marginBottom:20
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#CFBABA',
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 20,
    marginVertical: '2%',
    color: '#CFBABA',
  },

  //? modal style
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(200,200,200,1)',
  },
  modalView: {
    margin: 20,
    width: '80%',
    height: '92%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default App;
