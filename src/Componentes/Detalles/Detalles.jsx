import React, {useState, useEffect} from 'react'
import './detalles.css'
import { useNavigate, useParams } from 'react-router-dom'
import YouTube from 'react-youtube';



const Detalles = () => {
    const {id} = useParams()
    const image_url = "https://image.tmdb.org/t/p/w500"
    const api_url = "https://api.themoviedb.org/3"
    const api = "575bcbc20d4282f26a0fda173e2568e3"
    const [peli, setPeli] = useState([])
    const navigate = useNavigate()
    const [trailer, setTrailer] = useState(null)
    {/*Llamado a la api de los detalles */}
    useEffect(() =>{
      fetch(`${api_url}/movie/${id}?api_key=${api}&language=es-ES`)
      .then((res) =>res.json())
      .then(data =>{
        console.log(data)
        setPeli(data)
      })
    }, [])
    {/*Llamado a la api de los videos para el trailer*/}
    useEffect(() =>{
      fetch(`${api_url}/movie/${id}/videos?api_key=${api}&language=es-ES`)
      .then((res) =>res.json())
      .then(data =>{
        console.log(data)
        if(data.results){
          const trailer1 = data.results.find(
            (vid) => vid.type === "Trailer"
          );
        console.log(trailer1)
        setTrailer(trailer1 ? trailer1.key : data.results[0].key)
          }
      })
    }, [])
 
  return (
    
    <section id='detalles'>
      <div className='contenedor'>
        <div className="especificacion">
          { <>
            <div key={peli.id}className="imagen">
            <img src={`${image_url + peli.poster_path}`} alt="Imagen pelicula" />
            
            </div>
            <div className='descripcion'>
              <h1>{peli.title}</h1>
              <p>Descripcion <br></br> <br></br>{peli.overview}</p>
              <p>Popularidad: {peli.popularity}</p>
              <p>Fecha estreno: {peli.release_date}</p>
              {
                (trailer) ? (
                  <>
                  <div className='video'>
                    <YouTube
                      videoId={trailer}
                      opts={{
                        width: "100%",
                        heigth: "100%",
                        playerVars:{
                          autoplay: 0,
                          controls: 1,
                          cc_load_policy: 0,
                          fs: 1,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo:0,
                        },
                      }}/>
                  </div>
                  </>
                ) : ""
              }
            </div>
            
          </>
          }
         
        </div>
        <div className='boton'><button onClick={() => navigate(-1)}>Volver</button></div>
      </div>
    </section>
  )
}

export default Detalles