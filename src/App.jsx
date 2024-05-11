import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Formulario } from './components/Formulario';
import { Resultado } from './components/Resultado';
import { Spinner } from './components/Spinner';
import imagenCripto from './img/imagen-criptos.png'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 768px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  display: block;
  width: 80%;
  margin: 100px auto 0 auto;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    display: block;
    height: 3px;
    width: 100px;
    background-color: #fff;
    margin: 10px auto 0 auto;
  }

`

function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [spinner, setSpinner] = useState(false);


  useEffect(() => {

    if(Object.keys(monedas).length > 0){
      const {moneda, criptoMoneda} = monedas;

      const consultarApi = async () => {
          try {
            setSpinner(true);
            setResultado({});
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            setResultado(resultado.DISPLAY[criptoMoneda][moneda]);
            
          } catch (error) {
            console.log(error);
            
          }

          setSpinner(false);
      }

      consultarApi();
    }

  }, [monedas])
  return (
    <Contenedor>
      <Imagen src={imagenCripto} alt='criptomonedas'/>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />

        {spinner && (
          <Spinner/>
        )}

        {Object.keys(resultado).length > 0 && (
          <Resultado
            resultado={resultado}
          />
        )}
      </div>
    </Contenedor>
  )
}

export default App
