import styled from 'styled-components'
import {useWeb3} from '@3rdweb/hooks'
import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'

export default function Home() {
    const { address, connectWallet } = useWeb3()
    return (
        <Wrapper>
            {address ? (
                <h2>{address}</h2>
            ) : (<WalletConnect>
                <Button onClick={() => connectWallet('injected')}>
                    Connect Wallet
                </Button>
                <Details>
                    You need Chrome to be
                    <br /> able to run this app.

                </Details>
            </WalletConnect>
            )}
           
        </Wrapper>
        )            
}

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    max-width: 100vw;
    background-color: #0a0b0d;
    color: white;
    display: grid;
    place-items: center;
`;

const WalletConnect = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

        &: hover {
        cursor: pointer;
`;


const Button = styled.div`
    flex: 0;
    border: 1px solid #282b2f;
    padding: 0.8rem;
    font-size: 1.3rem;
    font-weight: 500;
    border-radius: 0.4rem;
    background-color: #3773f5;
    color: #000;

        &: hover {
        cursor: pointer;
    }
`;


const Details = styled.div`
    font-size: 1.2rem;
    text-align: center;
    margin-top: 1rem;
    fon-weight: 500;
    color: #282b2f;
`;

