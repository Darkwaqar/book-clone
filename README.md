## step

1. use `npx create-expo-app -t expo-template-blank-typescript` this will init the project in typescript
2. add the web support `npx expo install react-dom react-native-web @expo/webpack-config`

3. go to step zen login create a qraphql api
   - install stepzen cli `npm install -g stepzen` sometime things need power sudo it
   - Log in with your StepZen account `stepzen login -a upperfreehold`
   - Enter your Admin Key when prompted
4. let make a directory in the project name Stepzen
5. cd to Stepzen and add googleapi using

```
stepzen import curl \
	"https://www.googleapis.com/books/v1/volumes?q=harry&country=US" \
	--query-name googleBooksSearch \
	--query-type GoogleRoot \
	--prefix Google \
	--name GoogleBooks
```

6. Import the Open Library api

```
stepzen import curl \
	"http://openlibrary.org/search.json?q=the+lord+of+the+rings" \
 	--query-name openLibrarySearch \
	--query-type OpenLibraryRoot \
	--prefix OL \
	--name OpenLibrary
```

7. we can Start the server

```
stepzen start
stepzen start --dashboard=local
```

8. add inline-environment `yarn add -D react-native-dotenv`

9. go to .babelrc add

```
{
  "plugins": [
    ["module:react-native-dotenv"]
  ]
}
```

10. create .env file and save the key there touch .env

11. add React Navigation both native and stack `yarn add @react-navigation/native @react-navigation/stack @react-navigation/native-stack @react-navigation/bottom-tabs`

12. add expo react navigation dependencies and add gesture handle `npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler`

13. add expo-linking `npx expo install expo-linking`

14. add the splash-screen `npx expo install expo-splash-screen`