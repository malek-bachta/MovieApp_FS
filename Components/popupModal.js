import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FavoriteModal = ({ isVisible, message, onClose, close }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={() => { close() }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
});

export default FavoriteModal;
