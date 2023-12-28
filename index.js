import express from "express"; // Importa o módulo 'express' para criar e configurar o servidor web
import mysql from "mysql2";  // Importa o módulo 'mysql2' para se conectar e interagir com o banco de dados MySQL
import cors from "cors"; // Importa o módulo 'cors' para habilitar a política de mesma origem (CORS) no servidor


const app = express(); // Cria uma instância do servidor Express
app.use(cors()); // Aplica o middleware 'cors' para permitir solicitações de diferentes origens
app.use(express.json());  // Aplica o middleware 'express.json()' para analisar solicitações com formato JSON

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_books",
});

// Rota para obter todos os livros do banco de dados
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Rota para adicionar um novo livro ao banco de dados
app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Rota para excluir um livro do banco de dados com base no ID
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Rota para atualizar informações de um livro no banco de dados com base no ID
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Inicia o servidor na porta 8800
app.listen(8800, () => {
  console.log("Connected to backend.");
});
