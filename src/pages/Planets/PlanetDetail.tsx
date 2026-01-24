import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlanetById } from "../../api/planets.service";
import "./PlanetDetail.scss";
import type { Planet } from "../../api/planets.service";

const PlanetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPlanetById(Number(id))
      .then((data) => setPlanet(data))
      .catch(() => setError("Error al cargar el planeta"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando planeta...</p>;
  if (error || !planet) return <p>{error}</p>;

  return (
    <div className="planet-detail">
      <button className="back" onClick={() => navigate(-1)}>← Volver</button>
      <h1>{planet.name}</h1>
      <img src={planet.image} alt={planet.name} />
      <p>{planet.description}</p>

      {planet.inhabitants?.length ? (
        <>
          <h2>Habitantes</h2>
          <ul>
            {planet.inhabitants.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </>
      ) : (
        <p>Sin habitantes registrados</p>
      )}
    </div>
  );
};

export default PlanetDetail;
