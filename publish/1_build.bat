cd C:\Users\shaurya\workspace\gitCode\SoSAlerts
del /f C:\Users\shaurya\workspace\gitCode\SoSAlerts\platforms\android\build\outputs\apk\android-release-unsigned.apk
del /f C:\Users\shaurya\workspace\gitCode\SoSAlerts\publish\android-release-unsigned.apk
del /f C:\Users\shaurya\workspace\gitCode\SoSAlerts\publish\SOSAlerts.apk
cordova build --release android

