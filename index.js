// Definindo imports

const express = require("express")
const cors = require("cors")
const firebase = require("firebase")

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADcPrsrUHF53jxOLp17XaJnaZfd2nS2oQ",
    authDomain: "node-firebase-rest-api-eddfc.firebaseapp.com",
    projectId: "node-firebase-rest-api-eddfc",
    storageBucket: "node-firebase-rest-api-eddfc.appspot.com",
    messagingSenderId: "650712554731",
    appId: "1:650712554731:web:608debc949d48a5bb432ae"
  };
  
//Inicializando o firebase
firebase.initializeApp(firebaseConfig);
  
//Inicializando o Express
const app = express()

//Definindo a utilização de JSON no corpo da requisição (BODY PARSER)
app.use(express.json())

//Definindo a utilização do CORS (FRONTEND)
app.use(cors())

//Definindo o tipo de banco de dados
const db = firebase.firestore()

//Definindo a coleção do banco de dados
const User = db.collection('users')

//Definindo as rotas para o CRUD (sem definição de recursos!!!)
//Recuperando todos os documentos da coleção
app.get("/", async (req,res) =>{
// a constante snapshot irá receber o resultado da busca na coleção Users
  const snapshot = await User.get()
  console.log(snapshot)
  // criando o objeto que irá receber o JSON com os documentos do banco
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  console.log(users)
  //eniando para o usuário a resposta da aquisição
  res.send(users)
})

// Recuperando um documento especifico na coleção
app.get("/:id", async (req,res) =>{
  // criando uma constante para receber o parametro ID que está vindo na requisição
  const id = req.params.id
  const snapshot = await User.get() 
 // criando o objeto que irá receber o JSON com os documentos do banco
 const users = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data()
}))

//filtrando dentro do retorno do anco para encontrar o documento com o id enviado por parametro
const user = users.filter(u => {
  return u.id == id
})
//enviando a resposta da requisição
res.send(user)


})

//salvando um documento na coleção

app.post ('/', async (req,res)=>{
  //armazenando o corpo da requisição em um objeto
  const data = req.body
  console.log(data)
  //inserindo o objeto data na coleção
  await User.add(data)
//enviando uma resposta para a requisição
res.status(201).send({
  msg: "usuário salvo!"
})
})

//atualizando um documento na coleção
app.put("/:id", async (req,res) =>{
  const id = req.params.id
  await User.doc(id).update(req.body)
  res.send({
    msg: "Usuario alterado!"
  })
})

//excluindo um documento na coleção
app.delete("/:id", async (req,res) =>{
  const id= req.params.id
  await User.doc(id).delete()
  res.send({
    msg: "Usuário excluido!"
  })
})



//Definindo a porta onde o servidor estará ouvindo
app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000")
})
