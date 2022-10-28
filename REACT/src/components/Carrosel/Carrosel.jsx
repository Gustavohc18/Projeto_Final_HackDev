import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";


import "./Carrosel.css"



const Carrosel = ({idParamentro, categoriaProduto}) =>{
    const[data, setData] = useState([]);
    const carrossel = useRef(null);

    useEffect(() => {
     fetch('http://localhost:8086/produtos/info')
     .then((response)=>response.json())
     .then(setData);
    }, [])
    
   const handleLeftClick = (e) =>{
    e.preventDefault();
    carrossel.current.scrollLeft -= carrossel.current.offsetWidth;
   }

   const handleRightClick = (e) =>{
    e.preventDefault();
    carrossel.current.scrollLeft += carrossel.current.offsetWidth;
   }

    if(!data || !data.length) return null;
    // useParams
    // .filter

    
    const produtosFiltrados = data.filter((item)=> {
        return idParamentro != item.id && categoriaProduto == item.id_categoria
    })
    return (
        
        <div className="carros">        
        
            <div className="carrosel" ref={carrossel}>
                {produtosFiltrados.map((item)=> {
                    const{id, nome, preco, imagem} = item;
                    return(
                        <Link to={`/produto/${id}`} className="carrosel_item" key={id}>
                            <div className="carrosel_imagem">
                                <img src={imagem} alt={nome} />
                            </div>
                            <div className="carrosel_info">
                                <span className="carrosel_nome">{nome}</span>
                                <span className="carrosel_preco">R$ {preco}</span>
                            </div>
                           
                        </Link>
                    );
                })}
            </div>
            <div className="buttons">
                <button onClick={handleLeftClick}><img src="https://media.discordapp.net/attachments/1008727983223230494/1035537883060256788/unknown.png" alt="Scroll Esquerda"/></button>
                <button onClick={handleRightClick}><img src="https://media.discordapp.net/attachments/1008727983223230494/1035537883060256788/unknown.png" alt="Scroll Direita"/></button>
            </div>
           
        </div>

           

);

}

export default Carrosel;