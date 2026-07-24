import { Image, StyleSheet, View } from 'react-native';

export const Footer = () => {
    return (
        <>
            <View style={styles.footer}>
                <Image 
                    source={require('@/assets/images/footer.png')} 
                    style={styles.footerImg} 
                 
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: "100%",
        height: 50, 
        backgroundColor: '#6C087C',
        alignItems: "center",
        justifyContent: "center"
    },
    footerImg: {
        resizeMode: "contain",
    }
});
