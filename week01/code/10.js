const  { task } =  require('folktale/concurrency/task')
const { split,  find, flowRight } = require('lodash/fp')

const fs = require('fs')

function readFile(filename) {
	return task(resolver => {
		fs.readFile(filename, 'utf-8', (err, data) => {
			if (err) {
				resolver.reject(err)
			}
			resolver.resolve(data)
		})
	})
}

function log(log) {
	console.log(log)
	return log
}
readFile('./package.json')
.map(flowRight(find(item => item.includes('version')), split('\n')))
.run()
.listen({
	onRejected: err => console.log(err),
	onResolved: value => console.log(value)
})