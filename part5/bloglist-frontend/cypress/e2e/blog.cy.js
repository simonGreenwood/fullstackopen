describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.contains("Log in to application")
    cy.contains("username")
    cy.contains("password")

  })
  describe("Login",function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/users", { username: "root", password: "sekret" })
    })
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("root")
      cy.get("#password").type("sekret")
      cy.get("#login-button").click()
      cy.contains("logged in as root")
    })
    it("fails with wrong credentials", function() {
      cy.get("#username").type("root")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()
      cy.get(".error")
        .should("contain", "wrong credentials")
        .should("have.css", "color", "rgb(255, 0, 0)")
        .should("have.css", "border-style", "solid")
    })
  })
  
  describe("When logged in", function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/users", { 
        username: "root", password: "sekret" 
      })
      cy.login({ username: "root", password: "sekret" })
      cy.visit("http://localhost:3000")
    })
    it("A blog can be created", function() {
      cy.contains("new blog").click()
      cy.get("#title").type("a blog created by cypress")
      cy.get("#author").type("cypress")
      cy.get("#url").type("cypress.com")
      cy.get("#create-button").click()
      cy.get(".success")
        .should("contain", "created blog")
        .should("have.css", "color", "rgb(0, 128, 0)")
        .should("have.css", "border-style", "solid")
      cy.contains("a blog created by cypress cypress")
    })
    describe("blog tests", function() {
      beforeEach(function() {
        cy.createBlog({
          title: "a blog created by cypress",
          author: "cypress",
          url: "cypress.com"
        })
      })
      it("A blog can be liked", function() {
        cy.contains("view").click()
        cy.contains("like").click()
        cy.contains("likes: 1")
      })
      it("A blog can be deleted", function() {
        cy.contains("view").click()
        cy.contains("remove").click()
        cy.get("html").should("not.contain", "a blog created by cypress cypress")
      })
      it("A blog can not be deleted by another user", function() {
        cy.request("POST", "http://localhost:3003/api/users", { 
          username: "simon", password: "sekret" 
        })
        cy.login({ username: "simon", password: "sekret" })
        cy.visit("http://localhost:3000")
        cy.contains("view").click()
        cy.get(".blog").should("not.contain", "remove")
      })
    }) 
  })
})