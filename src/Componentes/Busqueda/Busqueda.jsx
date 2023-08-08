import React, {useState, useEffect} from 'react'
import './busqueda.css'
import { useParams, useNavigate} from 'react-router-dom'



const Busqueda = () => {
    const {query} = useParams()
    const image_url = "https://image.tmdb.org/t/p/w500"
    const api_url = "https://api.themoviedb.org/3"
    const api = "575bcbc20d4282f26a0fda173e2568e3"
    const [peli, setPeli] = useState([])
    const [page, setPage] = useState(1)
    const [barra, setBarra] = useState("")

    const navigate = useNavigate()

    {/*Llamado a la api de busqueda */}
    useEffect(() =>{
      fetch(`${api_url}/search/movie?query=${query}&api_key=${api}&language=es-ES`)
      .then((res) =>res.json())
      .then(data =>{
        console.log(data)
        setPeli(data.results)
        setPage(page)
        setBarra(query)
      })
    }, [])

    const busca = async (query) => {
      return await fetch(`${api_url}/search/movie?query=${query}&api_key=${api}&language=es-ES`)
      .then((res) =>res.json())
      .then(data =>{
        console.log(data)
        setPeli(data.results)
        setPage(page)
        setBarra(query)
      })
     } 
     if(query !== barra){
      busca(query)
    }
 
  return (
    
    <>
        <section id="listado">
          <div className="contenedor">
              <div className="galeria">
                  { peli.map(item =>(
                      <div key={item.id}className="peliculas">
                        <img src={`${image_url + item.poster_path}`} alt="Imagen pelicula" className='image'/>
                        <div className='titulo'>{item.title}</div>
                        <div><button className="boton1" onClick={() => navigate(`/Detalles/${item.title}/${item.id}`)}> Informacion</button></div>
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

export default Busqueda