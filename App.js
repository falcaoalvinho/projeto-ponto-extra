//Imports das Libs do Projeto
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef} from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

//Imports de Elementos e Objetos próprios dop Projeto
import { ImageViewer } from './components/ImageViewer';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceHolderImage = require('./assets/images/background-image.png');

//Função default para execução do App
export default function App() {
  //useRef para
  const imageRef = useRef();

  //useState para gestão da ImageViewer
  const [selectedImage, setSelectedImage] = useState(null);

  //useState para mudança de imagens se função pickImageAsync for completa
  const [showAppOptions, setShowAppOptions] = useState(false);

  //useState que determina se o modal EmojiPicker é visível
  const [isModalVisible, setIsModalVisible] = useState(false);

  //useState que
  const [pickedEmoji, setPickedEmoji] = useState(null);

  //useState que
  const [status, requestPermission] = MediaLibrary.usePermissions();

  //Função que reseta os valores do UseState showAppOptions para false retornando para o modelo inicial da página
  const onReset = () => {
    setShowAppOptions(false);
  };

  //Função que torna modal EmojiPicker visível
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Função que retorna o modal EmojiPicker para o modo Invisível
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  //Função para ImagePicker linkada no botão com theme='primary
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  if (status === null) {
    requestPermission();
  }

  

  //Retorno da Interface do App
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer 
              placeholderImageSource={PlaceHolderImage}
              selectedImage={selectedImage}
              />
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
          ) : (
            <View style={styles.footerContainer}>
              <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
              <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
            </View>
          )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style='auto'/>
      </View>
    </GestureHandlerRootView>
  );
}



//Folha de estilo principal do Projeto
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

