import React, { useState, useMemo, useEffect } from 'react';
import {Button, Text, View} from 'react-native';
import { Provider as PaperProvider} from 'react-native-paper';
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import jwtDecode from "jwt-decode";

import {setTokenApi, getTokenApi, removeTokenApi} from "./src/api/token";

export default function App() {

  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
      (async () => {
          const token = await getTokenApi();
          if(token)
          {
              setAuth({
                  token: token,
                    idUser: jwtDecode(token).id

              })

          }else {
              setAuth(null);
          }
      })()
  }, []);

  const login = (user) => {
        setTokenApi(user.jwt);
        setAuth({
            token: user.jwt,
            idUser: user.user._id,

        });
  };
  const logout = () => {
      if(auth)
      {
          removeTokenApi();
          setAuth(null);
      }
  }
  const authData = useMemo(
      () => ({
          auth,
          login,
          logout,
      }),
      [auth]
  );

  if(auth === undefined) return null;
  return (
      <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? (<View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text>
                <Button title="Cerrar sesión" onPress={authData.logout}/>
            </Text>
        </View> ): <AuthScreen/>}
      </PaperProvider>
      </AuthContext.Provider>
  );
}


