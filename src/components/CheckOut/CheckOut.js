import { useHistory } from 'react-router-dom';
import { useEffect, useState , useContext} from "react";
import axios from "axios";
import { IoAdd, IoRemove } from 'react-icons/io5';
import UserContext from "../../contexts/UserContext.js";
import CartContext from "../../contexts/CartContext";
import { Container, Title, OrderSummaryContainer, OrderLabels, ProcuctSummary, Product, Image, Quantity, SubtotalBar, ButtunsContainer, Button, FinishButton } from './Styles';

export default function CheckOut() {

    const history = useHistory();
    const [cart, setCart] = useState([]);
    const {userProfile} = useContext(UserContext);
    const {userCart, setUserCart} = useContext(CartContext);
    const totalOrderValue = cart?.lenght !== 0 ? cart.reduce((acc, c) => acc += (c.price*c.orderQuantity), 0) : null;

    useEffect(()=>{
        const config = {headers: {Authorization: `Bearer ${userProfile?.token}`}};
        const request = axios.post(`http://localhost:4000/checkout`, userCart, config);
        request.then((r) => {
            setCart(r.data);
        });
        request.catch((error) => {
            /*if (error.response.status === 401){
                localStorage.clear();
                setUserProfile(null);
                return history.push("/");
            }*/
        })
        // eslint-disable-next-line
    },[]);

    function handleQuantity(operator, index) {
        let newCart = [...cart];
        const {id, orderQuantity} = newCart[index];
        if(operator === '-') {
            newCart[index] = {...newCart[index], orderQuantity: orderQuantity - 1};
            if(orderQuantity === 1) {
                newCart = cart.filter(c => c.id !== id);
            }
            setCart(newCart)
        }else if(operator === '+') {
            newCart[index] = {...newCart[index], orderQuantity: orderQuantity + 1};
            setCart(newCart)
        }
    }

    function keepBuying() {
        setUserCart(cart.map(c => ({productId: c.id, quantity: c.orderQuantity})));
        history.push("/products")
    }

    function handleFinishedOrder() {
        const config = {headers: {Authorization: `Bearer ${userProfile?.token}`}};
        const body = {cart}
        const request = axios.post(`http://localhost:4000/purchase`, body, config);
        request.then(() => {
            history.push("/products")
        });
        request.catch(e => {
            console.log(e.response.status);
        })
    }

    return(
        <Container>
            <Title>
                <h2>Carrinho de Compras</h2>
                <span>Bem vindo ao seu carrinho de compras, visualize seu pedido e finalize a compra</span>
            </Title>
            <OrderSummaryContainer>
                <OrderLabels>
                    <div>Nome</div>
                    <div>Disponibilidade</div>
                    <div>Quantidade</div>
                    <div>Preco Unitario</div>
                    <div>Subtotal</div>
                </OrderLabels>
                {cart?.lenght !== 0 ?
                    cart.map((c, i) => {
                        const productInfo = c.description.split(";").filter((s)=> s!=="");
                        const productValue = `R$ ${(c.price/100).toFixed(2).replace('.',',')}`;
                        const subTotal = `R$ ${(c.price*c.orderQuantity/100).toFixed(2).replace('.',',')}`;
                        return(
                            <ProcuctSummary key={c.id}>
                                <Product><span>{c.name}</span><span>{productInfo}</span></Product>
                                <Image><img src={c.image} alt={c.name}/></Image>
                                <div>{c.instock === 0 ? <span>Indisponivel</span> : <span>Disponivel <br/> {c.instock} unidades</span>}</div>
                                <Quantity>
                                    <button onClick={() => handleQuantity('-', i)}><IoRemove/></button>
                                    {c.orderQuantity}
                                    <button onClick={() => handleQuantity('+', i)}><IoAdd/></button>
                                </Quantity>
                                <div>{productValue}</div>
                                <div>{subTotal}</div>
                            </ProcuctSummary>
                        );
                    })
                    : "Ainda não há produtos nessa página."
                }
                <SubtotalBar>
                    <div>
                        Valor Total: 
                        <span> 
                            {totalOrderValue ? `R$ ${(totalOrderValue/100).toFixed(2).replace('.',',')}`: ""}
                        </span>
                    </div> 
                </SubtotalBar>
                
            </OrderSummaryContainer>
            <ButtunsContainer>
                <Button onClick={keepBuying}>
                    Continuar Comprando
                </Button>
                
                <FinishButton onClick={handleFinishedOrder}>
                    Finalizar Compra
                </FinishButton>
            </ButtunsContainer>
        </Container>
    );
}