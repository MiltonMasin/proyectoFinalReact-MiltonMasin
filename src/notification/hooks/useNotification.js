import { useContext } from "react"
import { NotificationContext } from "../NotificationServ"

export const useNotification = () => {
    return useContext(NotificationContext)
}