import {MaterialDesignIcons, MaterialDesignIconsIconName} from '@react-native-vector-icons/material-design-icons';

type Props = {
  name: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
};

export function AppIcon({name, size, color}: Props) {
  return <MaterialDesignIcons name={name} size={size} color={color}/>
}