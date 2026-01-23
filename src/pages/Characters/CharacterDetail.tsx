import { useParams, useNavigate } from "react-router-dom";
import { useCharacterDetail } from "../../hooks/useCharacterDetail";
import "./CharacterDetail.scss";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { character, loading, error } = useCharacterDetail(Number(id));

  if (loading) return <p>Cargando personaje...</p>;
  if (error || !character) return <p>{error}</p>;

  return (
    <div className="character-detail">
      <button className="back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="header">
        <img src={character.image} alt={character.name} />
        <div>
          <h1>{character.name}</h1>
          <p>{character.description}</p>
        </div>
      </div>

      <div className="info-grid">
        <div>
          <strong>Ki:</strong> {character.ki}
        </div>
        <div>
          <strong>Max Ki:</strong> {character.maxKi}
        </div>
        <div>
          <strong>Raza:</strong> {character.race}
        </div>
        <div>
          <strong>Género:</strong> {character.gender}
        </div>
        <div>
          <strong>Afiliación:</strong> {character.affiliation}
        </div>
      </div>

      <div className="planet">
        <h2>Planeta de origen</h2>
        <img src={character.originPlanet.image} />
        <p>{character.originPlanet.name}</p>
      </div>

      <div className="transformations">
        <h2>Transformaciones</h2>

        {character.transformations.length === 0 ? (
          <p>No tiene transformaciones</p>
        ) : (
          <div className="transformations-grid">
            {character.transformations.map((t) => (
              <div key={t.id} className="transformation-card">
                <img src={t.image} />
                <h4>{t.name}</h4>
                <p>Ki: {t.ki}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
