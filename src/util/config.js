uv.config = {
  graph: {
    palette: 'Default',
    bgcolor: '#FFFFFF',
    orientation: 'Horizontal',
    max: 0,
    min: 0,
    custompalette: [],
    opacity: 1,
    responsive: true,
    align: 'xMinYMin',
    meetOrSlice: 'meet'
  },

  meta: {
    position: '#uv-div',
    caption: '',
    subcaption: '',
    hlabel: '',
    vlabel: '',
    hsublabel: '',
    vsublabel: '',
    isDownloadable: false,
    downloadLabel: 'Download'
  },

  dimension: {
    width: 400,
    height: 400
  },

  margin: {
    top: 50,
    bottom: 150,
    left: 100,
    right: 100
  },

  frame: {
    bgcolor: '#FFFFFF'
  },

  axis: {
    ticks: 8,
    subticks: 2,
    padding: 5,
    minor: -10,
    strokecolor: '#000000',
    fontfamily: 'Arial',
    fontsize: '14',
    fontweight: 'bold',
    showticks: true,
    showsubticks: true,
    showtext: true,
    showhortext: true,
    showvertext: true,
    opacity: 0.1
  },

  label: {
    fontfamily: 'Arial',
    fontsize: '11',
    fontweight: 'normal',
    strokecolor: '#000000',
    showlabel: true,
    precision: 2,
    prefix: '',
    suffix: '',
    formatter: undefined
  },

  tooltip: {
    show: true,
    format: '%c [%l]: %v'
  },

  scale: {
    type: 'linear',
    ordinality: 0.2
  },

  bar: {
    strokecolor: 'none',
    fontfamily: 'Arial',
    fontsize: '10',
    fontweight: 'bold',
    textcolor: '#000'
  },

  line: {
    interpolation: 'linear',
    showcircles: true,
    circleradius: 3.5,
    circleopacity: 0.6,
    fontfamily: 'Arial',
    fontsize : '10',
    fontweight: 'bold',
    textcolor: '#000',
    strokewidth: 1.5,
    strokeopacity: 1
  },

  area: {
    interpolation: 'cardinal',
    offset: 'zero',
    opacity: 0.2
  },

  pie: {
    fontfamily: 'Arial',
    fontsize: '14',
    fontweight: 'normal',
    fontvariant: 'small-caps',
    fontfill: '#FFFFFF',
    strokecolor: '#FFFFFF',
    strokewidth: 1
  },

  donut: {
    fontfamily: 'Arial',
    fontsize: '14',
    fontweight: 'normal',
    fontvariant: 'small-caps',
    fontfill: '#000',
    factor: 0.4,
    strokecolor: '#FFFFFF',
    strokewidth: 1
  },

  caption: {
    fontfamily: 'Arial',
    fontsize: '14',
    fontweight: 'bold',
    fontvariant: 'small-caps',
    textdecoration: 'none',
    hovercolor: '#696969',
    strokecolor: '#0000FF',
    textanchor: 'middle',
    cursor: 'pointer'
  },

  subCaption: {
    fontfamily: 'Arial',
    fontsize: '9',
    fontweight: 'normal',
    fontvariant: 'normal',
    textdecoration: 'none',
    textanchor: 'middle'
  },

  legend: {
    position: 'bottom',
    fontfamily: 'Arial',
    fontsize: '11',
    fontweight: 'normal',
    color: "#000000",
    strokewidth: 0.15,
    textmargin: 15,
    symbolsize: 10,
    inactivecolor: '#DDD',
    legendstart: 0,
    legendtype: 'categories',
    showlegends: true,
  },

  effects: {
    hovercolor: '#FF0000',
    strokecolor: 'none',
    textcolor: '#000000',
    duration: 800,
    hover: 400,
    showhovertext: false
  }
};
