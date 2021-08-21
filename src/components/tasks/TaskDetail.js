//library imports
import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, Dimensions } from "react-native";
import { observer } from "mobx-react";
import * as ImagePicker from "expo-image-picker";

//styles
import {
  SafeAreaView,
  TopNavigationBar,
  FlexView,
  BackIcon,
  TextTopNavigationBar,
  TopBarText,
} from "./styles";
import { Button, Center } from "native-base";
import authStore from "../../stores/authStore";

const TaskDetail = ({ navigation, route }) => {
  const [image, setImage] = useState(null);

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
      setImage(result.uri);
    }
  };
  const { task } = route.params;

  const win = Dimensions.get("window");
  const ratio = win.width / 541;
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
        <Text> {task.image}</Text>

        {authStore.user.email.endsWith("@worker.com") ? (
          <Button onPress={pickImage}> Insert an image </Button>
        ) : null}
        {image && (
          <Center>
            <Image
              source={{ uri: image }}
              style={{
                width: win.width,
                height: 362 * ratio, //362 is actual height of image
                marginTop: "5%",
                borderRadius: 5,
                padding: 10,
              }}
            />
          </Center>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(TaskDetail);
