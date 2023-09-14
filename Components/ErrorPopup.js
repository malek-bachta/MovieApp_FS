import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ErrorPopup = ({ isVisible, message, onClose, close }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={() => {
          close();
        }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
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
    borderRadius: 10, 
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20, 
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});

export default ErrorPopup;
