import { Image, StyleSheet, Text, View } from 'react-native';

export const Footer = () => {
    return (
        <>
            <View style={styles.footer}>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.footerLogo}
                />
                <Text style={styles.footerText}>@2025 direitos reservados</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: "100%",
        minHeight: 56,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#DDD2E6',
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        gap: 6,
    },
    footerLogo: {
        width: 44,
        height: 32,
        resizeMode: "contain",
        tintColor: '#55187A',
    },
    footerText: {
        color: '#564D61',
        fontSize: 12,
        fontWeight: '500',
    },
});
