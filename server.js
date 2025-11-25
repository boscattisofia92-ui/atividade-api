const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

let ferramentas = [
  {id: 1, nome: "Martelo", preco: 25, disponivel: true},
  {id: 2, nome: "Chave de Fenda", preco: 15, disponivel: true},
  {id: 3, nome: "Alicate", preco: 32, disponivel: false},
  {id: 4, nome: "Serrote", preco: 54, disponivel: true}
];

app.get("/ferramentas", (req, res) => {
  res.json(ferramentas);
});

app.get("/ferramentas/:id", (req, res) => {
  const id = Number(req.params.id);
  const ferramenta = ferramentas.find(u => u.id === id);
  if (!ferramenta){
    return res.status(404).json({erro: "Não encontrada"})
  }

  res.json(ferramenta);
});

app.post("/ferramentas", (req, res) => {
  const nova = {
    id: ferramentas.length + 1,
    nome: req.body.nome,
    preco: req.body.preco,
    disponivel: req.body.disponivel
  };

  ferramentas.push(nova);
  res.status(201).json(nova);
});

app.put("/ferramentas/:id", (req, res) => {
  const id = Number(req.params.id);
  const ferramenta = ferramentas.find(u => u.id === id);

  if (!ferramenta) {
    return res.status(404).json({ erro: "ferramenta não encontrada" });
  }

  ferramenta.nome = req.body.nome;
  ferramenta.preco = req.body.preco;
  ferramenta.disponivel = req.body.disponivel;

  res.json(ferramenta);
});

app.delete("/ferramentas/:id", (req, res) => {
  const id = Number(req.params.id);
  ferramentas = ferramentas.filter(u => u.id !== id);
  res.json({ mensagem: "ferramenta removida com sucesso" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});