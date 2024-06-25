import React, { createContext, useContext, useEffect, useState } from "react"
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { auth } from "@/configs/firebaseConfig"
import { UserCredential } from "firebase/auth"

interface AuthContextType {
  currentUser: User | null
  login: (email: string, password: string) => Promise<UserCredential>
  signup: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<UserCredential>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
  }

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName,
      })
    }
  }

  const logout = () => {
    return signOut(auth)
      .then(() => {
        setCurrentUser(null)
      })
      .catch((error) => {
        console.error("Error signing out: ", error)
      })
  }

  const value = {
    currentUser,
    login,
    logout,
    signup,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
