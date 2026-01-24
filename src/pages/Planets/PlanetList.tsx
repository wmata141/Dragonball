import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { usePlanets } from "../../hooks/usePlanets";
import { Loader } from "../../components/Loader";
import "./PlanetList.scss";

const PlanetList = () => {
  const navigate = useNavigate();
  const { planets, loading, error, page, totalPages, setPage, filterName, setFilterName } =
    usePlanets();

  return (
    <div className="planets">
      <h1>Planetas</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar planeta"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader rows={5} />
      ) : planets.length === 0 ? (
        <p className="empty">No se encontraron planetas</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Acciones</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="actions">
                    <button className="icon-btn view" title="Ver" onClick={() => navigate(`/planets/${p.id}`)}>
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
                <td>
                  <img src={p.image} alt={p.name} />
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="error">{error}</p>}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </div>
  );
};

export default PlanetList;
