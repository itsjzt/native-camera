import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export interface AppState {
  hasCameraPermission: boolean | null;
  type: any;
}

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front
  };

  cameraRef = React.createRef<Camera>();

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  toggleCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  snap = async () => {
    if (this.cameraRef.current) {
      let photo = await this.cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  };

  render() {
    const { hasCameraPermission, type } = this.state;
    return (
      <View style={{ display: "flex", minHeight: "100%" }}>
        <CameraInner
          cameraRef={this.cameraRef}
          type={type}
          hasPermission={hasCameraPermission}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
              marginBottom: 16
            }}
          >
            <View style={{ marginLeft: 16, marginRight: 16 }}>
              <Button title="Capture" onPress={this.snap} />
            </View>
            <Button title="Flip" onPress={this.toggleCamera} />
          </View>
        </CameraInner>
      </View>
    );
  }
}

export interface CameraInnerProps {
  cameraRef: React.Ref<Camera>;
  hasPermission: boolean | null;
  type: any;
}

const CameraInner: React.SFC<CameraInnerProps> = props => {
  const { hasPermission, type, cameraRef } = props;
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera ref={cameraRef} style={{ flex: 1 }} type={type}>
          {props.children}
        </Camera>
      </View>
    );
  }
};
