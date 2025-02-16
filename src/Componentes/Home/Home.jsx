import React, { useState, useEffect } from 'react';
import "./home.css";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {

    const [pelis, setPelis] = useState([]);
    const [series, setSeries] = useState([]);
    const [top, setTop] = useState([]);
    const image_url = "https://image.tmdb.org/t/p/w500";
    const api_url = "https://api.themoviedb.org/3";
    const api = "575bcbc20d4282f26a0fda173e2568e3";
    const page = 1;

    const responsive = {
        0: { items: 2 },
        568: { items: 3 },
        700: { items: 5 },
        1024: { items: 8 },
    };

    useEffect(() => {
        fetch(`${api_url}/movie/popular?api_key=${api}&language=es-ES&page=1`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPelis(data.results);
            });
    }, []);
    useEffect(() => {
        fetch(`${api_url}/tv/popular?api_key=${api}&language=es-ES&page=1`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSeries(data.results);
            });
    }, []);
    useEffect(() => {
        fetch(`${api_url}/movie/top_rated?api_key=${api}&language=es-ES&page=1`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTop(data.results);
            });
    }, []);

    return (
        <>
            <section id='home'>
                <Container sx={{ paddingTop: "75px", paddingBottom: "24px" }}>
                    <Typography variant="h5" padding={"15px 0"} color={"white"} gutterBottom>
                        Populares
                        <Link to={`/Listado/popular/${page}`}>Ver todas</Link>
                    </Typography>
                    <AliceCarousel mouseTracking
                        items={pelis.map((item) => (
                            <div key={item.id} className="peliculas">
                                    <Link to={`/Detalles/${item.title}/${item.id}`}>
                                <img
                                    src={`${image_url + item.poster_path}`}
                                    alt="Imagen pelicula"
                                    className="image"
                                />
                                    </Link>
                                <Typography variant="subtitle1" padding={"15px 0"} >
                                    {item.title}
                                </Typography>
                            </div>
                        ))}
                        responsive={responsive}
                        disableDotsControls="true"
                    />
                    <Typography variant="h5" padding={"15px 0"} color={"white"} gutterBottom>
                        Mejores Valorados
                        <Link to={`/Listado/top_rated/${page}`}>Ver todas</Link>
                    </Typography>
                    <AliceCarousel mouseTracking
                        items={top.map((item) => (
                            <div key={item.id} className="peliculas">
                                <Link to={`/Detalles/${item.title}/${item.id}`}>
                                <img
                                    src={`${image_url + item.poster_path}`}
                                    alt="Imagen pelicula"
                                    className="image"
                                    />
                                    </Link>

                                <Typography variant="subtitle1" padding={"15px 0"}>
                                    {item.title}
                                </Typography>
                            </div>
                        ))}
                        responsive={responsive}
                        disableDotsControls="true"
                    />
                    <Typography variant="h5" padding={"15px 0"} color={"white"} gutterBottom>
                        Series
                        <Link to={`/Listado/tv/${page}}`}>Ver todas</Link>
                    </Typography>
                    <AliceCarousel mouseTracking
                        items={series.map((item) => (
                            <div key={item.id} className="peliculas">
                                <Link to={`/Detalles/${item.title}/${item.id}`}>
                                <img
                                    src={`${image_url + item.poster_path}`}
                                    alt="Imagen pelicula"
                                    className="image"
                                    />
                                    </Link>
                                <Typography variant="subtitle1" padding={"15px 0"} >
                                    {item.title}
                                </Typography>
                            </div>
                        ))}
                        responsive={responsive}
                        disableDotsControls="true"
                    />
                </Container>
            </section>
        </>

    )

};

export default Home;