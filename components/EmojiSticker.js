//Imports das Libs para o componente
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

//Função de retorno para componente EmojiSticker
export default function EmojiSticker({ imageSize, stickerSource }) {
    //Variáveis que armazenam as propriedades do EmojiSticker gerado em tela via pros em JSObject
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    //Função para 'Touble Tap' no EmojiSticker, faz ele dobrar de tamanho, e voltar ao normal se já o tiver feito
    const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
        if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
        }
        else if (scaleImage.value == imageSize * 2){
            scaleImage.value = scaleImage.value / 2;
        }
    });

    //Função que apica e estilo animado de 'Double Tap' no EmojiSticker
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    //Função para 'Drag' alterar os valores de posicionamento em formato cartesiano 'X' e 'Y' do EmojiSticker dentro da ImageViewer
    const drag = Gesture.Pan()
    .onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
    });

    //Folha de estilo que atribui no EmojiSticker os efeitos de animção da função drag
    const containerStyle = useAnimatedStyle(() => {
        return {
        transform: [
            {
            translateX: translateX.value,
            },
            {
            translateY: translateY.value,
            },
        ],
        };
    });

    //Retorno do componente EmojiSticker
    return (
    <GestureDetector gesture={drag}>
        <Animated.View style={[containerStyle, { top: -350 }]}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image
                    source={stickerSource}
                    resizeMode="contain"
                    style={[imageStyle, { width: imageSize, height: imageSize }]}
                />
            </GestureDetector>
        </Animated.View>
    </GestureDetector>
    );
}
