import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function CrisisScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Animated GIF with frame */}
            <View style={styles.imageContainer}>
                <View style={styles.frame}>
                    <Image
                        source={require('../icons/breathing.gif')}  // Make sure the path is correct
                        style={styles.breathingGif}
                    />
                </View>
            </View>

            {/* Crisis Information */}
            <View style={styles.crisisInfoContainer}>
                <Text style={styles.crisisLabel}>Suicide Hotline: 988</Text>
                <Text style={styles.crisisLabel}>Child Abuse Hotline: 800-422-4453</Text>
                <Text style={styles.crisisLabel}>The Trevor Project: 1-866-488-7386</Text>
                <Text style={styles.crisisLabel}>Sexual Assault Hotline: 800-656-4673</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2ee',
        padding: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,  // Adjusted spacing between gif and text
    },
    frame: {
        backgroundColor: '#fff',  // Frame background to match the design
        borderRadius: 15,         // Rounded corners for the frame
        padding: 10,              // Padding between frame and gif
        shadowColor: '#000',      // Subtle shadow to make the gif pop
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    breathingGif: {
        width: 200,  // Adjusted gif size
        height: 200,
        borderRadius: 10,  // Rounded corners for the gif itself
    },
    crisisInfoContainer: {
        alignItems: 'center',
    },
    crisisLabel: {
        fontSize: 18,  // Adjusted font size for consistency
        color: '#333', // Darker font color for readability
        textAlign: 'center',
        marginBottom: 15,  // Spacing between lines
        fontWeight: '500', // Semi-bold for emphasis
    },
});