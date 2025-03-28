import { WindowScreen } from "@utils/responsive";
import { useState } from "react";
import { Image, View, ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

interface ImageCarouselProps {
  images: string[];
  width?: number;
  height?: number;
  animationDuration?: number;
  style?: ViewStyle;
  indicatorPosition?: string;
  activeIndicatorColor?: string;
  inactiveIndicatorColor?: string;
  indicatorWidthMultiplier?: number;
  indicatorSpacing?: number;
  indicatorHeight?: number;
}

export default function ImageCarousel({
  images,
  width = WindowScreen.width,
  height,
  animationDuration = 1000,
  style,
  indicatorPosition = "bottom-1",
  activeIndicatorColor = "bg-white",
  inactiveIndicatorColor = "bg-white/30",
  indicatorWidthMultiplier = 1,
  indicatorSpacing = 8,
  indicatorHeight = 4
}: ImageCarouselProps) {
  const calculatedHeight = height || width * 0.75;
  const progressValue = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const getIndicatorWidth = () => {
    const availableWidth = width - 16;
    const totalSpacing = indicatorSpacing * (images.length - 1);
    const widthForIndicators = availableWidth - totalSpacing;
    return (widthForIndicators / images.length) * indicatorWidthMultiplier;
  };

  return (
    <Carousel
      width={width}
      height={calculatedHeight}
      data={images}
      scrollAnimationDuration={animationDuration}
      onProgressChange={(_, absoluteProgress) => {
        progressValue.value = absoluteProgress;
      }}
      onSnapToItem={(index) => setActiveIndex(index)}
      style={style}
      renderItem={({ item }) => (
        <View className="flex-1 relative mt-4">
          <Image
            source={{ uri: item }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className={`absolute ${indicatorPosition} left-0 right-0`}>
            <View className="flex-row justify-center w-full px-2">
              {images.map((_, i) => (
                <View
                  key={i}
                  className={`rounded-full ${i === activeIndex ? activeIndicatorColor : inactiveIndicatorColor
                    }`}
                  style={{
                    width: getIndicatorWidth(),
                    height: indicatorHeight,
                    marginHorizontal: indicatorSpacing / 2
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      )}
    />
  );
}