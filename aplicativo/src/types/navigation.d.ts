import { DrawerNavigationOptions} from "@react-navigation/drawer"
import { IconNameProps } from "../components/drawer-btn"

interface CustomOptions extends DrawerNavigationOptions {
    iconName: IconNameProps
    isDividir?: boolean
    sectionTitle?: string
}