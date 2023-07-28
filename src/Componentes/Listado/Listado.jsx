import React, {useState, useEffect} from 'react'
import './listado.css'



export default function Listado()  {
  const [pelis, setPelis] = useState([])
  const image_url = "https://image.tmdb.org/t/p/w500"
  const api_url = "https://api.themoviedb.org/3"
  const api = "575bcbc20d4282f26a0fda173e2568e3"
  const [page, setPage] = useState(1)

  const lista = async (page) => {
    return await fetch(`${api_url}/movie/popular?api_key=${api}&language=es-ES&page=${page}`)
    .then((res) =>res.json())
    .then(data =>{
      console.log(data)
      setPelis(data.results)
      setPage(page)
    })
   } 

  useEffect(() =>{
    fetch(`${api_url}/movie/popular?api_key=${api}&language=es-ES&page=1`)
    .then((res) =>res.json())
    .then(data =>{
      console.log(data)
      setPelis(data.results)
    })
  }, [])
  
    return (
        <>
        <section id="listado">
          <div className="contenedor">
              <div className="galeria">
                  { pelis.map(item =>(
                      <div key={item.id}className="peliculas">
                        <img src={`${image_url + item.poster_path}`} alt="Imagen pelicula" className='image'/>
                        <div className='titulo'>{item.title}</div>
                        <div><button className="boton1"><a href={`/Detalles/${item.title}/${item.id}`}> Informacion</a></button></div>
                      </div>))
                  }
                  
              </div>
              
          </div>
          <div className="pagina">
                <button value={page} name="pagina" onClick={() => lista((page === 1)? page : page-1)}>Anterior</button>
                  <p>{page}</p>
                <button value={page} name="pagina" onClick={() => lista(page+1)}>Siguente</button>
          </div>
          
        </section>
        </>
      )
}

