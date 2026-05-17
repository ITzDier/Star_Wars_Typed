import { useState, useEffect } from "react";
import StarshipCard from "./StarshipCard";

export default function Starships() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://swapi.info/api/starships");
        if (!response.ok) {
          throw new Error("No se pudo obtener respuesta del servidor de SWAPI.");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error al cargar las naves espaciales.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
        <div className="bg-red-900/40 border border-red-500 text-red-200 p-6 rounded-lg max-w-md text-center shadow-lg">
          <h2 className="text-xl font-bold mb-2">¡Oops! Algo salió mal</h2>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
        Naves de Star Wars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((ship) => (
          <StarshipCard key={ship.model} ship={ship} />
        ))}
      </div>
    </div>
  );
}