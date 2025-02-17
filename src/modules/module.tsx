
import { Navigate } from "react-router-dom"
import Guest from '@/layouts/Guest';
import PrintLayout from '@/layouts/PrintLayout';
import { useStore } from '@/store/app.store';
import DashboardLayout from "@/layouts/DashboardLayout";
export const PublicLayout = () => {
   const { getToken , getRole, getExpiration} = useStore()
    if(getToken() && getExpiration() * 1000 > Date.now()){
        switch (getRole()) {
            case "ADMIN":
                return  <Navigate to={`/admin`} />;
            default:
                return  <Navigate to={`/`} />;
        }
    }
    return (
        <Guest />
    )
}

export const PrivateLayout = () => {
    const { getToken, getExpiration} = useStore()
    if(getToken() && getExpiration() * 1000 > Date.now()){
        return <DashboardLayout />
    }else{
        alert("Session Expired")
        return <Navigate to={"/"} />;
    }
}

export const PrivatePrintLayout = () => {
    const { getToken, getExpiration, clear} = useStore()
    if (!getToken() || getExpiration() * 1000 <= Date.now()) {
        clear()
        alert("Session Expired")
        return <Navigate to={"/"} />;
        
    }else{
        return <PrintLayout />
    }   
}