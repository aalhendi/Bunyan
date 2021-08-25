//library imports
import React, { useState, useEffect } from "react";
import { Text, Dimensions, Alert, ScrollView } from "react-native";
import { observer } from "mobx-react";
import * as ImagePicker from "expo-image-picker";
import { Image, Spinner, Button, Center } from "native-base";
//Stores
import authStore from "../../stores/authStore";
import taskStore from "../../stores/taskStore";
//styles
import {
  SafeAreaView,
  TopNavigationBar,
  FlexView,
  BackIcon,
  TextTopNavigationBar,
  TopBarText,
  DetailView,
  DetailNameText,
  TextDetailView,
  DetailText,
  ClientConfirm,
} from "./styles";
import clientStore from "../../stores/clientStore";

let photoInserted = false;

const TaskDetail = ({ navigation, route }) => {
  const { task } = route.params;

  const [taskInfo, setTaskInfo] = useState({
    id: task.id,
    name: task.name,
    description: task.description,
    image: { uri: task.image },
    status: task.status,
  });

  if (taskStore.loading) <Spinner />;

  //Image picker
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setTaskInfo({
        ...taskInfo,
        image: {
          uri: result.uri,
          name: result.uri.split("/").pop(),
        },
        status: 1,
      });
    }
  };
  const handleSubmit = async () => {
    photoInserted = true;
    pickImage();
  };
  const submitImage = async () => {
    photoInserted = false;
    await taskStore.updateTask(taskInfo);
    if (taskInfo.status === 1) {
      Alert.alert("Alert", "Job is Done");
      navigation.goBack();
    }
  };

  //Status change
  const handleChange = async () => {
    await taskStore.updateTaskForClient(
      {
        ...taskInfo,
        status: 3,
      },
      navigation
    );
    Alert.alert("Alert", "Job Aprroved");
    navigation.goBack();
  };

  //for image
  const win = Dimensions.get("window");
  const ratio = win.width / 450;

  return (
    <SafeAreaView>
      <TopNavigationBar>
        <FlexView>
          <BackIcon
            name="chevron-back"
            size={35}
            onPress={() => navigation.goBack("TaskList")}
          />
        </FlexView>
        <TextTopNavigationBar>
          <TopBarText>Details</TopBarText>
        </TextTopNavigationBar>
        <FlexView />
      </TopNavigationBar>
      {/*====================*/}
      <DetailView>
        <DetailNameText>{task.name}</DetailNameText>
        <ScrollView keyboardShouldPersistTaps="always">
          <TextDetailView>
            <DetailText> {task.description}</DetailText>
          </TextDetailView>

          {taskInfo !== null ? (
            <Center>
              <Image
                source={{ uri: taskInfo.image.uri }}
                alt={task.name}
                style={{
                  marginTop: 15,
                  width: win.width * 0.95,
                  height: 362 * ratio, //362 is actual height of image
                  borderRadius: 5,
                  padding: 10,
                }}
              />
            </Center>
          ) : (
            <Center>No Uploaded Image</Center>
          )}
          {
            //ToDo: make the submission button better
            authStore.user.email.endsWith("@worker.com") ? (
              !photoInserted ? (
                <Button
                  onPress={handleSubmit}
                  style={{
                    marginTop: "7.5%",
                    marginBottom: "2.5%",
                    marginHorizontal: "2.5%",
                  }}
                >
                  Insert an image
                </Button>
              ) : (
                <Button
                  onPress={submitImage}
                  style={{
                    marginTop: "7.5%",
                    marginBottom: "2.5%",
                    marginHorizontal: "2.5%",
                  }}
                >
                  Submit the image
                </Button>
              )
            ) : null
          }

          {!authStore.user.email.endsWith("@worker.com") &&
            task.status === 2 && (
              <ClientConfirm onPress={handleChange}>Approve</ClientConfirm>
            )}
        </ScrollView>
      </DetailView>
    </SafeAreaView>
  );
};

export default observer(TaskDetail);
