import {conmysql} from '../db.js'

export const getProductos=
    async (req,res)=>{
        try {
            const [result]=await conmysql.query('select * from productos')
            res.json(result) 
        } catch (error) {
            return res.status(500).json({message:"Error al consultar productos"})
        }
    }

export const getproductosxid=
async(req, res)=>{
    try {
        const [result]=await conmysql.query('select * from productos where prod_id=?', [req.params.id])
        if(result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Producto no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'Error del lado del servidor'})
    }
}

export const postProductos=
async(req, res)=>{
    try {
        //console.log(req.body)
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo}=req.body
        //console.log(cli_nombre)
        const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null; // Captura la imagen si está disponible

        console.log("Archivo de imagen:", req.file); // Verificación del archivo

        const[rows]=await conmysql.query('insert into productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) values(?,?,?,?,?,?)',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen])
        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'Error al lado del servidor'})
    }
}

export const putProductos=
    async(req, res)=>{
        try {
            const{id}=req.params
            //console.log(req.body)
            const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
            console.log(prod_nombre)
            const[result]=await conmysql.query('update productos set prod_codigo=?, prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=? where prod_id=?',
                [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen,req.params.id])
    
                if(result.affectedRows<=0)return res.status(404).json({
                    message:"producto no encontrado kkkkk"
                })
                const[rows]=await conmysql.query('select * from productos where prod_id=?',[id])
                res.json[rows[0]]
        } catch (error) {
            return res.status(502).json({message:'error del lado del servidor'})
            
        }
    }

    export const patchProductos=
    async(req, res)=>{
        try {
            const[id]=req.params.id
            //console.log(req.body)
            const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
            console.log(prod_nombre)
            const[result]=await conmysql.query('update productos set prod_codigo=IFNULL(?,prod_codigo), prod_nombre=IFNULL(?,prod_nombre), prod_stock=IFNULL(?,prod_stock), prod_precio=IFNULL(?,prod_nombre), prod_activo=IFNULL(?,prod_activo), prod_imagen=IFNULL(?,prod_imagen) where prod_id=?',
                [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen,id])
    
            if(result.affectedRows<=0)return res.status(404).json({
                message:"Productos no encontrado"
            })
            const[rows]=await conmysql.query('select * from productos where prod_id=?', [id])
            res.json[rows[0]]
        } catch (error) {
            return res.status(500).json({message:'Error al lado del servidor'})
        }
    }

export const deleteProductos=
    async(req, res)=>{
        try {
            const [rows]=await conmysql.query('delete from productos where prod_id=?',[req.params.id])
            if(rows.affectedRows<=0)return res.status(404).json({

                message:"no se puo eliminar al producto"
            })
            res.sendStatus(202)
        } catch (error) {
            return res.status(500).json({message:"error del lado del servidor"})
            
        }
    }