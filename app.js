import express from 'express'
import axios from 'axios'

const app = express()

// Configurer le moteur de rendu EJS
app.set('view engine', 'ejs')

// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }))

// Route : Page d'accueil pour saisir le code postal
app.get('/', (req, res) => {
   res.render('index')
})

// Route : Affiche les communes correspondant au code postal
app.post('/result', async (req, res) => {
   const { postalCode } = req.body
console.log('postalCode', postalCode)
   try {
      const response = await axios.get(
         `https://geo.api.gouv.fr/communes?codePostal=${postalCode}`
      )
      const communes = response.data
      console.log('communes', communes)
      res.render('result', { postalCode, communes, error: null })

   } catch (error) {
      res.render('result', {
         postalCode,
         communes: [],
         error: error.message,
      })
   }
})

// Démarrer le serveur
const PORT = 3000
app.listen(PORT, () => {
   console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
