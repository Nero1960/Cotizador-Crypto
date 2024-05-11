import styled from "@emotion/styled";

const ResultadoCss = styled.div`
    font-family: "Lato", sans-serif;
    color: #fff;
    @media (min-width: 768px){
      display: grid;
      grid-template-columns: 1fr 3fr;
      place-items: center;
    }
`;

const Texto = styled.p`
  font-size: 18px;
  span{
    font-weight: 700;
  }
    

`;

const Precio = styled.p`
  font-size: 30px;
  span{
    font-weight: 900;
  }  

`;


export const Resultado = ({resultado}) => {
  const {IMAGEURL, PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = resultado;
  return (
    <ResultadoCss>
      <img src={`https://www.cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" width='100' height='100' />

      <div>
        <Precio>El precio es de :<span>{PRICE}</span></Precio>
        <Texto>El precio mas bajo del día es:  <span>{LOWDAY}</span></Texto>
        <Texto>El precio mas alto del día es:  <span>{HIGHDAY}</span></Texto>
        <Texto>Variación ultimas 24 hrs:  <span>{CHANGEPCT24HOUR}</span></Texto>
        <Texto>Ultima Actualización:  <span>{LASTUPDATE}</span></Texto>
      </div>

    </ResultadoCss>
  )
}
