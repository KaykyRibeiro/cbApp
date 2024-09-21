import { Pressable } from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
export function MenuButton() { 
    return (
        <Pressable>
            <MaterialIcons name="menu" size={30} color="#ef4444" />
        </Pressable>
    )
}