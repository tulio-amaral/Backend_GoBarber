# Backend_GoBarber
 Backend do GoBarber, desenvolvido durante bootcamp GoStack promovido pela RocketSeat

## Funcionalidades Macro

# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha, informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2 horas;
- O usuário precisa confirma a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve ser capaz de atualizar seu perfil;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;
-

# Painel do prestador

**RF**

- Usuário deve poder listar seus agendamentos em um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviados em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrado;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuario deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realiazar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve dura uma hora exatamente;
- Os agendamentos devem estar disponíveis entre 8h até as 18h (Primeiro horário às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar um horário consigo mesmo;

# Legenda:
-RF Requisitos funcionais;
-RNF Requisitos não funcionais;
-RN Regras de negócios;
