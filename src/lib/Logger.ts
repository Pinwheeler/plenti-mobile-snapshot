import { ReactNativeFirebase } from "@react-native-firebase/app"
import crashlytics from "@react-native-firebase/crashlytics"

function isFirebaseError(
  val: string | ReactNativeFirebase.NativeFirebaseError,
): val is ReactNativeFirebase.NativeFirebaseError {
  return (val as ReactNativeFirebase.NativeFirebaseError).nativeErrorCode !== undefined
}

export const Logger = {
  log: (text: string) => (__DEV__ ? console.log(text) : crashlytics().log(text)),
  warn: (text: string) => (__DEV__ ? console.warn(text) : crashlytics().log(`[WARN]: ${text}`)),
  error: (val: string | ReactNativeFirebase.NativeFirebaseError) => {
    if (__DEV__) {
      if (isFirebaseError(val)) {
        console.error(val.message)
      } else {
        console.error(val)
      }
    } else {
      if (isFirebaseError(val)) {
        crashlytics().recordError(val)
      } else {
        crashlytics().recordError(new Error(val))
      }
    }
  },
}
