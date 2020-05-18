
const db = require('./../it-db')('./test/test-issues')
const services = require('./../it-services')(db)

var expect = require('chai').expect;


describe('it-services operations test',itServicesOperationsTests)

function itServicesOperationsTests() {  
  describe("DeleteIssue", deleteIssueTests)
  describe("InsertIssue", insertIssueTests)


  function deleteIssueTests() {
    it('should delete an existing issue', function(done) {
      // Arrange

      // Act
      services.deleteIssue(1, function(err, data) {

        // Assert
        expect(err).not.to.be.an('error')
        expect(data.id).to.equal(1)  
        expect(data.name).to.be.a('string')  
        done()
      })
    })

    it('should get an error for a non existing issue', function(done) {
      services.deleteIssue(4, function(err, data) {
        if(err) {
          done()
        }
        throw "it should have an error for a non existing issue"
      })
    })
  }


  function insertIssueTests() {
    it('should insert an valid issue', function(done) {
      done()
    })

    it('should get an error when inserting and invalid issue', function(done) {
      done()
    })
  }

  

}