let BASEPATH   = 'Content/';
let DIV        = '<div />';
let CLS_FIGURE = 'figure';
let CLS_MATTER = 'matter';

let directions = {
	none  : 0,
	left  : 1,
	up    : 2,
	right : 3,
	down  : 4,
};
let mario_states = {
	normal : 0,
};
let size_states = {
	small : 1,
};
let ground_blocking = {
	none   : 0,
	left   : 1,
	top    : 2,
	right  : 4,
	bottom : 8,
	all    : 15,
};
let collision_type = {
	none       : 0,
	horizontal : 1,
	vertical   : 2,
};
let death_modes = {
	normal : 0,
};
let images = {
	enemies : BASEPATH + 'fiender.png',
	sprites : BASEPATH + 'karakter.png',
	objects : BASEPATH + 'objekter.png',
};
let constants = {
	interval        : 20,
	bounce          : 15,
	gravity         : 2,
	start_lives     : 5,
	max_width       : 400,
	max_height      : 15,
	jumping_v       : 27,
	walking_v       : 7,
	ballmonster_v   : 2,
	max_coins       : 100,
	invulnerable    : 1000,
}
let c2u = function(s) {
	return 'url(' + s + ')';
};
let q2q = function(figure, opponent) {
	if(figure.x > opponent.x + 16)
		return false;		
	else if(figure.x + 16 < opponent.x)
		return false;		
	else if(figure.y + figure.state * 32 - 4 < opponent.y)
		return false;		
	else if(figure.y + 4 > opponent.y + opponent.state * 32)
		return false;
		
	return true;
};
Math.sign = function(x) {
	if(x > 0)
		return 1;
	else if(x < 0)
		return -1;
		
	return 0;
};