import axios from "axios";

const BASE_URL = 'https://lapps-in21.leadsquared.com/executebylapptoken'

export const onSendOtp = async (mobileNo) => {
    const res = await axios.post(`${BASE_URL}?name=da_46725_9f5d7299&stage=Live&xapikey=ac88a7d6d0844346a98a57c2454461c6&otp=send&productType=CC`, { mobile: mobileNo, messageType: 'otpGeneral' });
    return res;
};
export const onVerifyOtp = async (mobile, otpNumber) => {
    const res = await axios.post(`${BASE_URL}?name=da_46725_9f5d7299&stage=Live&xapikey=ac88a7d6d0844346a98a57c2454461c6&otp=verify&productType=CC`, { mobile: mobile, otp: otpNumber });
    return res;
};