require! buster

buster.test-case "Twine tests" {
	set-up: ->
		@Twine = require \../

	"can subclass Twine": ->
		class A extends @Twine
		(new A) `assert.has-prototype` @Twine.prototype

	"simple methods": 
		set-up:->
			@a = new class extends @Twine
				method: -> "method return value"

		"are functions": ->
			assert.is-function @a.method

		"can be called": ->
			@a.method! `assert.same` "method return value"
}