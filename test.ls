{asyncfn,sync,future}:Twine = require \./
Sync = require \sync


class Test extends Twine
	a: asyncfn ->
		"hello"
	b: @depends \a asyncfn ->
		"there"

Sync ->
	t = new Test
	console.log t.b!