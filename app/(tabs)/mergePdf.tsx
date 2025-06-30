import React, {useEffect, useState} from 'react';
import { Pressable, View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ExpoDocumentPicker from "expo-document-picker/src/ExpoDocumentPicker";
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from "react-native-gesture-handler";

type PickedDocument = {
  id: string,
  mimeType: string,
  name: string,
  size: number,
  uri: string,
}


export default function MergePdf() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<PickedDocument[]>([]);
  const [duplicatedFiles, setDuplicatedFiles] = useState<PickedDocument[]>([]);


  useEffect(() => {
    console.log('Lista aggiornata:', selectedFiles);
  }, [selectedFiles]);


  const pickDocument = async () => {
    try {
      // Resetto la lista dei file duplicati

      setDuplicatedFiles([])


      // TODO: Controllare se il dispositivo ha concesso i permessi di lettura e scrittura (Modificabile nella sezione di impostazioni del dispositivo e nel Settings)

      // Ottengo i file dalla memoria interna del dispositivo

      const result = await ExpoDocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'image/*',
          'text/plain',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        multiple: true,
        copyToCacheDirectory: true
      });

      if (result.assets) {
        // Mi prendo la lunghezza della lista per ottenere l'indice del file (se l'array non è vuoto)
        var index = '0';

        if(selectedFiles.length != 0){
          index = (selectedFiles.length).toString();
        }

        const newFiles: PickedDocument[] = [];

        result.assets.forEach((asset: { size: number; type: string; name: string; uri: string; }) => {


          // Controllo presenza duplicati
          const duplicateFile = selectedFiles.find(file => file.uri === asset.uri);
          if (duplicateFile) {
            setDuplicatedFiles(prevFiles => [...prevFiles, duplicateFile]);
            return;
          }

          var newFile: PickedDocument = {
            id: index,
            mimeType: asset.type,
            name: asset.name,
            size: asset.size,
            uri: asset.uri,
          }

          newFiles.push(newFile);

          index = (parseInt(index) + 1).toString();
        })


        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
      }
    } catch (err) {
      console.error('Errore nella selezione del file:', err);
    }
  };



  const menuItems = [
    {
      title: 'File dal dispositivo',
      icon: 'folder-outline',
      onPress: pickDocument
    },
    {
      title: 'Scannerizza documenti',
      icon: 'scan-outline',
      onPress: pickDocument
    },
    {
      title: 'Testo to PDF',
      icon: 'document-text-outline',
      onPress: pickDocument
    },
  ];

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={{flex: 1}}>

      <View style={{backgroundColor: 'blue', flex: 1, alignItems: 'center', justifyContent: "center"}}>
        {selectedFiles.length == 0 && <Text>No file</Text>}
        {selectedFiles.length != 0 &&
            <DraggableFlatList
                data={selectedFiles}
                onDragEnd={({ data }) => {
                  const updatedData = data.map((item, index) => ({
                    ...item,
                    id: index.toString() // Ora partiamo da 0
                  }));
                  // Resettiamo completamente lo stato
                  setSelectedFiles([]); // Prima svuotiamo
                  // Nel prossimo ciclo di render, aggiorniamo con i nuovi dati
                  requestAnimationFrame(() => {
                    setSelectedFiles(updatedData);
                  });

                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item, drag, isActive }) => (
                    <Pressable
                        key={item.id}
                        style={{
                          padding: 20,
                          backgroundColor: isActive ? '#ccc' : '#f2f2f2',
                          marginBottom: 8,
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}
                        onLongPress={drag}
                    >
                      <Text style={{marginRight: 10, fontWeight: 'bold'}}>
                        {parseInt(item.id) + 1}. {/* Aggiungiamo 1 solo per la visualizzazione */}
                      </Text>
                      <Text>{item.name}</Text>
                    </Pressable>
                )}
            />


        }
      </View>



      {isMenuOpen && (
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable 
              key={index}
              style={styles.menuItem}
              onPress={() => {
                // Gestire l'azione qui
                setIsMenuOpen(false);
                item.onPress();
              }}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={24} color="white" />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}

      <Pressable 
        style={styles.mainButton}
        onPress={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Ionicons name={'add-outline'} size={24} color="white"/>
      </Pressable>
    </View>
        </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 0,
  },
  menuItem: {
    marginBottom: 10,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: 'red',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});