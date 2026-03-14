import { db } from './config'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import { CurrentTimerPayload, TaskPayload, TimerLogPayload } from '@/types'
import type { DocumentData } from 'firebase/firestore'

export const firestoreService = {
  async addCollectionItem(path: string, item: TaskPayload | TimerLogPayload): Promise<string> {
    const docRef = await addDoc(collection(db, path), item)
    return docRef.id
  },
  async setCollectionItem(path: string, item: CurrentTimerPayload): Promise<void> {
    await setDoc(doc(db, path), item)
  },
  async getCollectionItems<T = DocumentData>(path: string): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, path))

    const docsData: T[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as T),
      }
    })

    return docsData
  },
  async getDocItem<T = DocumentData>(path: string): Promise<T | null> {
    const snap = await getDoc(doc(db, path))

    if (!snap.exists()) return null

    return snap.data() as T
  },
  async updateCollectionItem(path: string, newData: Partial<DocumentData>): Promise<void> {
    await updateDoc(doc(db, path), newData)
  },
  async deleteCollectionItem(path: string): Promise<void> {
    await deleteDoc(doc(db, path))
  },
}
