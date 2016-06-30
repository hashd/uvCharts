/**
* A normal 2d bar chart capable of being rendered in horizontal and vertical manner
* @param {Object} graphdef Definition of the graph being rendered
* @param {Object} config   Configuration of the graph being rendered
*/
uv.BarGraph = function (graphdef, config) {
  var self = this;
  uv.Graph.call(self, graphdef, config).setDefaults().init();

  self.bargroups = {};

  self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(self.labels);

  var idx, length = self.categories.length, category;
  for (idx = 0; idx < length; idx = idx + 1) {
    category = self.categories[idx];
    self.bargroups[category] = self.chart.append('g').classed('cg-' + uv.util.formatClassName(category), true);
    self['draw' + self.config.graph.orientation + 'Bars'](idx);
  }

  self.finalize();
};

uv.BarGraph.prototype = uv.util.inherits(uv.Graph);

uv.BarGraph.prototype.setDefaults = function () {
  var self = this;
  self.graphdef.stepup = 'normal';
  return this;
};

uv.BarGraph.prototype.drawHorizontalBars = function (idx) {
  var self = this,
    color = uv.util.getColorBand(this.config, idx),
    len = self.categories.length;

  var bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
        .append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true)
        .attr('transform', function (d) { if (d.value < 0) return 'scale(-1,1)'; });

  bars.append('rect')
    .classed(uv.util.formatClassName(self.categories[idx]), true)
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .attr('height', self.axes.ver.scale.rangeBand() / len)
    .attr('x', function (d) {
      return (d.value < 0) ? (-self.axes.hor.scale(self.min())) : self.axes.hor.scale(self.min());
    })
    .attr('y', function (d) {return self.axes.ver.scale(d.name); })
    .attr('width', 0)
    .style('stroke', self.config.bar.strokecolor)
    .style('fill', color)
    .transition()
      .duration(self.config.effects.duration)
      .delay(function (d, i) { return i * self.config.effects.duration; })
      .attr('width', function (d) { return self.axes.hor.scale(Math.abs(d.value)) - self.axes.hor.scale(self.min()); })
      .call(uv.util.endAll, function (d,i){
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseover', uv.effects.bar.mouseover(self, idx));
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseout', uv.effects.bar.mouseout(self, idx));
        if (typeof self.config.graph.clickCallback === "function") {
          d3.select(this.parentNode.parentNode).selectAll('rect').on('click', function(_d){
              self.config.graph.clickCallback.apply(null, [_d]);
          });
        }
      });

  bars.append('text')
    .attr('x', function(d) { return self.axes.hor.scale(0); })
    .attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
    .attr('dx', function (d) { return (d.value < 0)? '-20px': '4px' })
    .attr('dy', '.35em')
    .attr('text-anchor', 'start')
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('fill', self.config.label.showlabel ? uv.util.getColorBand(self.config, idx) : 'none')
    .style('font-family', self.config.bar.fontfamily)
    .style('font-size', self.config.bar.fontsize)
    .style('font-weight', self.config.bar.fontweight)
    .style('transform', function (d) { return d.value < 0? 'scale(-1,1)': 'scale(1,1)'; })
    .style('opacity', 0)
    .text(function(d) { return uv.util.getLabelValue(self, d); })
    .transition()
      .duration(self.config.effects.duration)
      .delay(function (d, i) { return i * self.config.effects.duration; })
      .style('opacity', 1)
      .attr('x', function (d) { return self.axes.hor.scale(d.value); });



  bars.append('svg:title')
    .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});

  self.bargroups[self.categories[idx]].attr('transform', 'translate(0,' + idx * self.axes.ver.scale.rangeBand() / len + ')');
};

uv.BarGraph.prototype.drawVerticalBars = function (idx) {
  var self = this,
    color = uv.util.getColorBand(this.config, idx),
    len = self.categories.length;

  var bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
      .append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true)
      .attr('transform', function (d) { if (d.value < 0) return 'scale(1, -1)'; });

  bars.append('rect')
      .classed(uv.util.formatClassName(self.categories[idx]), true)
      .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
      .attr('height', 0)
      .attr('width', self.axes.hor.scale.rangeBand() / len)
      .attr('x', function (d) { return self.axes.hor.scale(d.name); })
      .attr('y', function (d) { return (d.value < 0? -1: 1) * (self.height() - self.axes.ver.scale(self.min())); })
      .style('stroke', self.config.bar.strokecolor).style('fill', color)
      .transition()
        .duration(self.config.effects.duration)
        .delay(idx * self.config.effects.duration)
        .attr('height', function (d) { return Math.abs(self.axes.ver.scale(self.min()) - self.axes.ver.scale(d.value)); })
        .call(uv.util.endAll, function (d,i){
          d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseover', uv.effects.bar.mouseover(self, idx));
          d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseout', uv.effects.bar.mouseout(self, idx));
          if(typeof self.config.graph.clickCallback === "function") {
            d3.select(this.parentNode.parentNode).selectAll('rect').on('click', function(_d){
              self.config.graph.clickCallback.apply(null, [_d]);
          });
        }
        });


  bars.append('text').attr('transform', function (d) { return (d.value < 0) ? 'scale(1,1)': 'scale(1,-1)'; })
      .attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
      .attr('y', function(d) { return self.height() - self.axes.ver.scale(0) })
      .attr('dx', 0)
      .attr('dy', function (d) { return d.value < 0 ? '2em' : '.35em' })
      .attr('text-anchor', 'middle')
      .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
      .style('fill', self.config.label.showlabel ? uv.util.getColorBand(self.config, idx) : 'none')
      .style('font-family', self.config.bar.fontfamily)
      .style('font-size', self.config.bar.fontsize)
      .style('font-weight', self.config.bar.fontweight)
      .style('opacity', 0)
      .text(function(d) { return uv.util.getLabelValue(self, d); })
      .transition()
        .duration(self.config.effects.duration)
        .delay(idx * self.config.effects.duration)
        .style('opacity', 1)
        .attr('y', function (d) { return -(self.height() - self.axes.ver.scale(d.value)) - 10; });

  bars.append('svg:title')
    .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});


  self.bargroups[self.categories[idx]].attr('transform', 'translate(' + idx * self.axes.hor.scale.rangeBand() / len + ',' + self.height() + ') scale(1,-1)');
};
