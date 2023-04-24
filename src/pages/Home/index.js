import { useEffect, useState } from "react"; //para quando o usuario for abrir a aplicação mostrar os filmes peganddo da api
import api from "../../services/api";
import {Link} from 'react-router-dom';
import './home.css';

function Home(){
    const[filmes, setFilmes] = useState([]);
    const[loading,setLoading] = useState(true); //true ele fica carregando a pagina e false entra os filmes

    useEffect(()=>{ //sera chamado toda vez que a aplicação abrir
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", { //espera a requisição para alterar no set filmes
                params:{
                api_key: "da16439756b5f8b1d0279d6e4d4aecf2",
                language: "pt-BR",
                page: 1,
                }
            })
               //console.log(response.data.results.slice(0,10));
               setFilmes(response.data.results.slice(0,10))
               setLoading(false);
        }
             

        loadFilmes();
    },[])
    if(loading){ //caso a api fique lenta
        return(
            <div className="loading">
                <h2>Carregando filmes</h2>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.this} />
                            <Link className="acessar" to = {`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
           
        </div>
        
    )
}

export default Home;