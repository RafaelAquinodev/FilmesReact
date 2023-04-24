import { useEffect, useState } from 'react'; //estudar
import { useParams, useNavigate } from 'react-router-dom' //estudar
import './filme.css';
import api from '../../services/api';
import {toast} from 'react-toastify';

function Filme(){
  const { id } = useParams();
  const navigate = useNavigate(); //nao entendi muito
  const [filme, setFilme] = useState({}); 
  const [loading, setLoading] = useState(true); 

  useEffect(()=>{
    async function loadFilme(){ 
      await api.get(`/movie/${id}`, { 
        params:{
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
        }
      })
      .then((response)=>{ 
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{ //se der erro
        console.log("FILME NAO ENCONTRADO")
        navigate("/",{replace: true})
        return;
      })
    }

    loadFilme();


    return () => {
      console.log("COMPONENTE FOI DESMONTADO")
    }
  }, [navigate, id])

  function salvarFilme(){  
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)  //metodo para verificar se dentro da lista tem pelo menos um item igual

    if(hasFilme){
        toast.warn("Esse filme já está na sua lista!")
        return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")


  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  
  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.this} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span><br/>
      <strong>Avalição: {filme.vote_average.toFixed(1)} / 10</strong><br/> 

      <div className="area-buttons"> 
        <button onClick={salvarFilme}>Salvar</button>
        <button> 
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>

    </div>
  )
}

export default Filme;