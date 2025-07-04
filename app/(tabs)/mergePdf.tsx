import React, {useEffect, useState} from 'react';
import {Pressable, View, Text, StyleSheet, Button} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ExpoDocumentPicker from "expo-document-picker/src/ExpoDocumentPicker";
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import DocumentItem from "@/components/DocumentItem";
import {router} from "expo-router";
import {PickedDocument} from "@/types/modal";
import {usePdfModal} from "@/contexts/PdfModalContext";


export default function MergePdf() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnabledButtonMerge, setIsEnabledButtonMerge] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<PickedDocument[]>([]);
  const [duplicatedFiles, setDuplicatedFiles] = useState<PickedDocument[]>([]);


  useEffect(() => {
    console.log('Lista aggiornata:', selectedFiles);
    if(selectedFiles.length != 0){
      setIsEnabledButtonMerge(true);
    }
    else{
      setIsEnabledButtonMerge(false);
    }
  }, [selectedFiles]);

  /**
   *  This function delete the document selected
   * @param id of document selected
   */
  function deleteDocument(id: string) {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  }




    const { setModalData, modalResult, resetModal } = usePdfModal();

    useEffect(() => {
      if (modalResult) {
        switch (modalResult.status) {
          case 'success':
            // Gestisci il successo
            console.log('PDF creato con successo', modalResult.settings);
            break;
          case 'error':
            // Gestisci l'errore
            console.error('Errore:', modalResult.error);
            break;
          case 'cancelled':
            // Gestisci la cancellazione
            console.log('Operazione annullata');
            break;
        }
        resetModal();
      }
    }, [modalResult]);

    const openPdfModal = () => {
      setModalData({
        selectedFiles: selectedFiles,
        initialSettings: {
          compression: 'high',
          outputFileName: 'documento-unito'
        }
      });
      router.push('/(tabs)/createPdfModal');
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

      <View style={{backgroundColor: 'blue', flex: 1, alignItems: 'center', justifyContent: "center", width: '100%', height: '100%'}}>
        {selectedFiles.length == 0 && <Text>No file</Text>}
        {selectedFiles.length != 0 &&
            <DraggableFlatList

                containerStyle={{height: 'auto',
                  width: 'auto',
                  backgroundColor: 'magenta',
                  padding: 10}}

                scrollEnabled={true}
                data={selectedFiles}
                onDragEnd={({ data }) => {
                  //TODO : Riorganizzare questo metodo per non dover fare un ciclo di render e creare direttamente una funzione
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
                    <DocumentItem item={item} onDrag={drag} onPress={() => deleteDocument(item.id)} isActive={isActive} />
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

      {isEnabledButtonMerge && (
          <Pressable
              style={styles.mergeButton}
              onPress={openPdfModal}
          >
              <Text>Merge</Text>
          </Pressable>
      )}

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
  mergeButton: {
    backgroundColor: 'violet',
    width: 300,
    height: 50,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 30,
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