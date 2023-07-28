import { getApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';

export const createCloudFunctionsRepository = <ReqT, ResT>(funcName: string) => {
    const functions = getFunctions(getApp())
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    
    return httpsCallable<ReqT, ResT>(functions, funcName)
}