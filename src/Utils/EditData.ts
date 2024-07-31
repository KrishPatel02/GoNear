import { db } from "@/Firebase/FirebaseConfig"
import { doc, updateDoc } from "firebase/firestore"

export const UpdateDocument = async(collectionName:string,documentID:string,updatedData:object)=>{
    try {
        const docRef = doc(db,collectionName,documentID);
        await updateDoc(docRef,updatedData);
        
    } catch (error) {
        console.log(error)
    }
}