

var vm = require( 'vm' );

var source = '';
var output = [];

function getSafeRunner() {
	var global = this;
	function UserScript(str) {
		return Function('eval("' + str + '")');
	}
	return function run (src) {
		global.alert = function (str) {
			output.push(str);
		};
		global.print = function (str) {
		};
		global.console = {};
		global.console.log = function (str) {
		};
		UserScript(src)();
		//process.send({result:output});
		send({result:output});
		//console.log(output);
	};
}

process.on('message', function (m) {
	if (m.run) {
		console.log({msg:"CHILD got run message: "});
		if (m.code) {
			source += m.code;
		}
		var context = vm.createContext();
		context.output = output;
		context.send = function (obj) {
			process.send(obj);
			process.exit(0);
		};
		var safeRunner = vm.runInContext('(' + getSafeRunner.toString() + ')()', context);
		safeRunner(source);
	} else if (m.code) {
		console.log({msg:"CHILD got code message: " + m.code});
		source += m.code;
	}
});
