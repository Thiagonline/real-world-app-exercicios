describe('Exercício Guardião da Qualidade - Login e Registro', () => {
  
  // Criamos uma variável para guardar um usuário que sabemos que vai funcionar
  const userTeste = `thiago_qa_${Date.now()}`;

  it('PRE-REQUISITO - Deve registrar o usuário que usaremos nos testes', () => {
    cy.visit('/signup');
    cy.get('#firstName').type('Thiago');
    cy.get('#lastName').type('QA');
    cy.get('#username').type(userTeste);
    cy.get('#password').type('s3cret');
    cy.get('#confirmPassword').type('s3cret');
    cy.get('[data-test="signup-submit"]').click();
    cy.url().should('include', '/signin');
  });

  it('CT01 - Deve fazer login com sucesso', () => {
    cy.visit('/signin');
    cy.get('#username').type(userTeste);
    cy.get('#password').type('s3cret');
    cy.get('[data-test="signin-submit"]').click();
    
    // Verifica se entrou (o seletor de saldo ou a URL de dashboard)
    cy.get('[data-test="sidenav-user-balance"]', { timeout: 15000 }).should('be.visible');
  });

  it('CT02 - Deve exibir erro ao inserir credenciais inválidas', () => {
    cy.visit('/signin');
    cy.get('#username').type('usuario_que_nao_existe');
    cy.get('#password').type('senha_errada');
    cy.get('[data-test="signin-submit"]').click();

    // Aqui usamos uma busca mais flexível para a mensagem de erro
    cy.get('.MuiAlert-message', { timeout: 10000 })
      .should('be.visible');
  });
});