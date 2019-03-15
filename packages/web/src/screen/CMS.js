import React, {Component} from 'react';
import './../style/css/app.css'
import io from "socket.io-client";

export default class Home  extends Component {
    constructor(props){
        super(props);
        this.state={
            hastag: '',
            dados: [],
            msg: '',
            result: true,
        }

        this.buscar = this.buscar.bind(this)
        this.envTweet = this.envTweet.bind(this)
    }

    async buscar(event){
        event.preventDefault()
        let dados = await fetch('http://localhost:3001/findHastag',{
            method: 'POST',
            headers:{
                "Content-type": "Application/json",
                "Accept": "Application/json"
            },
            body:JSON.stringify({
                "hastag": this.state.hastag
            })
        })
        let dadosJson = await dados.json();

        if(dadosJson.result){
            this.setState({dados: dadosJson.users, msg: dadosJson.msg, result: dadosJson.result})
        }else {
            this.setState({dados: [], msg: dadosJson.msg, result: dadosJson.result});
            console.log('erro')
        }
    }

    //quando der um click em enviar vai enviar o dados do tweet para a screen home
    envTweet(user){
        if(user){
            this.socket.emit("envBackend", {nome: user.nome, comentario: user.comentario})
        }
    }

    componentDidMount(){
        this.socket = io("http://localhost:3001")
    }


    render(){
        const {dados} = this.state;
        return(
            <div className={'containerCMS'}>
                <div className={'title'}>Procure pela hastag</div>
                 <div className={'containerBuscar'}>
                    <input  className={'input'} type={'text'} placeholder={'Hastag'} onChange={e => this.setState({hastag: e.target.value})}/>
                    <button className={'btn'} onClick={this.buscar}>Buscar</button>
                </div>
                <div className={'subtitle'}>{this.state.msg}</div>
                 <div className={'containerUsers'}>
                    {dados.map((user, index)=> {
                        return  <div key={index}>
                                    - comentario: {user.comentario} <button className={'btnComentario'} onClick={() => this.envTweet(user)}> enviar </button>
                                </div>
                    })}
                 </div>
            </div>
        )
    }
}
