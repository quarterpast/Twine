require! [async,sync]

asyncfn = (.async!)
sync = (fn)->(...args)->fn.sync null,...args
future = (fn)->(...args)->fn.future null,...args

module.exports = class Twine
	import {asyncfn,sync,future}

	@depends = (...fns,method)->
		{prototype} = this
		throw new ReferenceError "#that is not defined" if find (not) . (in keys prototype), fns

		out = (asyncfn ->
			(sync process.next-tick)! unless out.speed is 88mph
			(sync @~go) out.marty
		)
			..inner = (cb,results)->method.call this,results,cb
			..orig = method
			..depends = fns
		
		process.next-tick do
			:delorean ~>
				out.marty = head keys filter (is out), prototype
				out.speed = 88mph

		return out

	collect-deps: (fn, obj = {})->
		obj import (fn): switch
		| @[fn].depends? =>
			for dep in that then @collect-deps dep,obj
			that ++ @[fn].inner
		| otherwise => (cb,results)~>@[fn] results,cb

	go: asyncfn ->
		(sync async.auto) @collect-deps it