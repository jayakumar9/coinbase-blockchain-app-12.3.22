import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styled from 'styled-components'
import Main from "../components/Main";
import Sidebar from "../components/Sidebar"
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'

const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.NEXT_PUBLIC_METAMASK_KEY,
        ethers.getDefaultProvider(
            //Get the following link from metamask video time 1:51:39
            'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
        )
    )
)


const Dashboard = ({ address }) => {
    const [sanityTokens, setSanityTokens] = useState([])
    const [thirdWebTokens, setThirdWebTokens] = useState([])

    useEffect(() => {
        const getSanityAndThirdWebTokens = async () => {
            //sanity link to be pasete at be replaced as per video time from 1:46:12  to 1:45:10
            const coins = await fetch(
                "https://l9kgdpj2.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%0A%7D"
            )
            const sanityTokens = (await coins.json()).result
            setSanityTokens(sanityTokens)

            setThirdWebTokens(
                sanityTokens.map(token => sdk.getTokenModule(token.contractAddress))
            )
        }

        return getSanityAndThirdWebTokens()
    }, [])
    console.log('Sanity', sanityTokens)
    console.log('Thirdweb', thirdWebTokens)

    return (
        <Wrapper>
            <Sidebar />
            <MainContainer>
                <Header
                    walletAddress={address}
                    sanityTokens={sanityTokens}
                    thirdWebTokens={thirdWebTokens}                    
                />
                <Main
                    walletAddress={address}
                    sanityTokens={sanityTokens}
                    thirdWebTokens={thirdWebTokens}
                />
            </MainContainer>
        </Wrapper>
        )
}

export default Dashboard

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #0a0b0d;
    color: white;
    overflow: hidden;
`;

const MainContainer = styled.div`
    flex: 1;    
`;


