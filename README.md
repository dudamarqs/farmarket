# Farmarket – Marketplace Farmacêutico Mobile

Este repositório apresenta o **Farmarket**, um aplicativo mobile desenvolvido como projeto semestral da disciplina **Desenvolvimento Mobile I**.
O sistema simula um **marketplace farmacêutico**, permitindo interação entre **clientes**, **farmacêuticos** e **entregadores**, oferecendo uma estrutura básica e quase funcional de um aplicativo real.

O sistema inclui:

* Cadastro e autenticação de usuários
* Perfis integrados (cliente, farmacêutico e entregador)
* Fluxo de compra de produtos
* Interface moderna desenvolvida com tecnologias mobile
* Arquitetura organizada e apta para evolução futura

O projeto foi desenvolvido em equipe como parte da avaliação do semestre.

## Integrantes do Grupo e Contribuições

**Louie Nery Silva**
* Criação do Wireframes no Figma​
* Criação do BMC​
* Atividade adicional de exemplos

**Maria Eduarda Rita Marques Noleto**
* Criação do Wireframes no Figma​: fluxos de cliente, farmácia e entregador
* Criação do BMC​
* Atividade adicional de exemplos
* Desenvolvimento das telas de cliente, farmácia e entregador

**Murilo Farias Silva**
* Criação do Wireframes no Figma​: fluxos de cliente, farmácia e entregador
* Criação do BMC​
* Atividade adicional
* Desenvolvimento das telas de cliente e farmácia 
* Correção de bugs

**Tiago Souza Medeiros**
* Criação do Wireframes no Figma​: fluxos de cliente e farmácia
* Criação do BMC​
* Atividade adicional 
* Desenvolvimento das telas de cliente e farmácia
* Criação e integração com o banco de dados

## Tecnologias Utilizadas

* React Native
* TypeScript / JavaScript
* Expo
* React Navigation
* Consumo de API REST (simulado)

## Funcionalidades Principais

* Autenticação de usuários
* Catálogo de produtos farmacêuticos
* Exibição de detalhes dos produtos
* Carrinho e fluxo completo de pedido
* Acompanhamento de entrega
* Perfis integrados e diferenciados
* Interface moderna, intuitiva e responsiva

## Estrutura do Projeto

```
farmarket/
│
├── app/                   → telas e rotas do aplicativo
├── assets/
│   └── images/            → imagens e ícones
│
├── components/            → componentes reutilizáveis
├── constants/             → constantes globais (cores, layout, etc.)
├── farmarket db/          → arquivos de dados simulados (mock / json)
├── hooks/                 → hooks personalizados
├── scripts/               → scripts auxiliares
│
├── node_modules/          → dependências do projeto
│
├── .gitignore
├── app.json               → configuração do Expo
├── eslint.config.js       → configuração do ESLint
├── expo-env.d.ts          → definições de tipos do Expo
├── package-lock.json
├── package.json           → dependências e scripts
├── README.md              → documentação
└── tsconfig.json          → configuração do TypeScript
```

## Como Executar o Projeto

### 1 - Clonar o repositório

```sh
git clone https://github.com/dudamarqs/farmarket.git
cd farmarket
```

### 2 - Instalar dependências

```sh
npm install
```

### 3 - Executar o projeto

```sh
npx expo start
```

## Objetivo Acadêmico

O projeto faz parte da disciplina **Desenvolvimento Mobile I**, aplicando conceitos como:

* Arquitetura de aplicativos móveis
* Organização e navegação entre telas
* Gerenciamento de estado
* Trabalho colaborativo
* Desenvolvimento orientado a entregas
* Simulação de fluxo comercial dentro de ambiente mobile


## Licença

Projeto acadêmico. Código aberto para fins educativos.
