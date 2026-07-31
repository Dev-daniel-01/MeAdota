import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Menu } from '@/app/components/menu';
import { Slider } from '@/app/components/slider';
import { Footer } from '../components/footer';
import { router } from 'expo-router';

const images = [
  { id: 1, image: require('../../assets/images/slider1.png') },
  { id: 2, image: require('../../assets/images/slider2.png') },
  { id: 3, image: require('../../assets/images/slider3.png') },
  { id: 4, image: require('../../assets/images/slider4.png') },
  { id: 5, image: require('../../assets/images/slider5.png') },
];

const gotoExplore = () => router.push('/(tabs)/explore');

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Menu />

      <View style={styles.heroWrap}>
        <Slider images={images} />
        <View style={styles.heroOverlay} pointerEvents="none" />
        <View style={styles.heroContent} pointerEvents="box-none">
          <Text style={styles.heroTitle}>Encontre seu novo melhor amigo</Text>
          <Text style={styles.heroSubtitle}>
            Dezenas de pets esperando por um lar cheio de amor.
          </Text>
          <TouchableOpacity onPress={gotoExplore} style={styles.heroButton} activeOpacity={0.8}>
            <Text style={styles.heroButtonText}>Ver pets para adoção</Text>
          </TouchableOpacity>
        </View>
      </View>

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
        <Text style={styles.adocaoText}>Explore nossa galeria de pets incríveis e encontre o companheiro perfeito para sua família.</Text>
        <View style={styles.adocaoWrapImgs}>
          <Image style={styles.adocaoImg} source={require("../../assets/images/adocaoCachorro.png")}></Image>
          <Image style={styles.adocaoImg} source={require("../../assets/images/adocaoGato.png")}></Image>
        </View>
        <TouchableOpacity onPress={gotoExplore} style={styles.adocaoButton} activeOpacity={0.7}><Text style={styles.adocaoButtonText}>Ver pets Disponivéis</Text></TouchableOpacity>
      </View>
      <Footer></Footer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    height: 'auto',
    backgroundColor: '#FFFFFF',
  },
  heroWrap: {
    marginTop: 60,
    position: 'relative',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 10, 30, 0.42)',
  },
  heroContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 999,
    marginTop: 22,
  },
  heroButtonText: {
    color: '#55187A',
    fontSize: 14,
    fontWeight: '700',
  },
  cardsContainer: {
    display: 'flex',
    paddingLeft: '5%',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '8%',
    backgroundColor: '#F6F2FA',
    paddingTop: '8%',
    paddingBottom: '4%',
  },
  cardsWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#FFFFFF',
  },
  adocaoTitulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#221A2E',
    textAlign: 'center',
    paddingBottom: '5%',
    paddingTop: '6%'
  },
  adocaoText: {
      fontSize: 15,
      textAlign: 'center',
      color: '#564D61',
      paddingHorizontal: '8%',
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
    height: 140,
    borderRadius: 18,
  },
 adocaoButton: {
    backgroundColor: '#6D28D9',
    paddingVertical: 14,
    paddingHorizontal: 27,
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: '20%',
    marginTop: 10,
    shadowColor: '#221A2E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adocaoButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
