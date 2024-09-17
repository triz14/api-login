import cors from 'cors'
import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

// req = requisição / res = resposta
app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)

})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where:{
            id:req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id',  async(req, res) => {
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado com sucesso'})
})

// porta que eu quero que o servidor rode
app.listen(3000)

/*
    Rotas precisão de duas coisa:
    1 - tipo de rota / metodo http
    2- endereço
*/ 

/*
    Objetivo:
    criar API de usuarios
    1 - criar um usuario
    2 - listar todos os usuarios
    3 - editar um usuario
    4 - deletar um usuario
*/

/*
    user: beatriz
    senha: PFk28Tbhb72ghy82
*/