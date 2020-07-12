const Employee = require("./Employee")

// code to define and export the Engineer class
const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
        this.role = 'Engineer'
    }
    
    getGithub() {
        return this.github
    }

    getRole() {
        return this.role
    }
}

module.exports = Engineer