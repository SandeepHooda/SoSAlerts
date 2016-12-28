copy C:\Users\shaurya\workspace\gitCode\SoSAlerts\platforms\android\build\outputs\apk C:\Users\shaurya\workspace\gitCode\SoSAlerts\publish\
cd C:\Users\shaurya\workspace\gitCode\SoSAlerts\publish
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name
