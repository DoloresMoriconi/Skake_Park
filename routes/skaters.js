import { Router } from "express";
import * as db from "../db/db.js"

const router = Router()

router.get("/", async (req, res) => {
   try {
      const text = "SELECT * FROM skaters"
      const result = await db.query(text)

      res.json({
         skaters: result.rows
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         message: 'Internal Server Error'
      })
   }
})

router.post("/", async (req, res) => {
   try {
      const { email, nombre, password, anos_experiencia, especialidad } = req.body
   
      const text = "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)"
      const values = [
         email,
         nombre,
         password,
         anos_experiencia,
         especialidad, 
         'photo',
         false
      ]
      
      const result = await db.query(text, values)

      res.json({
         message: 'Success',
         skater: result.rows[0]
      })
   } catch (error) {
      res.status(500).json({
         message: 'Internal Server Error'
      })
      console.error(error)
   }
})

router.put("/", async (req, res) => {
   try {
      const { email, nombre, password, anos_experiencia, especialidad, estado } = req.body

      // EMAIL, FOTO
      const text = "UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4, estado = $5 WHERE email = $6 RETURNING *"
      const values = [nombre, password, anos_experiencia, especialidad, estado, email]

      const result = await db.query(text, values)

      res.json({
         message: 'Updated skater',
         skater: result.rows[0]
      })
   } catch (error) {
      res.status(500).json({
         message: 'Internal Server Error'
      })
      console.error(error)
   }
})

router.delete("/", async (req, res) => {
   try {
      const {email} = req.query
      const text = 'DELETE FROM skaters WHERE email = $1'
      const values = [email]

      const result = await db.query(text, values)

      res.json({
         message: `Deleted user with mail ${email}`
      })
   } catch (error) {
      res.status(500).json({
         message: 'Internal Server Error'
      })
      console.error(error)
   }
})

export { router }