class Container {
	constructor(value) {
		this._value = value
	}
	map(fn) {
		return Container.of(fn(this._value))
	}
	static of(value) {
		return new Container(value)
	}
}

class Maybe {
	constructor(value) {
		this._value = value
	}
	static of(value) {
		return new Maybe(value)
	}
	map(fn) {
		return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
	}
	isNothing() {
		return this._value === undefined || this._value === null
	}
}


class Left {
	constructor(value) {
		this._value = value
	}
	static of(value) {
		return new Left(value)
	}
	map(fn) {
		return this
	}
}
class Right {
	constructor(value) {
		this._value = value
	}
	static of(value) {
		return new Right(value)
	}
	map(fn) {
		return Right.of(fn(this._value))
	}
}


