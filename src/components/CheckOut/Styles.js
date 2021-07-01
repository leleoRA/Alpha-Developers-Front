import styled from "styled-components";

const Container = styled.div`
margin:100px auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:978px;
background:#000;
`;

const Title = styled.div`
    width:95%;
    color:#F9E1CF;
    h2{
        font-size: 22px;
        font-weight: bold;
        margin: 20px 0;
    }
    span {
        font-size: 14px;
    }
`;

const OrderSummaryContainer = styled.div`
    width:95%;
    margin: 40px 0;
    background-color: #fff;
`;

const OrderLabels = styled.div`
    display: flex;
    width:100%;
    height: 60px;
    margin-bottom: 20px;
    background-color: #666;
    color: #FFF;
    div{
        display: flex;
        justify-content:center;
        align-items:center;
        height: 100%;
        width: 15%;
    }
    & > div:first-child{
        width:40%;
    }
`;

const ProcuctSummary = styled.div`
    display: flex;
    align-items: center;
    width:100%;
    margin-bottom: 15px;
    div{
        display: flex;
        justify-content:center;
        align-items:center;
        height: 100%;
        width: 15%;
        margin:10px;
    }
`;

const Product = styled.div`
    width:20%;
    flex-direction:column;
    span:nth-child(1){
        font-weight: bold;
        padding-bottom:10px;
    }
`;

const Image = styled.div`
    padding:0;
    width:20%;
    img {
        width: 130px;
        height:130px;
        object-fit: cover;
    }
`;

const SubtotalBar = styled.div`
    display: flex;
    justify-content:flex-end;
    align-items:center;
    height: 50px;
    background-color: #dadada;
    font-weight:bold;
    padding-right:20px;
`;

const ButtunsContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
height:100px;
width: 100%;
padding: 0 30px;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 45px;
    border-radius: 5px;
    color: #000;
    font-size: 15px;
    cursor: pointer;
    background-color: #dadada;
    &:hover {
        color: rgba(50, 50, 50, 0.8)
    }
`;

const FinishButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 60px;
    border-radius: 5px;
    color: #FFFFFF;
    font-size: 17px;
    background-color: red;
    cursor: pointer;
    &:hover {
        color: rgba(250, 250, 250, 0.8)
    }
`;

export { Container, Title, OrderSummaryContainer, OrderLabels, ProcuctSummary, Product, Image, SubtotalBar, ButtunsContainer, Button, FinishButton };