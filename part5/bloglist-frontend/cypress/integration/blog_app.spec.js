describe('Blog app', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.visit('http://localhost:3000');
    });
  
    it('Login form is shown', function () {
      cy.contains('Log in to application');
    });
  
    describe('Login', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.createUser({
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen',
        });
        cy.visit('http://localhost:3000');
      });
  
      it('Succeeds with correct credentials', function () {
        cy.login({ username: 'mluukkai', password: 'salainen' });
        cy.contains('Matti Luukkainen logged in');
      });
  
      it('Fails with wrong credentials', function () {
        cy.login({ username: 'jhdfjksh', password: 'aklakala' });
        cy.contains('wrong username or password');
      });
    });
  
    describe('When logged in', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.createUser({
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen',
        }).then((user) => {
          cy.login({ username: user.username, password: user.password });
        });
        cy.visit('http://localhost:3000');
      });
  
      it('A blog can be created', function () {
        cy.createBlog({
          title: 'Vue vs React',
          author: 'Henry Shaw',
          url: 'https://www.shawhenry.com/blog/vuevsreact',
        });
        cy.contains('Vue vs React');
        cy.contains('Henry Shaw');
      });
  
      it('User can like a blog', function () {
        cy.createBlog({
          title: 'Vue vs React',
          author: 'Henry Shaw',
          url: 'https://www.shawhenry.com/blog/vuevsreact',
        }).then((blog) => {
          cy.contains('view').click();
          cy.contains('like').click();
          cy.contains('1');
        });
      });
  
      it('User who created the blog can delete it', function () {
        cy.createBlog({
          title: 'Vue vs React',
          author: 'Henry Shaw',
          url: 'https://www.shawhenry.com/blog/vuevsreact',
        }).then(() => {
          cy.contains('view').click();
          cy.contains('remove').click();
          cy.reload();
          cy.contains('Vue vs React').should('not.exist');
        });
      });
    });
  });
  