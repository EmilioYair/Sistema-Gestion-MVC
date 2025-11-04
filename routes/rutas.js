import {Router} from "express" //desestructuracion {Router}
import {nuevoContacto, mostrarContactos, buscarContactoPorID, editarContacto, buscarContactoPorNombre, borrarContactos} from "../bd/contactosBD.js"

const router = Router()

var artistas = ["Van Gogh","Bethoven","Mozart","Da Vinci",""]

router.get("/",(req,res)=>{
    res.render("home", { artistas });
})



router.get("/info/:c/:texto",(req,res)=>{
    var c = req.params.c
    var texto = req.params.texto
    console.log(c)
    res.render("info",{c,texto})
})

router.get("/contactanos",(req,res)=>{
    var co = req.params.ab
    console.log(co) 
    res.render("contactanos")
})

router.post("/contactanos", async(req, res)=>{
    var nombre = req.body.nombre
    var edad = req.body.edad
    console.log("Nombre: "+nombre+" Edad: "+edad)
    const respuestaMongo = await nuevoContacto(req.body)
    console.log(respuestaMongo)
    res.render("recibirDatos", {nombre, edad})
})

router.get("/mostrarContactos", async (req, res)=>{
    const contactosBD = await mostrarContactos()
    res.render("mostrarContactos", {contactosBD})
})

router.get("/editarContacto/:id", async(req, res)=>{
    const id = req.params.id
    const contactoBD = await buscarContactoPorID(id)
    res.render("editarContacto", {contactoBD})
})

router.post("/editarContacto", async(req, res)=>{
    const respuestaMongo = await editarContacto(req.body)
    res.redirect("/mostrarContactos")
})

router.post("/buscarContacto", async(req, res)=>{
    const contactosBD = await buscarContactoPorNombre(req.body.buscar)
    res.render("mostrarContactos", {contactosBD})
})

router.get("/borrarContactos/:id", async(req, res)=>{
    const id = req.params.id
    const respuestaMongo = await borrarContactos(id)
    res.redirect("/mostrarContactos")
})

export default router