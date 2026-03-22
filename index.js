import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000; 

const app = express();
var listaProdutos = [];

app.use(session({
    secret: 'M1nh4Ch4v3S3cr3t4',
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 15
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.write(`
        
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Página Inicial</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    min-height: 100vh;
                    background-image: url(https://impe.com.br/blog/wp-content/uploads/2022/06/IMPE-3.jpg);
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    flex-direction: column;
                }
                .conteudo {
                    background-color: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    padding: 40px;
                    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
                }
                footer {
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 15px;
                    text-align: center;
                    margin-top: auto;
                }
            </style>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">Sistema de Cadastro de Produtos</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="menu">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/produtosCadastrados">Produtos Cadastrados</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container my-5">
                <div class="conteudo text-center">
                    <h2 class="mb-4 text-primary">Gerenciamento de Produtos</h2>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzIboNxqA1EQv4qn2zF3tmxUdN88d0VmHcXQ&s" 
                        class="img-fluid rounded mb-4" 
                        alt="Produtos"
                        style="max-height: 300px;">
                    <div>
                        <a href="/cadastroProduto" class="btn btn-primary btn-lg">Cadastrar Produtos</a>
                    </div>
                </div>
            </div>
            <footer>
                © 2026 - Sistema de Gerenciamento de Produtos | Desenvolvido por Vinícius
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `);

    res.end();
});

app.get('/cadastroProduto', isLogado, (req, res) => {

    res.write(`
        
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro de Produtos</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    min-height: 100vh;
                    background-image: url(https://impe.com.br/blog/wp-content/uploads/2022/06/IMPE-3.jpg);
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    flex-direction: column;
                }
                .conteudo {
                    background-color: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    padding: 40px;
                    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
                }
                footer {
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 15px;
                    text-align: center;
                    margin-top: auto;
                }
            </style>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">Sistema de Cadastro de Produtos</a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/produtosCadastrados">Produtos Cadastrados</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container my-5">
                <div class="conteudo">
                    <h2 class="text-center text-primary mb-4">Cadastro de Produtos</h2>
                    <form method="POST" action="/cadastroProduto">
                        <div class="mb-3">
                            <label class="form-label">Código de Barras</label>
                            <input type="text" class="form-control" name="codigoBarras">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Descrição do Produto</label>
                            <input type="text" class="form-control" name="descricao">
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Preço de Custo</label>
                                <input type="number" step="0.01" class="form-control" name="precoCusto">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Preço de Venda</label>
                                <input type="number" step="0.01" class="form-control" name="precoVenda">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Data de Validade</label>
                                <input type="date" class="form-control" name="dataValidade">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Quantidade em Estoque</label>
                                <input type="number" class="form-control" name="quantidadeEstoque">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nome do Fabricante</label>
                            <input type="text" class="form-control" name="fabricante">
                        </div>
                        <div class="d-grid gap-2 mt-4">
                            <button type="submit" class="btn btn-primary btn-lg">Cadastrar Produto</button>
                            <a href="/produtosCadastrados" class="btn btn-secondary">Voltar</a>
                        </div>
                    </form>
                </div>
            </div>
            <footer>
                © 2026 - Sistema de Gerenciamento de Produtos | Desenvolvido por Vinícius
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `);

    res.end();
});

app.post('/cadastroProduto', isLogado, (req, res) => {

    const codigoBarras = req.body.codigoBarras;
    const descricao = req.body.descricao;
    const precoCusto = req.body.precoCusto;
    const precoVenda = req.body.precoVenda;
    const dataValidade = req.body.dataValidade;
    const quantidadeEstoque = req.body.quantidadeEstoque;
    const fabricante = req.body.fabricante;

    if(!codigoBarras || !descricao || !precoCusto || !precoVenda || !dataValidade || !quantidadeEstoque || !fabricante) {

        let html = `
        
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro de Produtos</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    min-height: 100vh;
                    background-image: url(https://impe.com.br/blog/wp-content/uploads/2022/06/IMPE-3.jpg);
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    flex-direction: column;
                }
                .conteudo {
                    background-color: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    padding: 40px;
                    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
                }
                footer {
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 15px;
                    text-align: center;
                    margin-top: auto;
                }
            </style>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">Sistema de Cadastro de Produtos</a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/produtosCadastrados">Produtos Cadastrados</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container my-5">
                <div class="conteudo">
                    <h2 class="text-center text-primary mb-4">Cadastro de Produtos</h2>
                    <form method="POST" action="/cadastroProduto">
                        <div class="mb-3">
                            <label class="form-label">Código de Barras</label>
                            <input type="text" class="form-control" name="codigoBarras" value="${codigoBarras}">`;

                            if(!codigoBarras) {
                                html += `<div class="alert alert-danger mt-2" role="alert">
                                            Por favor, informe o codigo de barras.
                                        </div>`;
                            }

                            html+=`
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Descrição do Produto</label>
                            <input type="text" class="form-control" name="descricao" value="${descricao}">`;

                            if(!descricao) {
                                html += `<div class="alert alert-danger mt-2" role="alert">
                                            Por favor, informe a descrição do produto.
                                        </div>`;
                            }

                            html+=`
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Preço de Custo</label>
                                <input type="number" step="0.01" class="form-control" name="precoCusto" value="${precoCusto}">`;

                                if(!precoCusto) {
                                    html += `<div class="alert alert-danger mt-2" role="alert">
                                                Por favor, informe o preço de custo.
                                            </div>`;
                                }

                                html+=`
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Preço de Venda</label>
                                <input type="number" step="0.01" class="form-control" name="precoVenda" value="${precoVenda}">`;

                                if(!precoVenda) {
                                    html += `<div class="alert alert-danger mt-2" role="alert">
                                                Por favor, informe o preço de venda.
                                            </div>`;
                                }

                                html+=`
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Data de Validade</label>
                                <input type="date" class="form-control" name="dataValidade" value="${dataValidade}">`;

                                if(!dataValidade) {
                                    html += `<div class="alert alert-danger mt-2" role="alert">
                                                Por favor, informe a data de validade.
                                            </div>`;
                                }

                                html+=`
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Quantidade em Estoque</label>
                                <input type="number" class="form-control" name="quantidadeEstoque" value="${quantidadeEstoque}">`;

                                if(!quantidadeEstoque) {
                                    html += `<div class="alert alert-danger mt-2" role="alert">
                                                Por favor, informe a quantidade em estoque.
                                            </div>`;
                                }

                                html += `
                            </div>
                            <div class="mb-3">
                            <label class="form-label">Nome do Fabricante</label>
                            <input type="text" class="form-control" name="fabricante" value="${fabricante}">`;

                                if(!fabricante) {
                                    html += `<div class="alert alert-danger mt-2" role="alert">
                                                Por favor, informe o nome do fabricante.
                                            </div>`;
                                }

                                html += `
                        </div>
                        <div class="d-grid gap-2 mt-4">
                            <button type="submit" class="btn btn-primary btn-lg">Cadastrar Produto</button>
                            <a href="/produtosCadastrados" class="btn btn-secondary">Voltar</a>
                        </div>
                    </form>
                </div>
            </div>
            <footer>
                © 2026 - Sistema de Gerenciamento de Produtos | Desenvolvido por Vinícius
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>     
        `;

        res.write(html);
        res.end();

    } else {

        listaProdutos.push({
            "codigoBarras": codigoBarras,
            "descricao": descricao,
            "precoCusto": precoCusto,
            "precoVenda": precoVenda,
            "dataValidade": dataValidade,
            "quantidadeEstoque": quantidadeEstoque,
            "fabricante": fabricante
        });

        res.redirect('/produtosCadastrados');
    }
});

app.get('/produtosCadastrados', isLogado, (req, res) => {

    const ultimoAcesso = req.cookies?.ultimoAcesso || "Nunca acessou";

    res.write(`
        
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Produtos Cadastrados</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    min-height: 100vh;
                    background-image: url(https://impe.com.br/blog/wp-content/uploads/2022/06/IMPE-3.jpg);
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    flex-direction: column;
                }
                .conteudo {
                    background-color: rgba(255, 255, 255, 0.95);
                    border-radius: 15px;
                    padding: 30px;
                    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
                }
                footer {
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 15px;
                    text-align: center;
                    margin-top: auto;
                }
            </style>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">Sistema de Cadastro de Produtos</a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link active" href="/produtosCadastrados">Produtos Cadastrados</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container my-5">
                <div class="conteudo">
                    <h2 class="text-center text-primary mb-4">Produtos Cadastrados</h2>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover text-center align-middle">
                            <thead class="table-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Preço Custo</th>
                                    <th>Preço Venda</th>
                                    <th>Validade</th>
                                    <th>Estoque</th>
                                    <th>Fabricante</th>
                                </tr>
                            </thead>
                            <tbody>
                            `);

                            for (let i = 0; i < listaProdutos.length; i++) {
                                const produto = listaProdutos[i];
                                res.write(`
                                    <tr>
                                        <td>${produto.codigoBarras}</td>
                                        <td>${produto.descricao}</td>
                                        <td>${produto.precoCusto}</td>
                                        <td>${produto.precoVenda}</td>
                                        <td>${produto.dataValidade}</td>
                                        <td>${produto.quantidadeEstoque}</td>
                                        <td>${produto.fabricante}</td>
                                    </tr>
                                `);
                            }

                            res.write(`
                            </tbody>
                        </table>
                    </div>
                    <div class="text-center mt-4">
                        <a href="/cadastroProduto" class="btn btn-primary btn-lg">Cadastrar Novo Produto</a>
                    </div>
                    <p class="mt-5 mb-3 text-body-secondary">Último acesso: ${ultimoAcesso}</p>
                </div>
            </div>
            <footer>
                © 2026 - Sistema de Gerenciamento de Produtos | Desenvolvido por Vinícius
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `);

        res.end();
});

app.get('/login', (req, res) => {

    res.write(`
        
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Login</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    height: 100vh;
                    background-image: url(https://impe.com.br/blog/wp-content/uploads/2022/06/IMPE-3.jpg);
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .login-container {
                    background-color: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    padding: 40px;
                    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
                }
            </style>
        </head>
        <body class="d-flex align-items-center justify-content-center">
            <div class="login-container col-11 col-sm-8 col-md-5 col-lg-4">
                <h2 class="text-center mb-4 text-primary">Login</h2>
                <form method="POST" action="/login">
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input id="email" name="email" type="email" class="form-control" placeholder="Digite seu email">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Senha</label>
                        <input id="senha" name="senha" type="password" class="form-control" placeholder="Digite sua senha">
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">Entrar</button>
                    </div>
                    <div class="text-center mt-3">
                        <a href="#" class="text-decoration-none">Esqueci minha senha</a>
                    </div>
                </form>
            </div>
        </body>
        </html>
    `);

    res.end();
});

app.post('/login', (req, res) => {
    
    const email = req.body.email;
    const senha = req.body.senha;

    if (email === "admin@unoeste.br" && senha === "123456") {

        req.session.logado = true;
        req.session.email = email;
    
        const dataUltimoAcesso = new Date();
        res.cookie("ultimoAcesso", dataUltimoAcesso.toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
        res.redirect("/");

    } else {
        res.write(`
            
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        height: 100vh;
                        background-image: url(https://impe.com.br/blog/wp-content/uploads/2022/06/IMPE-3.jpg);
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    .login-container {
                        background-color: rgba(255, 255, 255, 0.9);
                        border-radius: 15px;
                        padding: 40px;
                        box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
                    }
                </style>
            </head>
            <body class="d-flex align-items-center justify-content-center">
                <div class="login-container col-11 col-sm-8 col-md-5 col-lg-4">
                    <h2 class="text-center mb-4 text-primary">Login</h2>
                    <form method="POST" action="/login">
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input id="email" name="email" type="email" class="form-control" placeholder="Digite seu email">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Senha</label>
                            <input id="senha" name="senha" type="password" class="form-control" placeholder="Digite sua senha">
                        </div>
                        <span>
                            <p class="text-danger">E-mail ou senha inválidos!!!</p>
                        </span>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Entrar</button>
                        </div>
                        <div class="text-center mt-3">
                            <a href="#" class="text-decoration-none">Esqueci minha senha</a>
                        </div>
                    </form>
                </div>
            </body>
            </html>
        `);

        res.end();
    }
});

function isLogado(req, res, prox) {

    if(req.session?.logado) {
        prox();

    } else {

        res.redirect('/login');
    }

}

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});