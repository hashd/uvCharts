r3.config = {
	graph : {
		palette : 'Hash'
	},

	meta : {
		position : '#r3_div'
	},

	dimension : {
		width : 200,
		height : 200
	},

	margin : {
		top : 40,
		bottom : 60,
		left : 60,
		right : 40
	},

	axis : {
		ticks : 8,
		subticks : 1,
		padding : 5,
		minor : -10
	},

	scale : {
		ordinality : 0.2
	},

	table : {
		tableclass : 'r3_table',
		headerclass : 'r3_header',
		bodyclass : 'r3_body',
		footerclass : 'r3_footer'
	},

	line : {
		interpolation : 'linear'
	},

	area : {
		interpolation : 'linear'
	},

	effects : {
		hovercolor : 'red',
		duration : 600
	}
};
