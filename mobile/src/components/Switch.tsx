import { View, Switch as SwitchNative } from "react-native";

type Props = {
  value: boolean
  onChange: (value: boolean) => void
}

export default function Switch({ value, onChange }: Props) {
  return (
    <View style={{ alignSelf: 'flex-start' }}>
      <SwitchNative
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#D9D8DA', true: '#647AC7' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D9D8DA"
        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
      />
    </View>
  );
}
