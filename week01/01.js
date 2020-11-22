function runPromise(callback) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			callback()
			resolve()
		}, 10)
	})
}

runPromise(function() {
	console.log(1)
}).then(() => runPromise(function() {
	console.log(2)
})).then(() => runPromise(function() {
	console.log(3)
}))

// new Promise((resolve, reject) => {
// 	setTimeout(function() {
// 		var a = 'hello'
// 		resolve()
// 	}, 10)
// }).then(() => {
// 	setTimeout(() => {
// 		var b = 'lagou'
// 		return
// 	},10)
// }).then(() => {
// 	setTimeout(() => {
// 		var c = 'I love U'
// 		console.log(a + b + c)
// 	}, 10)
// })