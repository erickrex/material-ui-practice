import { CircularProgress } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import Movie from './Movie'
import './styles.css'

type Props = {
    movies: any
    setMovies: any
    setTempMovies: any
}

type Movie ={
    imdbID: string
    title: string 
    image: string 
    year: string 
}


const API_KEY= '81f7c77f';
const series = ['avengers', 'ironman', 'harry potter']

const Movies: React.FC<Props> = props => {

    useEffect(() => {
        const promises = series.map(serie => {
            return fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(serie)}}&apikey=${API_KEY}&page=1`)
        .then(res => res.json())
        })


        Promise.all(promises).then((movies: any) =>{

        const updatedMovies: Movie[] = movies.map((movie: any) => movie.Search).flat(2)
        .map((movie: any) => ({
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster,
            imdb: movie.imdbID
        }))

        props.setMovies(updatedMovies)
        props.setTempMovies(updatedMovies)

        })

        },[])
            // props.setMovies(movies.map((movie: any) => movie.Search).flat(2).map((movie: any) => ({
        //     title: movie.Title,
        //     year: movie.Year,
        //     image: movie.Poster,
        //     imdb:movie.imdbID
        // })))
        // props.setTempMovies(movies.map((movie: any) => movie.Search).flat(2).map((movie:any) => ({
        //     title: movie.Title,
        //     year: movie.Year,
        //     image: movie.Poster,
        //     imdb:movie.imdbID
        // })))

        // props.setTempMovies(movies.map((movie: any) => movie.Search))
    
        // Promise.all(promises).then((movies: any) =>{
        // const updatedMovies: any = movies.map((movie: any) => movie.Search).flat(2).map(movie: any) => ({
        //     title: movie.Title,
        //     year: movie.Year,
        //     image: movie.Poster,
        //     imdb:movie.imdbID
        // })
        // props.setMovies(updatedMovies)
        // props.setTempMovies(updatedMovies)
        
        
    
    
    
    // useEffect(() =>{
    //     series.forEach(series => {
    //         fetch(``)
    //         .then(res1 => res.json())
    //         .then(res2 => console.log(res2))
    //     })
    // }, [])


    // useEffect(() => {
    //     fetch(`x`).then(res1 => res1.json())
    //     .then(res2 => console.log(res2))
    // })
        

    if(props.movies.length===0){
        return (<div className="loader">
            <CircularProgress/>
            </div>)
    } 

     /* {props.movies.flat(2).map((movie:any) => {
        return <Movie
        key={movie.imdbID}
        title={movie.Title}
        year={movie.Year}
        image={movie.Poster} 
        />
    })
    
    } */
    return (<div className="movies">
   
    {props.movies.map((movie: Movie) => {
        return <Movie
            key={movie.imdbID}
            title={movie.title}
            year={movie.year}
            image={movie.image} 
        />
    })
    }

    </div>)
    
    
}

export default Movies