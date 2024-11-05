import {conmysql} from '../db.js'
export const getUsuarios=
    async (req,res)=>{
        try {
            const [result]=await conmysql.query('select * from usuarios')
            res.json(result) 
        } catch (error) {
            return res.status(500).json({message:"Error al consultar usuario"})
        }
    }

export const getusuariosxid=
    async (req,res)=>{
        try {
            const [result]=await conmysql.query('select * from usuarios where usr_id=?', [req.params.id])
        if(result.length<=0)return res.status(404).json({
            usr_id:0,
            message:"Usuario no encontrado"
        })
        res.json(result[0])
        } catch (error) {
            return res.status(500).json({message:'Error del lado del servidor'})
        }
    }

export const postUsuario=
    async (req,res)=>{
        try {
            const{usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
            const[rows]=await conmysql.query('insert into usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) values(?,?,?,?,?,?)',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo])
        res.send({
            id:rows.insertId
        })
        } catch (error) {
            return res.status(500).json({message:'Error al lado del servidor'})
        }
    }

export const putUsuario=
    async(req, res)=>{
        try {
            const{id}=req.params.id
            //console.log(req.body)
            const { usr_usuario,usr_clave,usr_nombre,usr_telefono,usr_correo,usr_activo}=req.body
            const hashedPassword = await bcrypt.hash(usr_clave, saltRounds);
            console.log(usr_nombre)
            const[result]=await conmysql.query('update usuarios set usr_usuario=?, usr_clave=?,usr_nombre=?,usr_telefono=?,usr_correo=?,usr_activo=? where usr_id=?',
                [usr_usuario,hashedPassword,usr_nombre,usr_telefono,usr_correo,usr_activo,id])
    
                if(result.affectedRows<=0)return res.status(404).json({
                    message:"Usuario no encontrado"
                })
                const[rows]=await conmysql.query('select * from usuarios where usr_id=?',[id])
                res.json[rows[0]]
        } catch (error) {
            return res.status(502).json({message:'error del lado del servidor'})
            
        }
    }

