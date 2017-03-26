function test() {
return new Promise((resolve, reject) => {
	resolve('123')
})
}
test().then(data => {
	console.log(data)
})