import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Switch} from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { usePdfModal } from '@/contexts/PdfModalContext';
import { PdfService } from '@/services/pdfService';
import { PdfSettings } from '@/types/modal';
import {Picker} from "@react-native-picker/picker";
import ExpoDocumentPicker from "expo-document-picker/src/ExpoDocumentPicker";
import * as FileSystem from 'expo-file-system';


export default function CreatePdfModal() {
    const { modalData, setModalResult } = usePdfModal();
    const [settings, setSettings] = useState<PdfSettings>({
        compression: 'medium',
        isLocked: false,
        outputFileName: 'merged-pdf',
        saveLocation: FileSystem.documentDirectory?.toString()
        // Directory predefinita
    });
    const [isProcessing, setIsProcessing] = useState(false);


    useEffect(() => {
        if (!modalData?.selectedFiles) {
            handleClose('cancelled');
        }
    }, [modalData]);

    const handleClose = (status: 'success' | 'cancelled' | 'error', error?: string) => {
        setModalResult({
            status,
            settings: status === 'success' ? settings : undefined,
            error
        });
        router.back();
    };

    const handleSubmit = async () => {
        try {
            setIsProcessing(true);

            if (!modalData?.selectedFiles) {
                throw new Error('Nessun file selezionato');
            }

            PdfService.validateSettings(settings);

            await PdfService.mergePdfFiles(
                modalData.selectedFiles,
                settings
            );

            handleClose('success');
        } catch (error) {
            handleClose('error', error instanceof Error ? error.message : 'Errore sconosciuto');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Animated.View entering={FadeIn} style={styles.container}>
            <Pressable
                style={StyleSheet.absoluteFill}
                onPress={() => handleClose('cancelled')}
            />
            <Animated.View
                entering={SlideInDown}
                style={styles.modalContent}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Crea PDF</Text>
                    <Pressable onPress={() => handleClose('cancelled')}>
                        <Text>✕</Text>
                    </Pressable>
                </View>

                {/* Form per le impostazioni */}
                <View style={styles.form}>
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Nome file</Text>
                            <TextInput
                                style={styles.input}
                                value={settings.outputFileName}
                                onChangeText={(text) => setSettings({...settings, outputFileName: text})}
                                placeholder="Nome del file PDF"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Compressione</Text>
                            <Picker
                                selectedValue={settings.compression}
                                onValueChange={(value) => setSettings({...settings, compression: value})}
                                style={styles.picker}
                            >
                                <Picker.Item label="Alta" value="high" />
                                <Picker.Item label="Media" value="medium" />
                                <Picker.Item label="Bassa" value="low" />
                            </Picker>
                        </View>

                        <View style={styles.formGroup}>
                            <View style={styles.checkboxContainer}>
                                <Switch
                                    value={settings.isLocked}
                                    onValueChange={(value) => setSettings({...settings, isLocked: value})}
                                />
                                <Text style={styles.label}>Proteggi PDF con password</Text>
                            </View>
                        </View>

                        {settings.isLocked && (
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    value={settings.password}
                                    onChangeText={(text) => setSettings({...settings, password: text})}
                                    secureTextEntry
                                    placeholder="Inserisci password"
                                />
                            </View>
                        )}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Posizione di salvataggio</Text>
                            <View style={styles.locationContainer}>
                                <Text style={styles.locationText} numberOfLines={1}>
                                    {settings.saveLocation || 'Posizione predefinita'}
                                </Text>
                                <Pressable
                                    style={styles.locationButton}
                                    onPress={async () => {
                                        try {
                                            // Nota: su iOS questo potrebbe avere limitazioni
                                            const result = await ExpoDocumentPicker.getDocumentAsync({
                                                type: '*/*',
                                                copyToCacheDirectory: false,
                                                multiple: false
                                            });

                                            if (result.assets && result.assets[0]) {
                                                const directory = result.assets[0].uri.split('/').slice(0, -1).join('/');
                                                setSettings({...settings, saveLocation: directory});
                                                console.log(settings)
                                            }
                                        } catch (error) {
                                            console.error('Errore nella selezione della directory:', error);
                                        }
                                    }}
                                >
                                    <Text style={styles.locationButtonText}>Scegli</Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>

                </View>

                <View style={styles.footer}>
                    <Pressable
                        style={[styles.button, isProcessing && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={isProcessing}
                    >
                        <Text style={styles.buttonText}>
                            {isProcessing ? 'Elaborazione...' : 'Crea PDF'}
                        </Text>
                    </Pressable>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {        // era chiamato 'overlay' ma usato come 'container'
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    form: {
        flex: 1,
    },
    footer: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        backgroundColor: '#14B4A9',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
    },
    locationText: {
        flex: 1,
        fontSize: 16,
    },
    locationButton: {
        backgroundColor: '#14B4A9',
        padding: 8,
        borderRadius: 5,
    },
    locationButtonText: {
        color: 'white',
        fontSize: 14,
    }

});
