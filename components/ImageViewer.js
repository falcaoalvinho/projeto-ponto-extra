//Imports das Libs para o componente
import { Image, StyleSheet } from "react-native"

//Função para Imagem principal da tela App
export function ImageViewer({ placeholderImageSource, selectedImage}) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={styles.image} />;
}

//Folha de estilo do Componente
const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18
      }
})