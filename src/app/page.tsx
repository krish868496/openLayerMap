import Image from "next/image";
import MapComponent from "./components/Map";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">  
      
     <MapComponent />
    </main>
  );
}
