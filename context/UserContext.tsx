import React, { createContext, useState, useContext, ReactNode } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from 'firebaseConfig'; // Adjust the import according to your project structure
import {useQuest} from './questContext';

interface UserContextType {
  userUID: string | null;
  username: string | null;
  email: string | null;
  point: number;
  currStreak: number;
  longestStreak: number;
  completedDaily: boolean;
  images: string[];
  profilePic: string;
  currentQuest: string;
}

interface UserContextProviderType extends UserContextType {
  initUser: (uid: string) => void;
  setUserUID: (uid: string | null) => void;
  setUsername: (name: string) => void;
  setEmail: (email: string) => void;
  setPoint: (point: number) => void;
  setCurrStreak: (currStreak: number) => void;
  setLongestStreak: (longestStreak: number) => void;
  setCompletedDaily: (completedDaily: boolean) => void;
  setImages: (images: string[]) => void;
  setProfilePic: (profilePic: string) => void;
  setCurrentQuest: (questID: string) => void;
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
}

const UserContext = createContext<UserContextProviderType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserContextType>({
    userUID: null,
    username: null,
    email: null,
    point: 0,
    currStreak: 0,
    longestStreak: 0,
    completedDaily: false,
    images: [],
    profilePic: "",
    currentQuest: "0"
  });

  const updateDB = async (uid: string, updatedFields: Partial<UserContextType>) => {
    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, updatedFields);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const initUser = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("User document not found");
        return;
      }

      const userData = docSnap.data();

      setUser(prevUser => ({
        ...prevUser,
        userUID: uid,
        username: userData?.name || null,
        email: userData?.email || null,
        point: userData?.point || 0,
        currStreak: userData?.currStreak || 0,
        longestStreak: userData?.longestStreak || 0,
        completedDaily: userData?.completedDaily || false,
        images: userData?.images || [],
        profilePic: userData?.profilePic || "",
        currentQuest: userData?.currentQuest || "0"
      }));

       
    } catch (e) {
      console.error("Error initializing user: ", e);
    }
  };

  const setUserUID = (uid: string | null) => {
    setUser(prevUser => ({
      ...prevUser,
      userUID: uid
    }));
    if (uid) {
      updateDB(uid, { userUID: uid });
    }
  };

  const setCurrentQuest = (questID: string) => {
    setUser(prevUser => ({
      ...prevUser,
      currentQuest :questID
    }));
    if (user.userUID) {
      updateDB(user.userUID, { currentQuest : questID });
    }
  };

  const setUsername = (username: string) => {
    setUser(prevUser => ({
      ...prevUser,
      username
    }));
    if (user.userUID) {
      updateDB(user.userUID, { username });
    }
  };

  const setEmail = (email: string) => {
    setUser(prevUser => ({
      ...prevUser,
      email
    }));
    if (user.userUID) {
      updateDB(user.userUID, { email });
    }
  };

  const setPoint = (point: number) => {
    setUser(prevUser => ({
      ...prevUser,
      point
    }));
    if (user.userUID) {
      updateDB(user.userUID, { point });
    }
  };

  const setCurrStreak = (currStreak: number) => {
    setUser(prevUser => ({
      ...prevUser,
      currStreak
    }));
    if (user.userUID) {
      updateDB(user.userUID, { currStreak });
    }
  };

  const setLongestStreak = (longestStreak: number) => {
    setUser(prevUser => ({
      ...prevUser,
      longestStreak
    }));
    if (user.userUID) {
      updateDB(user.userUID, { longestStreak });
    }
  };

  const setCompletedDaily = (completedDaily: boolean) => {
    setUser(prevUser => ({
      ...prevUser,
      completedDaily
    }));
    if (user.userUID) {
      updateDB(user.userUID, { completedDaily });
    }
  };

  const setImages = (images: string[]) => {
    setUser(prevUser => ({
      ...prevUser,
      images
    }));
    if (user.userUID) {
      updateDB(user.userUID, { images });
    }
  };

  const updateImages = async (uid: string, image: string, action: 'add' | 'remove') => {
    try {
      const docRef = doc(db, "users", uid);
      if (action === 'add') {
        await updateDoc(docRef, { images: arrayUnion(image) });
      } else if (action === 'remove') {
        await updateDoc(docRef, { images: arrayRemove(image) });
      }
    } catch (error) {
      console.error("Error updating images:", error);
    }
  };
  
  const addImage = (image: string) => {
    setUser(prevUser => ({
      ...prevUser,
      images: [...prevUser.images, image]
    }));
    if (user.userUID) {
      updateImages(user.userUID, image, 'add');
    }
  };
  
  const removeImage = (image: string) => {
    setUser(prevUser => ({
      ...prevUser,
      images: prevUser.images.filter(img => img !== image)
    }));
    if (user.userUID) {
      updateImages(user.userUID, image, 'remove');
    }
  };

  const setProfilePic = (profilePic: string) => {
    setUser(prevUser => ({
      ...prevUser,
      profilePic
    }));
    if (user.userUID) {
      updateDB(user.userUID, { profilePic });
    }
  };

  return (
    <UserContext.Provider value={{
      ...user,
      initUser,
      setUserUID,
      setUsername,
      setEmail,
      setPoint,
      setCurrStreak,
      setLongestStreak,
      setCompletedDaily,
      setImages,
      setProfilePic,
      addImage,
      removeImage,
      setCurrentQuest
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
