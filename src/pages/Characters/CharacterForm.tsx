import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { createCharacter, updateCharacter, getCharacterById } from "../../api/characters.service";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import type { CharacterDetail } from "../../types/character";
import "./CharacterForm.scss";

const schema = yup.object({
  name: yup.string().min(3).max(50).required("Nombre requerido"),
  ki: yup.string().required("Ki requerido"),
  maxKi: yup.string().required("Max Ki requerido"),
  race: yup.string().required("Raza requerida"),
  gender: yup.string().required("Género requerido"),
  description: yup.string().required("Descripción requerida"),
  affiliation: yup.string().required("Afiliación requerida"),
  image: yup.string().url("URL inválida").notRequired(),
});

const CharacterForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // edit mode
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CharacterDetail>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCharacterById(Number(id))
        .then((data) => {
          Object.keys(data).forEach((key) => setValue(key as keyof CharacterDetail, data[key]));
        })
        .finally(() => setLoading(false));
    }
  }, [id, setValue]);

  const onSubmit = async (data: CharacterDetail) => {
    if (user.role !== "admin") return alert("No tienes permisos");
    try {
      setLoading(true);
      if (id) {
        await updateCharacter(Number(id), data);
        alert("Personaje actualizado");
      } else {
        await createCharacter(data);
        alert("Personaje creado");
      }
      navigate("/characters");
    } catch (err: any) {
      setServerError(err.message || "Error en servidor");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="character-form">
      <h1>{id ? "Editar Personaje" : "Crear Personaje"}</h1>
      {serverError && <p className="error">{serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Nombre" {...register("name")} />
        <span>{errors.name?.message}</span>

        <input placeholder="Ki" {...register("ki")} />
        <span>{errors.ki?.message}</span>

        <input placeholder="Max Ki" {...register("maxKi")} />
        <span>{errors.maxKi?.message}</span>

        <input placeholder="Raza" {...register("race")} />
        <span>{errors.race?.message}</span>

        <input placeholder="Género" {...register("gender")} />
        <span>{errors.gender?.message}</span>

        <input placeholder="Afiliación" {...register("affiliation")} />
        <span>{errors.affiliation?.message}</span>

        <textarea placeholder="Descripción" {...register("description")}></textarea>
        <span>{errors.description?.message}</span>

        <input placeholder="URL Imagen" {...register("image")} />
        <span>{errors.image?.message}</span>

        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default CharacterForm;
