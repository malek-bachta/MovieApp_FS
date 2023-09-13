import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Button,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import Input from "./Input";
import { MovieContext } from "../../store/context/Movie-context";
import { useNavigation } from "@react-navigation/native";
import ErrorPopup from "../ErrorPopup";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Hindi", value: "hi" },
  { label: "Italian", value: "it" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Polish", value: "pl" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Spanish", value: "es" },
  { label: "Turkish", value: "tr" },
];

function MovieForm() {
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // Validation state variables for each input
  const [isTitleValid, setTitleValid] = useState(true);
  const [isDescriptionValid, setDescriptionValid] = useState(true);
  const [isVoteAverageValid, setVoteAverageValid] = useState(true);
  const [isVoteCountValid, setVoteCountValid] = useState(true);
  const [isRunTimeValid, setRunTimeValid] = useState(true);

  const [ErrorModal, setErrorModal] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    if (!showDatePicker) {
      setSelectedDate(null);
    }
  };
  const formattedReleaseDate = releaseDate.toISOString().split("T")[0]; // Format the date as "YYYY-MM-DD"

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].value);
  const { addMovie } = useContext(MovieContext);
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    language: "",
    vote_average: "",
    vote_count: "",
    run_time: "",
    poster_path: null,
    release_date: formattedReleaseDate,
  });
  const navigation = useNavigation();
  const handleAddMovie = async () => {
    // Validation checks
    let isValid = true;

    if (inputValues.title.trim() === "") {
      setTitleValid(false);
      isValid = false;
      setErrorMessage("Title cannot be empty");
    } else {
      setTitleValid(true);
    }

    if (inputValues.description.trim() === "") {
      setDescriptionValid(false);
      isValid = false;
      setErrorMessage("Description cannot be empty");
    } else {
      setDescriptionValid(true);
    }

    if (isNaN(parseFloat(inputValues.vote_average)) || inputValues.vote_average < 0 || inputValues.vote_average > 10) {
      setVoteAverageValid(false);
      isValid = false;
      setErrorMessage("Vote must be between 0 and 10");

    } else {
      setVoteAverageValid(true);
    }

    if (isNaN(parseInt(inputValues.vote_count))) {
      setVoteCountValid(false);
      isValid = false;
      setErrorMessage("number of reviews must be a number");
    } else {
      setVoteCountValid(true);
    }

    if (isNaN(parseInt(inputValues.run_time))) {
      setRunTimeValid(false);
      isValid = false;
      setErrorMessage("Run time must be a number");
    } else {
      setRunTimeValid(true);
    }
    if (!inputValues.poster_path) {
      isValid = false;
      setErrorMessage("Please pick an image");
      // toggleModal();
    }

    const currentDate = new Date();
    if (selectedDate > currentDate) {
      isValid = false;
      setErrorMessage("Release date cannot be in the future");
      // toggleModal();
    }

    if (!isValid) {
      toggleModal();
      return;
    }

    const movie = {
      id: uuid.v4(),
      title: inputValues.title,
      description: inputValues.description,
      language: selectedLanguage,
      vote_average: inputValues.vote_average,
      vote_count: inputValues.vote_count,
      run_time: inputValues.run_time,
      poster_path: inputValues.poster_path,
      release_date: inputValues.release_date,
    };

    try {
      addMovie(movie);
    } catch (error) {
      console.log("Error saving movie:", error);
    }

    setInputValues({
      title: "",
      description: "",
      language: "",
      vote_average: "",
      vote_count: "",
      run_time: "",
      release_date: formattedReleaseDate,
      poster_path: null,
    });

    navigation.navigate("Home");
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled === false) {
        setInputValues({ ...inputValues, poster_path: result.assets[0].uri });
      }
    } catch (error) {
      console.log("Error picking an image:", error);
    }
  };

  function inputChangeHandler(inputIdentifier, enteredText) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredText,
      };
    });
  }

  const closeModal = () => {
    setErrorModal(false);
  };

  const toggleModal = () => {
    setErrorModal(!ErrorModal);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      {/* {inputValues.poster_path ? (
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Image
              source={{ uri: inputValues.poster_path }}
              style={styles.imagePreview}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Text style={styles.inputLabel}>Pick an Image</Text>
            <Icon name="image" size={50} color="#CEB59D" />
          </TouchableOpacity>
        )} */}
        <Input
          label="Title"
          textInputConfig={{
            keyboardType: "default",
            placeholder: "Title",
            onChangeText: inputChangeHandler.bind(this, "title"),
            value: inputValues.title,
          }}
        />
        <Input
          label="Description"
          textInputConfig={{
            keyboardType: "default",
            multiline: true,
            placeholder: "Description",
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: inputValues.description,
          }}
        />
        <Text style={styles.inputLabel}>Language</Text>
        <TouchableOpacity style={styles.dropdownContainer}>
          <SelectDropdown
            data={languages.map((language) => language.label)}
            onSelect={(selectedItem, index) =>
              setSelectedLanguage(languages[index].value)
            }
            defaultButtonText={languages[0].label}
            buttonStyle={styles.dropdownButton}
            dropdownStyle={styles.dropdownList}
            rowStyle={styles.dropdownRow}
            buttonTextStyle={{ color: "#fff" }}
            selectedRowTextStyle={{ color: "#EE9B37" }}
            rowTextStyle={{ color: "#fff" }}
          />
          <Icon
            name="chevron-down"
            size={16}
            color="#EE9B37"
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
        <View style={styles.alignment}>
          <Input
            style={styles.rowInput}
            label="Average Vote"
            textInputConfig={{
              keyboardType: "decimal-pad",
              maxLength: 3,
              placeholder: "vote",
              onChangeText: inputChangeHandler.bind(this, "vote_average"),
              value: inputValues.vote_average,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Number of Reviews"
            textInputConfig={{
              keyboardType: "numeric",
              maxLength: 7,
              placeholder: "Number of votes",
              onChangeText: inputChangeHandler.bind(this, "vote_count"),
              value: inputValues.vote_count,
            }}
          />
        </View>
        <ErrorPopup
          isVisible={ErrorModal}
          message={ErrorMessage}
          onClose={closeModal}
          close={closeModal}
        />

        <View style={styles.alignment}>
          <Input
            style={styles.rowInput}
            label="Run Time"
            textInputConfig={{
              keyboardType: "decimal-pad",
              maxLength: 3,
              placeholder: "Run Time",
              defaultValue: "0",
              onChangeText: inputChangeHandler.bind(this, "run_time"),
              value: inputValues.run_time,
            }}
          />

          <TouchableOpacity
            style={styles.datePickerInput}
            onPress={() => setShowDatePicker(!showDatePicker)}
          >
            <Icon name="calendar" size={20} color="#EE9B37" />
          </TouchableOpacity>
          <Input
            style={styles.rowInput}
            label="Release Date"
            textInputConfig={{
              value: formattedReleaseDate,
            }}
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={releaseDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setReleaseDate(selectedDate);
                  setSelectedDate(selectedDate); // Set the selected date
                  toggleDatePicker();
                }
              }}
            />
          )}
        </View>

        <Text style={styles.inputLabel}>Movie Poster</Text>

        {inputValues.poster_path ? (
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Image
              source={{ uri: inputValues.poster_path }}
              style={styles.imagePreview}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Text style={styles.inputLabel}>Pick an Image</Text>
            <Icon name="image" size={50} color="#CEB59D" />
          </TouchableOpacity>
        )}
        <Button onPress={handleAddMovie} title="Add Movie" color="#EE9B37" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1F1F1F",
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#494037",
  },
  dropdownButton: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#594F45",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#666",
  },
  dropdownList: {
    backgroundColor: "#494037",
    borderWidth: 1,
    borderColor: "#666",
    marginTop: 2,
    borderRadius: 7,
  },
  dropdownRow: {
    padding: 10,
    backgroundColor: "#494037",
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#EE9B37",
  },
  alignment: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  imagePickerButton: {
    backgroundColor: "#494037",
    padding: 60,
    borderRadius: 5,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
  },

  imagePreview: {
    width: 350,
    minWidth: 260,
    height: 350,
    minHeight: 260,
    marginTop: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
  datePickerButton: {
    backgroundColor: "#494037",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
});

export default MovieForm;
