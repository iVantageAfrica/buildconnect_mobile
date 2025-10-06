import PrimaryButton from '@/src/components/Button';
import Spacer from '@/src/components/Spacer';
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from "../../../constants/colors";
import strings from "../../../constants/strings";


const handleLogin = {}

const SignInScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [secureText, setSecureText] = useState(true);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.color_white,
        },

        alignCneter: {
            justifyContent: "center",
            alignItems: "center",
            marginStart: 16,
            marginEnd: 16
        },

        logo: {
            width: 230,
            height: 80,
            resizeMode: 'contain',
        },

        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text_title
        },

        bodyText: {
            fontSize: 12,
            fontWeight: 'normal',
            color: colors.text_body
        },

        formText: {
            fontSize: 16,
            marginTop: 16,
            fontWeight: "normal",
            textAlign: "left",
        },

        alignStart: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginStart: 16,
            marginEnd: 16,
            marginTop: 20
        },

        textInputStyle: {
            height: 50,
            width: "100%",
            marginTop: 12,
            paddingStart: 10,
            fontSize: 16,
            color: colors.text_body,
            borderRadius: 10,
            borderColor: colors.textOutlineColor,
            borderWidth: 1
        }

    })

    return (
        <View style={styles.container}>

            <Spacer height={80} />

            <View style={styles.alignCneter}>
                <Image source={require('../../../assets/images/app_logo_colored.png')} style={styles.logo} />

                <Text style={styles.title}>{strings.welcome}</Text>

                <Text style={{ fontSize: 18, fontWeight: 'normal', marginTop: 16 }}>
                    {strings.signInToContinue}
                </Text>
            </View>

            <View style={styles.alignStart}>

                <Text style={styles.formText}>{strings.email}</Text>

                <TextInput style={styles.textInputStyle} onChangeText={setEmail} value={email} />

                <Text style={styles.formText}>{strings.password}</Text>

                <View style={{ flexDirection: "row" }}>
                    <TextInput style={styles.textInputStyle} value={password} onChangeText={setPassword} secureTextEntry={secureText} />

                    <TouchableOpacity
                        style={{ width: 24, height: 24, position: 'absolute', right: 16, top: 25 }} onPress={() => setSecureText(!secureText)} >

                        <Image
                            source={
                                secureText
                                    ? require("../../../assets/images/showPasswordIcon.png")
                                    : require("../../../assets/images/hidePasswordIcon.png")
                            }
                            style={{ height: 24, width: 24 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.alignCneter}>
                <PrimaryButton title={strings.continue} onPress={() => handleLogin}
                    backgroundColor={colors.primary_color} style={{ marginTop: 35, marginStart: 16, marginEnd: 16 }}
                    textColor={colors.white} />

                <Text style={{ fontSize: 16, color: colors.primary_color, marginTop: 16 }}>{strings.reset_password}</Text>
            </View>

            <View style={{ position: 'absolute', bottom: 20, width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                <View
                    style={{
                        width: "90%",
                        height: 0.2,
                        backgroundColor: colors.textOutlineColor,
                        alignSelf: 'center'
                    }}
                />
                <Text style={{ fontSize: 14, color: colors.text_body, marginTop: 16 }}>
                    {strings.no_account_question}{" "}
                    <Text
                        style={{ color: colors.primary_color, fontWeight: "bold" }}
                        onPress={() => {
                            console.log("Clickable text pressed!");
                            //navigation.navigate("SignUp")
                        }}
                    >
                        {strings.signUp}
                    </Text>
                </Text>
            </View>
        </View>
    );

}

export default SignInScreen;

