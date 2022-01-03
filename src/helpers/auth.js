import {
    auth
} from "../services/firebase";

import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

export function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
};


export function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
};

export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();;
    return auth.signInWithPopup(provider);
};

export function signInWithGitHub() {
    const provider = new GithubAuthProvider();
    return auth.signInWithPopup(provider);
  }