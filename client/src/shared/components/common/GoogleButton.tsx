import { GoogleIcon } from "../../../widgets/icon/icon";
import { API_LIST } from "../../constants/ApiList";
import { REST_API_SERVER } from "../../constants/ApiServer";

export const GoogleButton = () => {
    const url = `${REST_API_SERVER}${API_LIST.USER.GOOGLE_LOGIN}`
    return (
        <div 
            id="google-login-btn" 
            onClick={() => {window.location.href = url}}
            className="w-full flex justify-center items-center 
                text-center py-3 bg-gray-200 hover:bg-gray-300 
                font-semibold cursor-pointer rounded-xl transition-all 
                disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <GoogleIcon />
            Google 계정으로 로그인
        </div>
    );
}