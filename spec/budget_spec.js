const expect = require('chai').expect
const { budgetBoi } = require('./../server/src/bois/budget_boi.js')
const { recsData, clientPreferances } = require('./dummyData.js')

describe('BudgetBoi', () => {
    // describe('Structure', () => {
    //     let output = budgetBoi(recsData, clientPreferances)
        
    //     it('should return an object', () => {
    //         expect(typeof output).to.equal('object')
    //     })
        
    // })
    
    describe('Functionality', () => {
        // let output = budgetBoi(recsData, clientPreferances)

        // it('should return a shorter object than the one it was fed', () => {
        //     expect(Object.keys(output).length).to.be.lessThan(Object.keys(recsData).length)
        // })

        it('should delete an activity if outside price range', () => {
            let data = [{name: 'Highline', type: ['activity'], cost: 0}, {name: 'ExpensivePlace', type: ['activity'], cost: 5}]
            let output2 = budgetBoi(data, clientPreferances)
            expect(output2.length).to.lessThan(data.length)
        })
        
        it('should not delete an activity if inside price range', () => {
            let data = [{name: 'Highline', type: ['activity'], cost: 0}, {name: 'ExpensivePlace', type: ['activity'], cost: 5}]
            let output2 = budgetBoi(data, clientPreferances)
            expect(output2[0].name).to.equal('Highline')
        })

    })
})