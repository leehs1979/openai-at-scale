import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import { IPersonaSharedProps, Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import {
    IStackStyles,
    IStackTokens,
    IStackItemStyles,
    Label,
    Stack,
    Callout,
    DirectionalHint,
    mergeStyleSets,
    Layer,
    PersonaInitialsColor
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { useAppContext } from "./context/AppContext";
import { useBoolean } from "@fluentui/react-hooks";

import { TextField, Slider } from "@fluentui/react";
import { QuestionInput } from "./components/QuestionInput";

export default function Avatar() {
    const app = useAppContext();
    const examplePersona: IPersonaSharedProps = {
        imageUrl: app.user?.avatar || "",
        text: app.user?.displayName || "Anonymous",
        secondaryText: app.user?.email || ""
    };

    const styles = mergeStyleSets({
        button: {
            width: 130
        },
        callout: {
            background: "white",
            width: 250,
            maxWidth: "100%"
        },
        widthstyle: {
            width: 10            
        },
        heightstyle: {
            height: 20            
        }
    });
    // Tokens definition
    const outerStackTokens: IStackTokens = { childrenGap: 3 };
    const innerStackTokens: IStackTokens = {
        childrenGap: 5
    };
    const stackStyles: IStackStyles = {
        root: {
            height: 260
        }
    };
    const stackAvatarStyles: IStackItemStyles = {
        root: {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            height: "100%"
        }
    };
    const stackSignFormStyles: IStackItemStyles = {
        root: {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgb(248, 248, 248)",
            height: "60px",
            fontSize: "5px"
        }
    };

    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const buttonId = useId("callout-button");
    const labelId = useId("callout-label");
    const descriptionId = useId("callout-description");
    return (
        <>
            <AuthenticatedTemplate>
                <Persona id={buttonId} onClick={toggleIsCalloutVisible} {...examplePersona} size={PersonaSize.size32} hidePersonaDetails />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Persona id={buttonId} onClick={toggleIsCalloutVisible} initialsColor={PersonaInitialsColor.darkBlue} size={PersonaSize.size32} />
            </UnauthenticatedTemplate>
            {isCalloutVisible && (
                <Layer>
                    <Callout
                        className={styles.callout}
                        ariaLabelledBy={labelId}
                        ariaDescribedBy={descriptionId}
                        role="dialog"
                        gapSpace={10}
                        target={`#${buttonId}`}
                        onDismiss={toggleIsCalloutVisible}
                        directionalHint={DirectionalHint.bottomRightEdge}
                        setInitialFocus
                        isBeakVisible={false}
                    >
                        <Stack enableScopedSelectors tokens={outerStackTokens}>
                            <Stack enableScopedSelectors styles={stackStyles} tokens={innerStackTokens}>
                                <Stack.Item styles={stackAvatarStyles}>
                                    <AuthenticatedTemplate>
                                        <Persona {...examplePersona} size={PersonaSize.size48} />
                                    </AuthenticatedTemplate>
                                    <UnauthenticatedTemplate>
                                        <Persona initialsColor={PersonaInitialsColor.darkBlue} {...examplePersona} size={PersonaSize.size48} />
                                    </UnauthenticatedTemplate>
                                </Stack.Item>
                                <div>
                                    <QuestionInput                             
                                        clearOnSend
                                        placeholder="[Login-DEMO] Knox ID"
                                        onSend={id => app.demoSignIn(id)}                                        
                                    />
                                </div>
                                <Stack.Item styles={stackSignFormStyles}>                                
                                    <UnauthenticatedTemplate>
                                        <Label id="_singout" onClick={app.signOut} >Sign Out</Label>
                                    </UnauthenticatedTemplate>
                                </Stack.Item>
                            </Stack>
                        </Stack>
                    </Callout>
                </Layer>
            )}
        </>
    );
}
