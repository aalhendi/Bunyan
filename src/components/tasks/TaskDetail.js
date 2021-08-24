//library imports
import React, { useState, useEffect } from "react";
import { ScrollView, Text, Dimensions, Alert } from "react-native";
import { observer } from "mobx-react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "native-base";
import { Button, Center } from "native-base";
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
} from "./styles";

let photoInserted = false;

const TaskDetail = ({ navigation, route }) => {
  const { task } = route.params;
  console.log(task.image);
  const [taskInfo, setTaskInfo] = useState({
    id: task.id,
    name: task.name,
    description: task.description,
    image: { uri: task.image },
    status: 0,
  });

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
      });
    }
  };
  const handleSubmit = async () => {
    photoInserted = true;
    pickImage();
  };
  const submitImage = async () => {
    photoInserted = false;
    await taskStore.updaeTask(taskInfo);
  };

  //Status change
  const handleChangeStatus = async () => {
    authStore.user.email.endsWith("@worker.com")
      ? setTaskInfo({
          ...taskInfo,
          status: 1,
        })
      : setTaskInfo({
          ...taskInfo,
          status: 3,
        });
    if (taskInfo.status === 1) {
      Alert.alert("Alert", "Job is Done");
      navigation.goBack("TaskList");
    }
    await taskStore.updaeTask(taskInfo);
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
      <ScrollView>
        <Text> {task.name}</Text>
        <Text> {task.description}</Text>

        {taskInfo !== null ? (
          <Center>
            <Image
              source={{ uri: taskInfo.image.uri }}
              alt={task.name}
              style={{
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
        {authStore.user.email.endsWith("@worker.com") && !photoInserted ? (
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
            send the image
          </Button>
        )}

        {authStore.user.email.endsWith("@worker.com") ? (
          <Button
            onPress={handleChangeStatus}
            style={{ marginHorizontal: "2.5%" }}
          >
            Job is Done
          </Button>
        ) : task.status === 2 ? (
          <Button
            onPress={handleChangeStatus}
            style={{ marginHorizontal: "2.5%" }}
          >
            Confirm Job
          </Button>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(TaskDetail);
