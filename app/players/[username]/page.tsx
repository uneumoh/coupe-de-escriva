import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebase from "@/firebase/clientApp";
import PlayerModal from "@/components/Players/playermodal";

const db = getFirestore(firebase);
export function generateStaticParams() {
  return getDocs(collection(db, "players")).then((playersSnapshot) =>
    playersSnapshot.docs.map((doc) => ({
      username: doc.id, // Ensure it's correctly formatted
    })),
  );
}

export default function PlayerPage({
  params,
}: {
  params: { username: string };
}) {
  return <PlayerModal username={params.username} />;
}
