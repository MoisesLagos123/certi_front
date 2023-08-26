export interface Movie {
    idPelicula: number;
    titulo: string;
    anioLanzamiento: number;
    genero: {
      idGenero: number;
      nombreGenero: string;
    };
  }