import Carousel from './sections/Carousel.js';
import MovieWall from './sections/MovieWall.js';
import Program from './sections/program/Program.js';
import Events from './sections/Events.js';

export default function Index({handleLogin, login, setLogin}) {
  const handleClick = (data, type) => {
      const posters = document.getElementsByClassName("poster");
      
      for (var i = 0; i < posters.length; i++) {
          posters[i].className = posters[i].className.replace(" grayscale", "");
      }

      for (i = 0; i < posters.length; i++) {
          if (posters[i].id !== data["ID"].toString()) {
              posters[i].className += " grayscale"
          }
      }
      
      if (document.getElementById("movieTab").className.indexOf("hidden") !== -1) {
          document.getElementById("movieTab").className = document.getElementById("movieTab").className.replace("hidden", "block");
      }
      
      document.getElementById("movieName").innerHTML = data["name"];
      document.getElementById("movieDirector").innerHTML = data["director_name"];
      document.getElementById("movieRole").innerHTML = data["main_actor_name"];
      document.getElementById("movieRelease").innerHTML = data["release_date"];
      document.getElementById("movieLength").innerHTML = data["length"] + " minut";
      document.getElementById("movieAge").innerHTML = data["minimum_age"] + "+";
      document.getElementById("movieDescription").innerHTML = data["description"];

      if (type === 0) {
        const genres = [];

        for (i = 0; i < data["genres"].length; i++) {
            genres.push(data["genres"][i]["name"]);
        }
  
        document.getElementById("movieGenres").innerHTML = "Žánry: " + genres.join(" / ");
        document.getElementById("moviePoster").src = data["images"][1]["path"];
      } else {
        document.getElementById("movieGenres").innerHTML = "Žánry: " + data["genres"].join(" / ");
        document.getElementById("moviePoster").src = data["images"]["poster"];
      }

      const element = document.getElementById("movieTab");
      window.scroll({
          top: element.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
      });
  }
  return (
    <>
      <Carousel handleInfo={handleClick}/>
      <Program handleLogin={handleLogin} login={login} setLogin={setLogin}/>
      <MovieWall handleClick={handleClick}/>
      <Events/>
    </>
  )
}
