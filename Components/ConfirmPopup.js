import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmPopUp = ({ isVisible, message, onClose, onConfirm, close }) => {
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.closebuttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.confirmbuttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
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
    width: "80%", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  closebuttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  confirmbuttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
 
});

export default ConfirmPopUp;
