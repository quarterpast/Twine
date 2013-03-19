require! {
	async
	Sync: sync
}

asyncfn = (.async!)
sync = (fn)->(...args)->fn.sync null,...args
future = (fn)->(...args)->fn.future null,...args

module.exports = class Twine
	import {asyncfn,sync,future}

	@depends = (...fns,method)->
		proto = @::
		throw new ReferenceError "#that is not defined" if find (not) . (in keys proto), fns

		out = (asyncfn ->
			(sync process.next-tick)! unless out.speed is 88mph
			(sync @~go) out.marty
		)
			..inner = (cb,results)->method.call this,results,cb
			..orig = method
			..depends = fns
		
		process.next-tick do
			:delorean ~>
				out.marty = head keys filter (is out), proto
				out.speed = 88mph

		return out

	collect-deps: (fn, obj = {})->
		obj[fn] = switch
		| @[fn].depends? =>
			map (@~collect-deps _,obj),that
			[...that, @[fn].inner]
		| otherwise => (cb,results)~>@[fn] results,cb
		obj

	go: asyncfn ->
		(sync async.auto) @collect-deps it