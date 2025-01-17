// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext, createContext, useState, MouseEventHandler, useEffect } from "react";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { getUser, getProfilePhoto } from "../GraphService";
import { v4 as uuidv4 } from "uuid";

// <AppContextSnippet>
export interface AppUser {
    displayName?: string;
    email?: string;
    avatar?: string;
}

export interface AppError {
    message: string;
    debug?: string;
}

export interface AccessToken {
    accessToken?: string;
}

export interface sessionInfo {
    sessionId?: string;
}

type AppContext = {
    user?: AppUser;
    error?: AppError;
    accessToken?: AccessToken;
    sessionId?: sessionInfo;
    signIn?: MouseEventHandler<HTMLElement>;
    signOut?: MouseEventHandler<HTMLElement>;
    demoSignIn?: Function;
    displayError?: Function;
    clearError?: Function;
    authProvider?: AuthCodeMSALBrowserAuthenticationProvider;
    isAuthenticated?: boolean;
};

const appContext = createContext<AppContext>({
    user: undefined,
    error: undefined,
    accessToken: undefined,
    sessionId: undefined,
    demoSignIn: undefined,
    signIn: undefined,
    signOut: undefined,
    displayError: undefined,
    clearError: undefined,
    authProvider: undefined
});

export function useAppContext(): AppContext {
    return useContext(appContext);
}

interface ProvideAppContextProps {
    children: React.ReactNode;
}

export default function ProvideAppContext({ children }: ProvideAppContextProps) {
    const auth = useProvideAppContext();
    return <appContext.Provider value={auth}>{children}</appContext.Provider>;
}
// </AppContextSnippet>

function useProvideAppContext() {
    const msal = useMsal();
    const [user, setUser] = useState<AppUser | undefined>(undefined);
    const [error, setError] = useState<AppError | undefined>(undefined);
    const [accessToken, setAccessToken] = useState<AccessToken | undefined>(undefined);
    const [sessionId, setSessionId] = useState<sessionInfo | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const displayError = (message: string, debug?: string) => {
        setError({ message, debug });
    };

    const clearError = () => {
        setError(undefined);
    };

    // <AuthProviderSnippet>
    // Used by the Graph SDK to authenticate API calls
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msal.instance as PublicClientApplication, {
        account: msal.instance.getActiveAccount()!,
        scopes: ["user.read"],
        interactionType: InteractionType.Popup
    });
    // </AuthProviderSnippet>

    // <UseEffectSnippet>
    useEffect(() => {
        const checkUser = async () => {            

            if (!user) {
                try {
                    // Check if user is already signed in
                    const account = msal.instance.getActiveAccount();
                    if (account) {
                        // Get the user from Microsoft Graph
                        const user = await getUser(authProvider);
                        console.log("user", user);
                        const avatar = await getProfilePhoto(authProvider);
                        setUser({
                            displayName: user.displayName || "",
                            email: user.mail || "",
                            avatar: avatar || ""
                        });
                        msal.instance
                            .acquireTokenSilent({
                                scopes: ["user.read"],
                                account: account
                            })
                            .then(function (accessTokenResponse) {
                                setAccessToken({
                                    accessToken: accessTokenResponse.accessToken
                                });
                                console.log("token", accessTokenResponse.accessToken);
                                console.log("session id", accessTokenResponse.idTokenClaims);
                            });

                        //generate Session ID after user is logged in
                        setSessionId({
                            sessionId: uuidv4()
                        });
                    }
                } catch (err: any) {
                    displayError(err.message);
                }
            }
        };
        checkUser();
    });


    const demoSignIn = async (id: string) => {
        
        // dan.paik
        // kyuh.cho
        // hs9654.lee
        let loginUser = {id: "dan.paik", displayName: "백동훈", mail: "dan.paik@samsung.com" };

        const users = [
            {id: "dan.paik", displayName: "백동훈", mail: "dan.paik@samsung.com" },
            {id: "kyuh.cho", displayName: "최규황", mail: "kyuh.choi@samsung.com" },
            {id: "hs9654.lee", displayName: "이희석", mail: "hs9654.lee@samsung.com" }
        ];

        for (let i=0;i<users.length;++i){
            if(id == users[i].id){
                console.log('SAME');
                loginUser.id = users[i].id;                
                loginUser.displayName = users[i].displayName; 
                loginUser.mail = users[i].mail; 
                break;
            }
        }
        
        console.log(loginUser);
        
        setUser({
             displayName: loginUser.displayName || "",
             email: loginUser.mail || ""
        });

        setIsAuthenticated(true);

    }

    const signIn = async () => {
        
        // TODO: 수정해야 할 부분
        // await msal.instance.loginPopup({
        //     scopes: ["user.read"],
        //     prompt: "select_account"
        // });

        // // Get the user from Microsoft Graph
        // const user = await getUser(authProvider);
        
        // const parsedResponse: AskResponse = await response.json();
        // if (response.status > 299 || !response.ok) {
        //     throw Error(parsedResponse.error || "Unknown error");
        // }
        
        // console.log(parsedResponse);        

        // if (parsedResponse.totalCount < 1) {
        //     alert("Authentication Failed!")
        //     throw Error("Authentication Failed!");            
        // }

        // setUser({
        //      displayName: parsedResponse['employees'][0].fullName || "",
        //      email: parsedResponse['employees'][0].emailAddress || "",
        // });

        // For DEMO
        //const user = {displayName: "이희석", mail: "hs9654.lee@samsung.com" };
        const user = {displayName: "최규황", mail: "kyuh.choi@samsung.com" };
        
        setUser({
            displayName: user.displayName || "",
            email: user.mail || ""
        });
        setIsAuthenticated(true);
    };

    const signOut = async () => {
        //await msal.instance.logoutPopup();
        setUser(undefined);
        setIsAuthenticated(false);
    };

    const configureSessionId = (sessionId: string) => {
        setSessionId({ sessionId });
    };

    return {
        user,
        error,
        accessToken,
        sessionId,
        demoSignIn,
        signIn,
        signOut,
        displayError,
        clearError,
        authProvider,
        isAuthenticated
    };
}
