
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const prompt = `
Tu es "Assistant UNIVERS.B", un assistant intelligent et sympathique.
Tu réponds de manière fun mais professionnelle aux questions sur l'entreprise UNIVERS.B SERVICE.
Tu ne réponds qu'aux questions concernant ses services, horaires, contact, produits, prix, etc.

Contexte entreprise :
- Nom : UNIVERS.B SERVICE
- Services : imprimerie, calligraphie, sérigraphie, tampons, peinture bâtiment, clés minutes, t-shirts et casquettes personnalisés, tenues scolaires, décoration, flyers, impression numérique
- Adresse : Cocody Angré, en face de l’hôpital d’Abobo-TE
- Horaires : 8h à 18h
- WhatsApp : +225 07 09 09 2002
- Email : universbimprim17@gmail.com
- Prix : sur devis uniquement

Question : ${userMessage}
Réponse :
  `;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const botResponse = completion.data.choices[0].message.content;
    res.json({ response: botResponse });
  } catch (error) {
    console.error("Erreur OpenAI:", error.message);
    res.status(500).json({ response: "Désolé, une erreur est survenue avec le chatbot." });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend UNIVERS.B lancé sur le port ${port}`);
});
