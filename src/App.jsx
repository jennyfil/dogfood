import React, {useState, useEffect} from "react";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

import {Api} from "./Api.js";
import dataLocal from "./assets/data.json";

const dataHome = [];
for(let i=0; i < 6; i++) {
    let j = Math.floor(Math.random() * 16);

    if(!dataHome.includes(dataLocal[j])) {
        dataHome.push(dataLocal[j]);
    } else {
        j = Math.floor(Math.random() * 16);
        i--;
    }
}

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        if(token) {
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, [])

    useEffect(() => {
        setApi(new Api(token));
        setUser(localStorage.getItem("user"));
    }, [token])

    useEffect(() => {
        if(!user) {
            localStorage.removeItem("token");
            setToken(null);
        }
    }, [user])

    useEffect(() => {
        if(token) {
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, [api])


    return (
        <>
            <div className="container">
                <Header 
                    user={user}
                    setUser={setUser}
                    products={products}
                    setModalActive={setModalActive}
                />
                <main>
                    {user ? <Catalog data = {goods} /> : <Home data = {dataHome} />}
                </main>
                <Footer />
            </div>
            <Modal isActive={modalActive} setState={setModalActive} api={api} setToken={setToken} />
        </>

    )
}

export default App;