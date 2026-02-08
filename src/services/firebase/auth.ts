import { auth } from './config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  type User,
} from 'firebase/auth'

export const authService = {
  async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  },
  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  },
  async logout(): Promise<void> {
    await signOut(auth)
  }
}
