import styled from '@emotion/styled'

const Mensaje = styled.div`
    background-color: #c30c0c;
    color: #fff;
    font-weight: 700;
    text-align: center;
    padding: 15px;
    width: 100%;
    border-radius: 20px;
    font-family: 'Lato', sans-serif;
    text-transform: uppercase;
    font-size: 20px;

`;

export const Error = ({children}) => {
  return (
    <Mensaje>{children}</Mensaje>
  )
}
