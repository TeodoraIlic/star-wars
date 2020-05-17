import { Film } from '../films/films.model';
export interface People {
    count: number,
    next: null,
    previous: null,
    results: Person[]
}

export interface Person {
    birth_year: string,
    eye_color: string,
    films: Film[],
    gender: string,
    hair_color: string,
    height: string,
    homeworld: string,
    mass: string,
    name:string,
    skin_color: string,
    created: string,
    edited: string,
    species: any[],
    starships: any[],
    url: string,
    vehicles: any[]
}