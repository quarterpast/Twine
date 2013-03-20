![twine](https://f.cloud.github.com/assets/631757/278712/d4d4c6ca-90f0-11e2-83cf-95abf955b9c0.png)
Async code gets tangled. ```npm install twine```.


```livescript
{asyncfn,sync,future}:Twine = require \twine

class Example extends Twine
	getdata: asyncfn ->
		# sync code to get some data

	makefolder: asyncfn ->
		# sync code to create a directory to store a file in
		# this is run at the same time as getting the data

	writefile: @depends \getdata \makefolder asyncfn ({getdata: data, makefolder: folder})->
		# once there is some data and the directory exists,
		# write the data to a file in the directory
		return filename

	emaillink: @depends \writefile asyncfn (results)->
		# once the file is written let's email a link to it...
		# results.writefile contains the filename returned by writefile.

ex = new Example
ex.emaillink (err,results)->console.error that if err?
```

Twine ties in [async.js](http://github.com/caolan/async#auto)'s ```async.auto``` and [node-sync](http://github.com/0ctave/node-sync) so you can write clean, uncluttered, modular async code.

## The guts
### Twine subclasses
Any method in a subclass of ```Twine``` can be dependency, so long as it's either an ```asyncfn``` or takes a Node-style ```(err,result)->``` callback. Methods declare their dependencies using ```Twine.depends```. When you call a method with dependencies, Twine unwraps them and hands over to ```async.auto```, which does some clever stuff to work out when to call the things.

### ```asyncfn```
Anywhere within an ```asyncfn``` asynchronous functions can be called synchronously using ```sync```:

```livescript
asyncfn ->
	try
		contents = (sync fs.read-file) "awesome.txt" \utf8
	catch err
```
Errors what would have got passed to the first argument of the callback get thrown.

## Licence
[MIT](licence.md).
&copy;2013 Matt Brennan.