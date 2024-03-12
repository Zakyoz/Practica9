const express = require('express')
const app = express()
const axios = require('axios')
const port = 3000
const URL = 'https://api-rest-productos.onrender.com/'

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/productos', (req, res) => {
  axios.get(URL + 'productos')
  .then (response=>{
      let mis_productos=[]
      response.data.map(item=>{
        const nuevo = item
        nuevo.proveedor= "Marco Ortaz"
        nuevo.costo=item.costo*1.8
        mis_productos.push(nuevo)
      })
      res.status(200).json(mis_productos)

  })
  .catch((e)=>{
      res.json(e)
  })
})

app.get('/productos/:id', (req, res) => {
  axios.get(URL + `productos/${req.params.id}`)
  .then((response) => {
    const nuevo = response.data
    nuevo.proveedor = "Marco Orta"
    nuevo.costo=parseInt(response.data.costo)*1.8
    res.status(200).json(nuevo)
  })
  .catch((e) =>{
    res.status(e.response.status).json(e)
  })
})

app.get('/productos/categoria/:cat', (req, res) => {
  axios.get(URL + `productos/categoria/${req.params.cat}`)
    .then(response => {
      let lista_cat=[]
      response.data.map(item=>{
        const nuevo = item
        nuevo.proveedor= "Marco Ortaz"
        nuevo.costo=parseInt(item.costo)*1.8
        lista_cat.push(nuevo)
      })
        res.status(200).json(lista_cat)   
    })
    .catch(error => {
      res.status(error.response.status).json(error.response.data)
    })
})

app.post("/productos", (req, res)=>{
  axios.post(URL + `productos/`, req.body)
  .then((response)=>{
    res.status(201).json(response.data)
  })
  .catch((e)=>{
    res.status(e.response.status).json(e)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
