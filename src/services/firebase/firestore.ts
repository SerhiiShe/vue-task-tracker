import { db } from './config'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { Task } from '@/types'
import type { DocumentData } from 'firebase/firestore'

export const firestoreService = {
  async addCollectionItem(path: string, item: Task): Promise<string> {
    const docRef = await addDoc(collection(db, path), item)
    return docRef.id
  },
  // async getCollectionItems<T = DocumentData>(pathArray: string[]): Promise<T[]> {
  //   const querySnapshot = await getDocs(collection(db, pathArray.join('/')))

  //   const docsData: T[] = querySnapshot.docs.map((doc) => {
  //     return {
  //       id: doc.id,
  //       ...(doc.data() as T),
  //     }
  //   })

  //   return docsData
  // },
  async updateCollectionItem(pathArray: string[], newData: Partial<DocumentData>): Promise<void> {
    await updateDoc(doc(db, pathArray.join('/')), newData)
  },
  async deleteCollectionItem(pathArray: string[]): Promise<void> {
    await deleteDoc(doc(db, pathArray.join('/')))
  },
}
