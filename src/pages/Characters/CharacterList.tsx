import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useCharacters } from "../../hooks/useCharacters";
import { useAuth } from "../../auth/AuthContext";
import { deleteCharacter } from "../../api/characters.service";
import { Loader } from "../../components/Loader";
import "./CharacterList.scss";

const CharacterList = () => {
  const {
    characters,
    loading,
    error,
    page,
    totalPages,
    setPage,
    name,
    setName,
    race,
    setRace,
    fetchCharacters
  } = useCharacters();

  const navigate = useNavigate();
  const { user } = useAuth();

  // FUNCION DELETE
  const handleDelete = async (id: number) => {
    if (!window.confirm("Seguro que quieres eliminar este personaje?")) return;
    try {
      await deleteCharacter(id);
      alert("Personaje eliminado con éxito");
      // 🔄 REFRESCAR TABLA
      fetchCharacters();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el personaje");
    }
  };

  return (
    <div className="characters">
      <h1>Personajes</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={name}
          onChange={(e) => {
            setPage(1);
            setName(e.target.value);
          }}
        />

        <select
          value={race}
          onChange={(e) => {
            setPage(1);
            setRace(e.target.value);
          }}
        >
          <option value="">Todas las razas</option>
          <option value="Saiyan">Saiyan</option>
          <option value="Human">Human</option>
          <option value="Namekian">Namekian</option>
          <option value="Android">Android</option>
        </select>

        {user.role === "admin" && (
          <button className="create-btn" onClick={() => navigate("/characters/form")}>
            + Crear Personaje
          </button>
        )}
      </div>

      {loading ? (
        <Loader rows={5} />
      ) : characters.length === 0 ? (
        <p className="empty">No se encontraron Personajes</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Acciones</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Ki</th>
              <th>Max Ki</th>
              <th>Raza</th>
              <th>Género</th>
              <th>Afiliación</th>
            </tr>
          </thead>

          <tbody>
            {characters.map((c) => (
              <tr key={c.id}>
                <td className="actions-cell">
                  <div className="actions">
                    <button className="icon-btn view" title="Ver" onClick={() => navigate(`/characters/${c.id}`)}>
                      <Eye size={16} />
                    </button>

                    {user.role === "admin" && (
                      <>
                        <button className="icon-btn edit" title="Editar" onClick={() => navigate(`/characters/form/${c.id}`)}>
                          <Pencil size={16} />
                        </button>
                        <button className="icon-btn delete" title="Eliminar" onClick={() => handleDelete(c.id)}>
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>

                <td>
                  <img src={c.image} alt={c.name} />
                </td>
                <td>{c.name}</td>
                <td>{c.ki}</td>
                <td>{c.maxKi}</td>
                <td>{c.race}</td>
                <td>{c.gender}</td>
                <td>{c.affiliation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="error">{error}</p>}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
