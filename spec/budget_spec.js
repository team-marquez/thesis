const expect = require('chai').expect
const { budgetBoi } = require('./../server/src/bois/budget_boi.js')
const { recsData, budgetClientPreferances } = require('./dummyData.js')

describe('BudgetBoi', () => {
    
    describe('Activity Functionality', () => {

        it('should delete an activity if outside price range', () => {
            let data = [{name: 'Highline', type: ['activity'], cost: 0}, {name: 'ExpensivePlace', type: ['activity'], cost: 5}]
            let preLength = data.length
            let output2 = budgetBoi(data, budgetClientPreferances)
            expect(output2.length).to.lessThan(preLength)
        })
        
        it('should not delete an activity if inside price range', () => {
            let data = [{name: 'Highline', type: ['activity'], cost: 0}, {name: 'ExpensivePlace', type: ['activity'], cost: 5}]
            let output2 = budgetBoi(data, budgetClientPreferances)
            expect(output2[0].name).to.equal('Highline')
        })
    })

    describe('Restaurant Functionality', () => {
        let restData;
        
        beforeEach(() => {
            restData = [
            {name: 'Grimaldi\'s', type: ['restaurant'], cost: 1, mealtime: ['lunch', 'dinner']},
            {name: 'breakfast cafe', type: ['restaurant'], cost: 2, mealtime: ['breakfast']},
            {name: 'expensive breakfast cafe', type: ['restaurant'], cost: 4, mealtime: ['breakfast']},
            {name: 'lunch spot', type: ['restaurant'], cost: 1, mealtime: ['lunch']},
            {name: 'expensive lunch', type: ['restaurant'], cost: 4, mealtime: ['lunch']},
            {name: 'dinner place', type: ['restaurant'], cost: 4, mealtime: ['dinner']}
            ]
            budgetBoi(restData, budgetClientPreferances)
        })

        it('should remove expensive breakfast spots', () => {
            let flag = 'false'
            restData.forEach((spot) => {
                if (spot.name === 'expensive breakfast cafe') flag = 'true'
            })
            expect(flag).to.equal('false')
        })

        it('should remove expensive lunch spots', () => {
            let flag = 'false'
            restData.forEach((spot) => {
                if (spot.name === 'expensive lunch') flag = 'true'
            })
            expect(flag).to.equal('false')
        })

        it('should remove expensive dinner spots', () => {
            let flag = 'false'
            restData.forEach((spot) => {
                if (spot.name === 'dinner place') flag = 'true'
            })
            expect(flag).to.equal('false')
        })

        it('should keep an inexpensive breakfast spot', () => {
          let flag = 'false'
          restData.forEach((spot) => {
            if (spot.name === 'breakfast cafe') flag = 'true'
          })
          expect(flag).to.equal('true')
        })

        it('should keep an inexpensive lunch spot', () => {
          let flag = 'false'
          restData.forEach((spot) => {
            if (spot.name === 'lunch spot') flag = 'true'
          })
          expect(flag).to.equal('true')
        })

        it('should keep an inexpensive dinner spot', () => {
          let flag = 'false'
          restData.forEach((spot) => {
            if (spot.name === 'Grimaldi\'s') flag = 'true'
          })
          expect(flag).to.equal('true')
        })

        it('should keep a spot if is not too expensive for multiple meals', () => {
            let flag = 'false'
            restData.forEach((spot) => {
                if (spot.name === 'Grimaldi\'s') flag = 'true'
            })
            expect(flag).to.equal('true')
        })

    })
})