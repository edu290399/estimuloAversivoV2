var contPasso = 0;
var contRepet = 0;

module.exports.envExpA = function(app, req, res){
	console.log(contPasso);
	contPasso++;
	if (contPasso==2){
		res.render('aguarde');
		contPasso = 0;
	}
}




module.exports.envExpB = function(app, req, res){
	res.render('aguarde');
}