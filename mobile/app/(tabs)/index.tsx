import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native'; // Adicione ImageBackground
import { Menu } from '@/app/components/menu';
import { Slider } from '@/app/components/slider';
import { router } from 'expo-router';

const images = [
  { id: 1, image: require('../../assets/images/slider1.png') },
  { id: 2, image: require('../../assets/images/slider2.png') },
  { id: 3, image: require('../../assets/images/slider3.png') },
  { id: 4, image: require('../../assets/images/slider4.png') },
  { id: 5, image: require('../../assets/images/slider5.png') },
];

 const gotoExplore = () => router.push('./(tabs)/explore');

export default function HomeScreen() {
  return (
    <ScrollView> 
    <ImageBackground
      source={require("../../assets/images/fundo2.png")} // Imagem de fundo
      style={styles.container}
      resizeMode="cover" // Ou "contain", "stretch", "repeat"
    >
    <View style={styles.sobMenu}></View>
         <Menu />

        <View style={styles.slider}><Slider images={images} /> </View>
    <View style={styles.cardsContainer}>
        <View style={styles.cardsWrap}>
          <Image style={styles.cardsIcons} source={require("../../assets/images/iconCards1.png")}></Image>
          <Image style={styles.cardsText} source={require("../../assets/images/textCards1.png")}></Image>
        </View>
        <View style={styles.cardsWrap}>
          <Image style={styles.cardsIcons} source={require("../../assets/images/iconCards2.png")}></Image>
          <Image style={styles.cardsText} source={require("../../assets/images/textCards2.png")}></Image>
        </View>
        <View style={styles.cardsWrap}>
          <Image style={styles.cardsIcons} source={require("../../assets/images/iconCards3.png")}></Image>
          <Image style={styles.cardsText} source={require("../../assets/images/textCards3.png")}></Image>
        </View>
        <View style={styles.cardsWrap}>
          <Image style={styles.cardsIcons} source={require("../../assets/images/iconCards4.png")}></Image>
          <Image style={styles.cardsText} source={require("../../assets/images/textCards4.png")}></Image>
        </View>
    </View>
    <View style={styles.adocaoContainer}>
        <Text style={styles.adocaoTitulo}>Pronto para Mudar uma Vida?</Text>
        <Text style={styles.adocaoText}>"Explore nossa galeria de pets incríveis e encontre o companheiro perfeito para sua família."</Text>
          <View style={styles.adocaoWrapImgs}>
              <Image style={styles.adocaoImg} source={require("../../assets/images/adocaoCachorro.png")}></Image>
              <Image style={styles.adocaoImg} source={require("../../assets/images/adocaoGato.png")}></Image>
          </View>
        <TouchableOpacity onPress={gotoExplore} style={styles.adocaoButton} activeOpacity={0.7}><Text style={styles.adocaoButtonText}>Ver pets Disponivéis</Text></TouchableOpacity>
    </View>
    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: require("../../assets/images/fundo2.png")
  },
  slider:{
    paddingTop: '17%',
  },
  sobMenu: {
    width: '100%',
    height: '8%',
    backgroundColor: '#6C087C',
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
     position: 'fixed',
    top: 0,
    left: 0
  },
  cardsContainer: {
    display: 'flex',
    paddingLeft: '5%',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '8%'
  },
  cardsWrap: {
    display: 'flex',
    flexDirection: 'row',
    gap: '15%',
    marginBottom: '10%'
  },
  cardsIcons: {
    width: 95,
    height: 95
  },
  cardsText: {
    width: 194,
    height: 112
  },
  adocaoContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white'
  },
  adocaoTitulo: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    paddingBottom: '5%',
    paddingTop: '6%'
  },
  adocaoText: {
      fontSize: 15,
      textAlign: 'center',
      color: 'white',
      paddingBottom: '7%',
  },
  adocaoWrapImgs: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '15%',
    paddingBottom: '12%'
  },
  adocaoImg: {
    width: 148,
    height: 140
  },
 adocaoButton: {
    backgroundColor: '#C9A0DC',
    paddingVertical: 12,
    paddingHorizontal: 27,
    borderRadius: 15, 
    alignSelf: 'center', 
    marginBottom: '20%',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, 
    borderWidth: 2,
    borderColor: '#FFFFFF', 
    minWidth: 250, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  adocaoButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});