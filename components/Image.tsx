import * as React from "react";
import { Image as NativeImage, ImageSourcePropType } from "react-native";

export interface ImageProps {
  source: ImageSourcePropType;
}

const Image: React.FC<ImageProps> = props => {
  const { source } = props;
  return <NativeImage source={source} style={{ width: 100, height: 100 }} />;
};

export default Image;
