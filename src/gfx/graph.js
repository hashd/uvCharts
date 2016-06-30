/**
* uv.Graph is an abstract class of sorts which serves as the base for all other graphs. Instances of it wouldnt be anything except bare bones needed to create a chart.
* id          - unique id corresponding to the graph, created using current timestamp {#TODO: needs improved logic}
* graphdef    - definition of the graph, containing data on which the visualization is built
* config      - configuration of the graph, affecting the visual styling of the graph
* frame      - <svg> element acting as the parent graph container
* panel      - <g> element containing everything else, making it easier to move all elements across the svg
* bg          - <rect> element which acts as the background for the graph
* effects    - object containing functions which cause the various interactions on the graph
* labels      - labels from the dataset provided
* categories  - categories from the dataset provided
* axes        - object containing axes related stuff: group, func, scale, axis, line, label
*
*/
uv.Graph = function (graphdef, config) {
  var self = this;
  self.id = uv.util.getUniqueId();
  self.graphdef = null;
  self.config = null;

  self.frame = null;
  self.panel = null;
  self.chart = null;
  self.bg = null;
  self.effects = {};
  self.axes = {
    hor: { group: null, scale : null, func: null, axis : null, line : null, label : null },
    ver: { group: null, scale : null, func: null, axis : null, line : null, label : null },
    meta: { min: null, max: null }
  };

  self.labels = null;
  self.categories = null;

  self.graphdef = graphdef;
  self.config = uv.util.extend({}, uv.config, config);
  return this;
};

/**
* As the name suggests, this function initializes graph object construction based on the config and graphdef
* @param  {Object} graphdef Definition of the graph, take a look at constants.js for complete documentation
* @param  {Object} config   Configuration of the graph, take a look at config.js for complete documentation
* @return {Object}          The graph object itself, to support method chaining
*
* #TODO: Remove dependency on jQuery/$
*/
uv.Graph.prototype.init = function () {
  var self = this;
  self.max()
    .min()
    .position(self.config.meta.position || 'body')
    .setDimensions()
    .setFrame()
    .setPanel()
    .setBackground()
    .setCaption()
    .setSubCaption()
    .setMetadata()
    .setHorizontalAxis()
    .setVerticalAxis()
    .setEffectsObject();

  if(self.config.meta.isDownloadable){
    self.setDownloadOptions();
  }
  if(self.config.legend.showlegends){
    self.setLegend();
  }

  return self;
};

/**
* Sets the dimensions of the graphs, namely height, width and margins: left, right, top and bottom
* @return {Object}        The graph object itself, to support method chaining
*/
uv.Graph.prototype.setDimensions = function () {
  var self = this;
  self.height(self.config.dimension.height)
    .width(self.config.dimension.width)
    .top(self.config.margin.top)
    .bottom(self.config.margin.bottom)
    .left(self.config.margin.left)
    .right(self.config.margin.right);

  return this;
};

/**
* This function downloads the graph in png format.
*
*/
uv.Graph.prototype.setDownloadOptions = function () {
  if (uv.util.isDownloadSupported()) {
    var self = this;
    self.download = self.panel.append('g').classed(uv.constants.classes.download, true);
    self.download.append('text').classed(uv.constants.classes.download, true)
    .text(self.config.meta.downloadLabel)
    .attr('y', -self.config.margin.top / 2)
    .attr('x', self.config.dimension.width-25)
    .attr('text-anchor', self.config.caption.textanchor)
    .style('font-family', self.config.caption.fontfamily)
    .style('font-size', '12')
    .style('cursor', self.config.caption.cursor)
    .style('stroke', self.config.caption.strokecolor)
    .style('text-decoration', 'underline')
    .on('mouseover', function() {
      var dnldBtn = d3.select(this);
      dnldBtn.style('color','#0000FF');
    })
    .on('mouseout', function() {
      var dnldBtn = d3.select(this);
      dnldBtn.style('color','#8D8D8D');
    })
    .on('click', function () {
      var dnldBtn = d3.select(this);
      dnldBtn.style('display','none');
      uv.util.svgToPng(self, function() {
          dnldBtn.style('display',null);
      });
    });
  }
};


/**
* Sets the main <svg> element which contains rest of the graph elements
* @return {Object}        The graph object itself, to support method chaining
*/
uv.Graph.prototype.setFrame = function () {
  var self = this;
  if (!self.frame) {
    self.frame = d3.select(self.position() || 'body').append('div')
      .classed(uv.constants.classes.chartdiv, true)
      .style('display','inline-block')
      .style('width', '100%')
      .style('height', '100%')
      .append('svg');
  }

  self.frame.attr('id', uv.constants.classes.uv + '-' + self.id)
    .classed(uv.constants.classes.frame, true);

  if (self.config.graph.responsive === true) {
    self.frame.attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio', self.config.graph.align + ' ' + self.config.graph.meetOrSlice)
      .attr('viewBox', '0 0 ' + (self.width() + self.left() + self.right()) + ' ' + (self.height() + self.top() + self.bottom()));
  } else {
    self.frame.attr('width', self.width() + self.left() + self.right())
      .attr('height', self.height() + self.top() + self.bottom());
  }

  self.frame.append('rect').classed(uv.constants.classes.framebg, true)
    .attr('width', self.width() + self.left() + self.right())
    .attr('height', self.height() + self.top() + self.bottom())
    .style('fill', self.config.frame.bgcolor);

  return this;
};

/**
* Sets the <g> element which serves as the base position for the graph elements
* @return {Object}        The graph object itself, to support method chaining
*/
uv.Graph.prototype.setPanel = function () {
  var self = this;
  if (!self.panel) {
    self.panel = self.frame.append('g');
  }

  self.panel.attr('id', uv.constants.classes.panel + '-' + self.id)
    .classed(uv.constants.classes.panel, true)
    .attr('transform', 'translate(' + self.left() + ',' + self.top() + ')');

  return this;
};

/**
* Sets the <rect> element which serves as the background for the chart
* @param {String} color Color code for the background, set to config value if not specified
* @return {Object}      The graph object itself, to support method chaining
*/
uv.Graph.prototype.setBackground = function (color) {
  var self = this;
  if (!self.bg) {
    self.bg = self.panel.append('rect').classed(uv.constants.classes.bg, true)
            .attr('height', self.height())
            .attr('width', self.width());
  }
  self.bg.style('fill', color || self.config.graph.bgcolor);

  self.chart = self.panel.append('g').classed(uv.constants.classes.chart, true)
          .style('opacity', self.config.graph.opacity);
  return this;
};

/**
* Sets the caption for the graph
* @return {Object}      The graph object itself, to support method chaining
*/
uv.Graph.prototype.setCaption = function () {
  var self = this;
  self.caption = self.panel.append('g').classed(uv.constants.classes.caption, true);

  self.caption.append('text').classed(uv.constants.classes.captiontext, true)
    .text(self.config.meta.caption)
    .attr('y', -self.config.margin.top / 2)
    .attr('x', self.config.dimension.width / 2)
    .attr('text-anchor', self.config.caption.textanchor)
    .style('font-family', self.config.caption.fontfamily)
    .style('font-size', self.config.caption.fontsize)
    .style('font-weight', self.config.caption.fontweight)
    .style('font-variant', self.config.caption.fontvariant)
    .style('text-decoration', self.config.caption.textdecoration)
    .on('mouseover', uv.effects.caption.mouseover(self.config))
    .on('mouseout', uv.effects.caption.mouseout(self.config));

  return this;
};


/**
* Sets the subcaption for the graph
* @return {Object}      The graph object itself, to support method chaining
*/
uv.Graph.prototype.setSubCaption = function () {
  var self = this;
  self.subCaption = self.panel.append('g').classed(uv.constants.classes.subcaption, true);

  self.subCaption.append('text').classed(uv.constants.classes.subcaptiontext, true)
    .text(self.config.meta.subcaption)
    .attr('y', -self.config.margin.top / 2 + 1*self.config.caption.fontsize)
    .attr('x', self.config.dimension.width / 2)
    .attr('text-anchor', self.config.caption.textanchor)
    .style('font-family', self.config.subCaption.fontfamily)
    .style('font-size', self.config.subCaption.fontsize)
    .style('font-weight', self.config.subCaption.fontweight)
    .style('font-variant', self.config.subCaption.fontvariant)
    .style('text-decoration', self.config.subCaption.textdecoration);

  return this;
};


/**
* Sets the metadata for the graph, this includes the labels and the categories
* @return {Object}      The graph object itself, to support method chaining
*/
uv.Graph.prototype.setMetadata = function () {
  var self = this;
  self.labels = uv.util.getLabelArray(self.graphdef);
  self.categories = uv.util.getCategoryArray(self.graphdef);
  return this;
};

/**
* Sets the Horizontal Axis functions but doesnt render it yet
* return {Object}      The graph object itself, to support method chaining
*/
uv.Graph.prototype.setHorizontalAxis = function () {
  var self = this;
  var graphdef = self.graphdef;
  if (!self.axes.hor.group) {
    self.axes.hor.group = self.panel.append('g').classed(uv.constants.classes.horaxis, true)
                  .attr('transform', 'translate(0,' + self.height() + ')')
                  .style('shape-rendering','crispEdges');
  }

  if (self.config.graph.orientation === 'Horizontal') {
    self.axes.hor.scale  = d3.scale[self.config.scale.type]()
                .domain([self.config.scale.type === 'log' ? 1: self.min(), self.max()])
                .range([0, self.width()]);

    if (self.axes.hor.scale.nice) {
      self.axes.hor.scale.nice();
    }

    if(!self.config.axis.showsubticks){
      self.config.axis.subticks = 0;
    }
    self.axes.hor.func = d3.svg.axis()
                .scale(self.axes.hor.scale)
                .ticks(self.config.axis.ticks)
                .tickSize(-self.height(), self.config.axis.minor, 0)
                .tickPadding(self.config.axis.padding)
                .tickSubdivide(self.config.axis.subticks)
                .orient('bottom');

  } else {
    self.axes.hor.scale = d3.scale.ordinal()
                .rangeRoundBands([0, self.width()], self.config.scale.ordinality);

    self.axes.hor.func = d3.svg.axis()
                .scale(self.axes.hor.scale)
                .tickPadding(self.config.axis.padding)
                .orient('bottom');

    if(!self.config.axis.showtext || !self.config.axis.showhortext) {
      self.axes.hor.func.tickSize(0);
    }
  }
  if(!self.config.axis.showtext || !self.config.axis.showhortext) {
      self.axes.hor.func.tickFormat(function (d) { return ''; });
  }

  return this;
};

/**
* Sets the Vertical axis functions, but doesnt render it yet
* @return {Object}        The graph object itself, to support method chaining
*/
uv.Graph.prototype.setVerticalAxis = function () {
  var self = this;
  var graphdef = self.graphdef;
  if (!self.axes.ver.group) {
    self.axes.ver.group = self.panel.append('g').classed(uv.constants.classes.veraxis, true)
                              .style('shape-rendering','crispEdges');
  }

  if (self.config.graph.orientation === 'Vertical') {
    self.axes.ver.scale  = d3.scale[self.config.scale.type]()
                .domain([self.max(), self.config.scale.type === 'log' ? 1 : self.min()])
                .range([0, self.height()]);

    if (self.axes.ver.scale.nice) {
      self.axes.ver.scale.nice();
    }

    if(!self.config.axis.showsubticks){
      self.config.axis.subticks = 0;
    }
    self.axes.ver.func = d3.svg.axis()
                .scale(self.axes.ver.scale)
                .ticks(self.config.axis.ticks)
                .tickSize(-self.width(), self.config.axis.minor, 0)
                .tickPadding(self.config.axis.padding)
                .tickSubdivide(self.config.axis.subticks)
                .orient('left');


  } else {
    self.axes.ver.scale = d3.scale.ordinal()
                .rangeRoundBands([0, self.height()], self.config.scale.ordinality);

    self.axes.ver.func = d3.svg.axis()
                .scale(self.axes.ver.scale)
                .tickPadding(self.config.axis.padding)
                .orient('left');

    if(!self.config.axis.showtext || !self.config.axis.showvertext){
      self.axes.ver.func.tickSize(0);
    }
  }
  if(!self.config.axis.showtext || !self.config.axis.showvertext) {
    self.axes.ver.func.tickFormat(function (d) { return ''; });
  }

  return this;
};

/**
* Creates placeholders for functions which cause the various animations across the graph to be able invoke it from other places
* @return {Object}        The graph object itself, to support method chaining
*/
uv.Graph.prototype.setEffectsObject = function () {
  var self = this;
  var effectArray = (self.config.legend.legendtype === 'categories') ? self.categories : self.labels;
  for (var i = 0; i < effectArray.length ; i++) {
    self.effects[effectArray[i]] = {};
  }
  return self;
};

/**
* Draws the horizontal axis within the frame based on the orientation and functions already created
* @return {Object} The graph object itself, to support method chaining
*/
uv.Graph.prototype.drawHorizontalAxis = function () {
  var self = this;
  self.axes.hor.axis = self.axes.hor.group.append('g')
                .style('font-family', self.config.label.fontfamily)
                .style('font-size', self.config.label.fontsize)
                .style('font-weight', self.config.label.fontweight)
                .call(self.axes.hor.func);

  if (self.config.axis.showticks) {
    self.axes.hor.axis.selectAll('line').style('stroke', self.config.axis.strokecolor)
                .style('opacity', self.config.axis.opacity);
  }
  self.axes.hor.axis.selectAll('path').style('fill','none');

  self.axes.hor.line = self.panel.append('line')
                .classed(uv.constants.classes.horaxis, true)
                .attr('y1', self.config.graph.orientation === 'Horizontal' ? self.height() : self.axes.ver.scale(self.min()))
                .attr('y2', self.config.graph.orientation === 'Horizontal' ? self.height() : self.axes.ver.scale(self.min()))
                .attr('x1', '0')
                .attr('x2', self.width())
                .style('stroke', self.config.axis.strokecolor);

  self.axes.hor.label = self.axes.hor.group.append('g')
                            .classed(uv.constants.classes.axeslabelgroup, true)
                            .attr('transform', 'translate(' + self.width()/2 + ',' + (1*self.config.margin.bottom/4 + 1*self.config.label.fontsize) + ')');

  self.axes.hor.label.append('text')
                .attr('display','block')
                .classed(uv.constants.classes.axeslabel, true).classed('cal', true)
                .attr('text-anchor','middle')
                .style('font-size', self.config.axis.fontsize)
                .style('font-family', self.config.axis.fontfamily)
                .text(self.config.meta.hlabel);

  self.axes.hor.label.append('text')
                .attr('display','block')
                .attr('y', 1*self.config.axis.fontsize)
                .attr(uv.constants.classes.axessublabel, true).classed('casl', true)
                .attr('text-anchor','middle')
                .style('font-size', self.config.axis.fontsize - 2)
                .style('font-family', self.config.axis.fontfamily)
                .text(self.config.meta.hsublabel);

  return this;
};

/**
* Draws the vertical axis within the frame based on the orientation and functions already created
* @return {Object} The graph object itself, to support method chaining
*/
uv.Graph.prototype.drawVerticalAxis = function () {
  var self = this;
  self.axes.ver.axis = self.axes.ver.group.append('g')
                .classed(uv.constants.classes.axes, true)
                .style('font-family', self.config.label.fontfamily)
                .style('font-size', self.config.label.fontsize)
                .style('font-weight', self.config.label.fontweight)
                .call(self.axes.ver.func);

  if (self.config.axis.showticks) {
    self.axes.ver.axis.selectAll('line').style('stroke', self.config.axis.strokecolor)
                .style('opacity', self.config.axis.opacity);
  }
  self.axes.ver.axis.selectAll('path').style('fill','none');

  self.axes.ver.line = self.panel.append('line')
                .classed(uv.constants.classes.veraxis, true)
                .attr('x1', self.config.graph.orientation === 'Horizontal'? self.axes.hor.scale(self.min()): 0)
                .attr('x2', self.config.graph.orientation === 'Horizontal'? self.axes.hor.scale(self.min()): 0)
                .attr('y1', 0)
                .attr('y2', self.height())
                .style('stroke', self.config.axis.strokecolor);

  self.axes.ver.label = self.axes.ver.group.append('g')
                .attr('transform', 'translate(' + -4*self.config.margin.left/5 + ',' + self.height()/2 + ')rotate(270)');

  self.axes.ver.label.append('text').classed(uv.constants.classes.axeslabel, true)
                .attr('text-anchor', 'middle')
                .classed('cal', true)
                .style('font-family', self.config.axis.fontfamily)
                .style('font-size', self.config.axis.fontsize)
                .text(self.config.meta.vlabel);

  self.axes.ver.label.append('text').classed(uv.constants.classes.axessublabel, true)
                .attr('text-anchor', 'middle')
                .attr('y', +self.config.axis.fontsize)
                .classed('casl', true)
                .style('font-family', self.config.axis.fontfamily)
                .style('font-size', self.config.axis.fontsize - 2)
                .text(self.config.meta.vsublabel);

  return this;
};

/**
* Sets the legend and related interactions for the graph based on the configuration
* @return {Object}  The graph object itself, to support method chaining
*/
uv.Graph.prototype.setLegend = function () {
  var self = this;

  var legendgroup = self.panel.append('g').classed(uv.constants.classes.legend, true)
            .attr('transform', function(d, i){
              if(self.config.legend.position === 'right'){
                return 'translate(' + self.width() + ', 10)';
              }else if(self.config.legend.position === 'bottom'){
                var pos =  self.height() + self.config.margin.bottom/2 + Number(self.config.axis.fontsize);
                return 'translate(0, ' + pos +  ')';
              }
            });

  self.legends = legendgroup.selectAll('g').data(
    (self.config.legend.legendtype === 'categories') ? self.categories:self.labels
  );


  self.legends.enter().append('g')
      .attr('transform', function (d, i) {
        if(self.config.legend.position === 'right'){
          return 'translate(10,' + 10* (2* i - 1) + ')';
        }else if(self.config.legend.position === 'bottom'){
          var hPos = 100*i - self.config.dimension.width*self.config.legend.legendstart;
          var vPos = 20*self.config.legend.legendstart;
          if(hPos >= self.config.dimension.width){
            self.config.legend.legendstart = self.config.legend.legendstart + 1;
            hPos = 100*i - self.config.dimension.width*self.config.legend.legendstart;
            vPos = 20*self.config.legend.legendstart;
          }
          return 'translate(' + hPos + ',' + vPos + ')';
        }
      })
      .attr('class', function (d, i) {
        var className = (self.config.legend.legendtype === 'categories') ? self.categories[i]:self.labels[i];
        return uv.util.getClassName(this, 'cl-' + className);
      })
      .attr('disabled', 'false')
      .on('mouseover', function (d, i) {
        if (self.effects[d].mouseover && typeof self.effects[d].mouseover === 'function') {
          self.effects[d].mouseover();
        }
      })
      .on('mouseout', function (d, i) {
        if (self.effects[d].mouseout && typeof self.effects[d].mouseout === 'function') {
          self.effects[d].mouseout();
        }
      })
      .on('click', function (d, i) {
        uv.effects.legend.click(i, this, self);
      });

  self.legends.append('rect').classed(uv.constants.classes.legendsign, true)
        .attr('height', self.config.legend.symbolsize)
        .attr('width', self.config.legend.symbolsize)
        .style('fill', function (d, i) { return uv.util.getColorBand(self.config, i); })
        .style('stroke', 'none');

  self.legends.append('text').classed(uv.constants.classes.legendlabel, true)
        .text(function (d, i) { return (self.config.legend.legendtype === 'categories') ? self.categories[i]:self.labels[i]; })
        .attr('dx', self.config.legend.textmargin)
        .attr('dy', '.71em')
        .attr('text-anchor', 'start')
        .style('stroke', self.config.legend.color)
        .style('fill', self.config.legend.color)
        .style('stroke-width', self.config.legend.strokewidth)
        .style('font-family', self.config.legend.fontfamily)
        .style('font-size', self.config.legend.fontsize)
        .style('font-weight', self.config.legend.fontweight);

  return this;
};

/**
* Finalizes stuff related to graph, used in conjuction with init to setup all the generic graph stuff
* @param  {Boolean} isLoggable Specifies whether the graph object should be logged or not, for debug purpose only
* @return {Object}             The graph object itself, to support method chaining
*/
uv.Graph.prototype.finalize = function (isLoggable) {
  var self = this;
  self.drawHorizontalAxis()
    .drawVerticalAxis();
  //  .setLegend();

  // Cursor for text is unset from text to normal
  self.frame.selectAll('text').style('cursor', 'default');

  //Log Graph object if flag set to truthy value
  if (isLoggable) {
    console.log(self);
  }
  return this;
};

/*
* Functions to remove individual elements of an graph
*/

/**
* Removes the entire graph object
* @return {Object} The graph object itself, to support method chaining
*/
uv.Graph.prototype.remove = function () {
  this.frame.remove();
  return this;
};

/**
* Removes the caption component of the graph
* @return {Object} The graph object itself, to support method chaining
*/
uv.Graph.prototype.removeCaption = function () {
  this.caption.remove();
  return this;
};

/**
* Removes the legend component of the graph
* @return {Object} The graph object itself, to support method chaining
*/
uv.Graph.prototype.removeLegend = function () {
  if (this.legends[0]) {
    this.legends[0].parentNode.remove();
  }

  return this;
};

uv.Graph.prototype.removePanel = function () {
  this.panel.remove();
  return this;
};

uv.Graph.prototype.removeHorAxis = function () {
  this.panel.selectAll('g.' + uv.constants.classes.horaxis + " >*").remove();
  this.panel.selectAll('line.' + uv.constants.classes.horaxis).remove();
  return this;
};

uv.Graph.prototype.removeVerAxis = function () {
  this.panel.selectAll('g.' + uv.constants.classes.veraxis + " >*").remove();
  this.panel.selectAll('line.' + uv.constants.classes.veraxis).remove();
  return this;
};

/*
* Setters and getters for various common properties of the graph
*/

uv.Graph.prototype.width = function (w) {
  if (w) {
    this.config.dimension.width = w;
    return this;
  }

  return this.config.dimension.width;
};

uv.Graph.prototype.height = function (h) {
  if (h) {
    this.config.dimension.height = h;
    return this;
  }

  return this.config.dimension.height;
};

uv.Graph.prototype.top = function (t) {
  if (t) {
    this.config.margin.top = t;
    return this;
  }

  return this.config.margin.top;
};

uv.Graph.prototype.bottom = function (b) {
  if (b) {
    this.config.margin.bottom = b;
    return this;
  }

  return this.config.margin.bottom;
};

uv.Graph.prototype.left = function (l) {
  if (l) {
    this.config.margin.left = l;
    return this;
  }

  return this.config.margin.left;
};

uv.Graph.prototype.right = function (r) {
  if (r) {
    this.config.margin.right = r;
    return this;
  }

  return this.config.margin.right;
};

uv.Graph.prototype.position = function (pos) {
  if (pos) {
    this.config.meta.position = pos;
    return this;
  }

  return this.config.meta.position;
};

uv.Graph.prototype.caption = function (caption) {
  if (caption) {
    this.config.meta.caption = caption;
    return this;
  }

  return this.config.meta.caption;
};

uv.Graph.prototype.subCaption = function (subCaption) {
  if (subCaption) {
    this.config.meta.subCaption = subCaption;
    return this;
  }

  return this.config.meta.caption;
};

uv.Graph.prototype.isDownloadable = function (isDownload) {
  if (isDownload) {
    this.config.meta.isDownload = isDownload;
    return this;
  }

  return this.config.meta.isDownload;
};

uv.Graph.prototype.max = function () {
  if (this.axes.meta.max !== null) {
    return this.axes.meta.max;
  }

  this.axes.meta.max = uv.util.getMax(this.graphdef, this.config, this.graphdef.stepup);
  return this;
}

uv.Graph.prototype.min = function () {
  if (this.axes.meta.min !== null) {
    return this.axes.meta.min;
  }

  this.axes.meta.min = uv.util.getMin(this.graphdef, this.config, this.graphdef.stepup);
  return this;
}

/* Additional Graph functions*/
uv.Graph.prototype.toggleGraphGroup = function (i) {
  var self = this, category = self.categories[i],
      state = self.frame.select('g.cge-' + uv.util.formatClassName(category)).style('display'),
      color = uv.util.getColorBand(self.config, i);

  self.frame.selectAll('g.cge-' + uv.util.formatClassName(category)).style('display', (state === 'none')? null : 'none');
  return this;
};
