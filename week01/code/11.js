class Monad {
	constructor(fn) {
		this._value = fn
	}
	static of(value) {
		return new IO(function() {
			return value
		})
	}
	map(fn) {
		return new IO(fp.flowRight(fn, this._value))
	}
	join() {
		return this._value()
	}
	flatMap(fn) {
		return  this.map(fn).join()
	}
}