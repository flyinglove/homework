new Promise((resolve, reject) => {
	setTimeout(function() {
		var a = 'hello'
		resolve()
	}, 10)
}).then(() => {
	setTimeout(() => {
		var b = 'lagou'
		return
	},10)
}).then(() => {
	setTimeout(() => {
		var c = 'I love U'
		console.log(a + b + c)
	}, 10)
})