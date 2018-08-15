const expect = require('chai').expect
const { assemblyBoi } = require('./../server/src/bois/assembly_boi.js')
const { recsData, clientPreferances } = require('./assemblyDummyData.js')

describe('Assembly Boi', () => {
		describe('Structure', () => {
			let output = assemblyBoi(recsData, clientPreferances)
				it('should return an objet', () => {
					expect(typeof output).to.equal('object')
				})

				it('should return an object with a breakfast array', () => {
					expect(output.hasOwnProperty('breakfast')).to.equal(true)
					expect(Array.isArray(output.breakfast)).to.equal(true)
				})

				it('should return an object with a lunch array', () => {
					expect(output.hasOwnProperty('lunch')).to.equal(true)
					expect(Array.isArray(output.lunch)).to.equal(true)
				})

				it('should return an object with a dinner array', () => {
					expect(output.hasOwnProperty('dinner')).to.equal(true)
					expect(Array.isArray(output.dinner)).to.equal(true)
				})

				it('should return an object with a morning array', () => {
					expect(output.hasOwnProperty('morning')).to.equal(true)
					expect(Array.isArray(output.morning)).to.equal(true)
				})

				it('should return an object with an afternoon array', () => {
					expect(output.hasOwnProperty('afternoon')).to.equal(true)
					expect(Array.isArray(output.afternoon)).to.equal(true)
				})

				it('should return an object with an evening array', () => {
					expect(output.hasOwnProperty('evening')).to.equal(true)
					expect(Array.isArray(output.evening)).to.equal(true)
				})

				it('should should have 3 items in each array for a 1 day trip', () => {
					expect(output.breakfast.length).to.equal(9)
					expect(output.lunch.length).to.equal(9)
					expect(output.dinner.length).to.equal(9)
					expect(output.morning.length).to.equal(9)
					expect(output.afternoon.length).to.equal(9)
					expect(output.evening.length).to.equal(9)
				})
		})
})