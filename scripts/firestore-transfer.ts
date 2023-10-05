import { Firestore, QueryDocumentSnapshot } from "@google-cloud/firestore";

type Post = {
  post_id: string;
  content: string;
  is_draft: boolean;
  is_private: boolean;
  priority: number;
  is_legacy: boolean;

  created_at: number;
  updated_at: number;
  deleted_at: number | null;
};

// Source Firestore config
const sourceFirestore = new Firestore({
  projectId: "blog-65b36",
  keyFilename: "./scripts/config/blog-service.json",
});

// Destination Firestore config
const destinationFirestore = new Firestore({
  projectId: "fir-2bbe6",
  keyFilename: "./scripts/config/stream-service.json",
});

const transferData = async (
  srcCollectionPath: string,
  destCollectionPath: string
): Promise<void> => {
  try {
    const srcCollectionRef = sourceFirestore.collection(srcCollectionPath);
    const destCollectionRef = destinationFirestore.collection(destCollectionPath);

    // Fetch documents from source collection
    const snapshot = await srcCollectionRef.get();
    if (snapshot.empty) {
      console.log("No documents found in source collection!");
      return;
    }

    // Batch write to destination collection
    const batch = destinationFirestore.batch();
    snapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
      const destDocRef = destCollectionRef.doc(doc.id);

      const postId = doc.id;
      const data: Post = {
        content: doc.data().post_content,
        is_draft: true,
        is_private: false,
        is_legacy: true,
        priority: 0,
        post_id: postId,

        created_at: doc.data().time_created.toDate().getTime(),
        updated_at: doc.data().time_created.toDate().getTime(),
        deleted_at: null,
      };

      batch.set(destDocRef, data);
    });

    // Commit the batch
    await batch.commit();
    console.log("Data transferred successfully!");
  } catch (error) {
    console.error("Error transferring data: ", error);
  }
};

// Usage
const srcCollectionPath = "drafts";
const destCollectionPath = "posts";
transferData(srcCollectionPath, destCollectionPath);
