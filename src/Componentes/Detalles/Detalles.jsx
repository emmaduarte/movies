import React, { useState, useEffect } from "react";
import "./detalles.css";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
//componentes del modal
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
/*carrusel
import Carousel from "better-react-carousel";
/*tarjeta del carrusel
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";*/
// seccion imagenes
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
//avatar
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  minWidth: "390px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 0,
};

const Detalles = () => {
  const { id } = useParams();
  const image_url = "https://image.tmdb.org/t/p/w500";
  const api_url = "https://api.themoviedb.org/3";
  const api = "575bcbc20d4282f26a0fda173e2568e3";
  const [peli, setPeli] = useState([]);
  const [credi, setCredi] = useState([]);
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  {
    /*Llamado a la api de los detalles */
  }
  useEffect(() => {
    fetch(`${api_url}/movie/${id}?api_key=${api}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPeli(data);
      });
  }, []);

  {
    /*Llamado a la api de los creditos */
  }
  useEffect(() => {
    fetch(`${api_url}/movie/${id}/credits?api_key=${api}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCredi(data.cast);
      });
  }, []);

  {
    /*Llamado a la api de los videos para el trailer*/
  }
  useEffect(() => {
    fetch(`${api_url}/movie/${id}/videos?api_key=${api}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.results) {
          const trailer1 = data.results.find((vid) => vid.type === "Trailer");
          console.log(trailer1);
          setTrailer(trailer1 ? trailer1.key : data.results[0].key);
        }
      });
  }, []);

  return (
    <section id="detalles">
      <Container sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
        <Grid container>
          <Grid item xs={12} md={5} lg={4}>
            <Container sx={{ justifyContent: "center", display: "flex" }}>
              <div key={peli.id} className="imagen">
                <img
                  src={`${image_url + peli.poster_path}`}
                  alt="Imagen pelicula"
                />
              </div>
            </Container>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Container>
              <div className="descripcion">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "Column",
                    background: "",
                  }}
                >
                  <Typography variant="h3" gutterBottom>
                    {peli.title}
                  </Typography>
                  <Typography
                    variant="overline"
                    display="flex"
                    alignItems={"center"}
                    flexWrap={"wrap"}
                    gutterBottom
                  >
                    {peli.release_date}
                    <ul>
                      {peli.genres?.map((gen) => (
                        <li key={gen.id} className="lista">
                          {" ● "}
                          {gen.name}
                        </li>
                      ))}
                    </ul>
                    <Button onClick={handleOpen} sx={{ marginLeft: "10px" }}>
                      Ver trailer
                    </Button>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      slots={{ backdrop: Backdrop }}
                      slotProps={{
                        backdrop: {
                          timeout: 500,
                        },
                      }}
                    >
                      <Fade in={open}>
                        <Box sx={style}>
                          {trailer ? (
                            <>
                              <div className="video">
                                <YouTube
                                  videoId={trailer}
                                  opts={{
                                    width: "100%",
                                    heigth: "100%",
                                    playerVars: {
                                      autoplay: 0,
                                      controls: 1,
                                      cc_load_policy: 0,
                                      fs: 1,
                                      iv_load_policy: 0,
                                      modestbranding: 0,
                                      rel: 0,
                                      showinfo: 0,
                                    },
                                  }}
                                />
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </Box>
                      </Fade>
                    </Modal>
                  </Typography>
                  {peli.overview ? (
                    <>
                  <Typography variant="h6" padding={"15px 0"} gutterBottom>
                    Vista general
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {peli.overview}
                  </Typography>
                  </>
                  ) : (
                    ""
                  )}
                  {peli.popularity ? (
                    <>
                  <Typography variant="subtitle1" gutterBottom>
                    Popularidad: {peli.popularity}
                  </Typography>
                  </>
                  ) : (
                    ""
                  )}
                  {peli.budget ? (
                    <>
                  <Typography variant="subtitle1" gutterBottom>
                    Presupuesto: $ {peli.budget}
                  </Typography>
                  </>
                  ) : (
                    ""
                  )}
                  {peli.revenue ? (
                    <>
                  <Typography variant="subtitle1" gutterBottom>
                    Ganancia: $ {peli.revenue}
                  </Typography>
                  </>
                  ) : (
                    ""
                  )}
                  {peli.vote_average ? (
                    <>
                  <Typography variant="subtitle1" gutterBottom>
                    Voto promedio: {peli.vote_average}
                      </Typography>
                  </>
                  ) : (
                    ""
                  )}
                  
                  
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent={"space-around"}
                    padding={"20px 0"}
                    flexWrap={"wrap"}
                  >
                    {peli.production_companies?.map((item) =>
                      item.logo_path ? (
                        <img
                          src={`${image_url + item.logo_path}`}
                          className="logo"
                          key={item.id}
                        />
                      ) : (
                        <span className="logo-descripcion" key={item.id}>
                          {" "}
                          {item.name}{" "}
                        </span>
                      )
                    )}
                  </Stack>
                </Box>
              </div>
            </Container>
          </Grid>
        </Grid>
      </Container>
      {/* 
      <Carousel
        cols={9}
        rows={1}
        gap={10}
        loop
        scrollSnap={true}
        className="carusel"
        responsiveLayout={[
          {
            breakpoint: 1360,
            cols: 7,
            rows: 1,
            gap: 10,
            loop: true,
          },
          {
            breakpoint: 1100,
            cols: 6,
            rows: 1,
            gap: 10,
            loop: true,
          },
          {
            breakpoint: 900,
            cols: 5,
            rows: 1,
            gap: 10,
            loop: true,
          },
          {
            breakpoint: 766,
            cols: 3,
            rows: 1,
            gap: 10,
            loop: true,
          },
        ]}
      >
        {credi?.map((item) => (
          
            item.profile_path ? (
            <Carousel.Item className="carusel" key={item.id}>
              <img
                height="200px"
                className="carusel-img"
                src={`${image_url + item.profile_path}`}
              />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="#ececff"
              >
                {item.original_name}
              </Typography>
              <Typography variant="body2" color="#ececff">
                {item.character}
              </Typography>
            </Carousel.Item>)
            :
            (null)

          
        ))}
      </Carousel>*/}

      <div className="boton">
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
      {/*</div>*/}
    </section>
  );
};

export default Detalles;
