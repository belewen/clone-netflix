import authentification from "@/firebase/authentification";

import {
  User,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import useFireStore from "./useFirestore";
import { Bookmarks } from "@/types";

const useFirebaseAuthentification = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const { createUserDocument } = useFireStore();



  const signUpUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(authentification, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialBookmarks : Bookmarks = {bookmarksTvIds:[],bookmarksMovieIds:[]}
        createUserDocument(user.uid, initialBookmarks);
        setUser(user);

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setErrorMessage(errorMessage);
      });
  };

  const loginUser = (email: string, password: string) => {
    setPersistence(authentification, browserSessionPersistence)
      .then(async () => {
        return signInWithEmailAndPassword(
          authentification,
          email,
          password
        ).then((userCredential) => {
          const user = userCredential.user;
         
          setUser(user);
   
          navigate("/");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setErrorMessage(errorMessage);
      });
  };

  const logoutUser = () => {
    signOut(authentification)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  return { user, loginUser, signUpUser, errorMessage, logoutUser };
};

export default useFirebaseAuthentification;