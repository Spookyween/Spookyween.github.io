let reflection = {};

(function(){
	let initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

	this.Class = function(){};
   
	// Opprett en ny klasse som arver fra denne klassen
	Class.extend = function(prop, ref_name) {
		if(ref_name)
			reflection[ref_name] = Class;
			
		let _super = this.prototype;

		// Instantier en basisklasse (men opprett bare forekomsten, ikke kjør init-konstruktøren)
		initializing = true;
		let prototype = new this();
		initializing = false;
		 
		// Kopier egenskapene over på den nye prototypen
		for (let name in prop) {
		// Sjekker om vi overskriver en eksisterende funksjon
		prototype[name] = typeof prop[name] == "function" && 
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn) {
				return function() {
					let tmp = this._super;

					// Legg til en ny ._super()-metode som er samme metode, men på superklassen
					this._super = _super[name];

					// Metoden må bare bindes midlertidig, så vi fjerner den når vi er ferdige med å kjøre
					let ret = fn.apply(this, arguments);        
					this._super = tmp;

					return ret;
				};
			})(name, prop[name]) :
			prop[name];
		}
		 
			// Dummy-klassekonstruktøren
		function Class() {

			// All konstruksjon gjøres faktisk i init-metoden
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}
		 
		// Fyll ut vårt konstruerte prototypeobjekt
		Class.prototype = prototype;
		 
		// Tving konstruktøren til å være det vi forventer
		Class.prototype.constructor = Class;

		// Og gjør denne klassen utvidbar
		Class.extend = arguments.callee;
		 
		return Class;
	};
})();