import { useEffect, useState } from "react";
import styled from "@emotion/styled"
import { Error } from "./Error";
import { useSelectMonedas } from "../hooks/useSelectMonedas";

const InputSubmit = styled.input`

    padding: 10px;
    background-color: #9296fd;
    width: 100%;
    color: #FFF;
    border: none;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition-property: background-color;
    transition-duration: .2s;

    :hover{
        background-color: #7478fb;
        cursor: pointer;
    }
`;

export const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const monedas = [
    {id: 'USD', nombre: 'Dólar de Estados Unidos'},
    {id: 'MXN', nombre: 'Peso Mexicano'},
    {id: 'EUR', nombre: 'Euro'},
    {id: 'GBP', nombre: 'Libra Esterlina'},
  ]

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas);

  const [ criptoMoneda, SelectCriptoMonedas ] = useSelectMonedas('Selecciona tu criptomoneda', criptos);  

  useEffect(() => {
    const consultarApi = async () => {

      try{
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        const arrayCripto = resultado.Data.map( crypto => {
          const objeto = {
            id: crypto.CoinInfo.Name,
            nombre: crypto.CoinInfo.FullName
          }

          return objeto;
        });

        setCriptos(arrayCripto)

      } catch( error ) {
        console.log(error);

      }

    }

    consultarApi();

  }, [])

 

  const handleSubmit = e => {
    e.preventDefault();

    if([moneda, criptoMoneda].includes('')){
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000)
      return;
    }

    setMonedas({
      moneda,
      criptoMoneda
    });

    

  }

  

  return (
    <>

      {error && (
        <Error>Todos los campos son obligatorios</Error>
      )}

      <form action="" onSubmit={handleSubmit}>
        <SelectMonedas/>
        <SelectCriptoMonedas/>
        <InputSubmit type="submit" value="Cotizar"/>
      </form>

    </>
    
  )
}
