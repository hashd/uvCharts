uv.StepUpBarGraph = function (graphdef, config) {
  var self = this;
  uv.Graph.call(self, graphdef, config).setDefaults().init();

  this.bargroups = {};

  var idx, length = self.categories.length,
    csum = self.labels.map(function (d) {return self.min(); }),
    tsum = self.labels.map(function (d) {return self.min(); });

  self.axes[this.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(this.labels);

  for (idx = 0; idx < length; idx = idx + 1) {
    self.bargroups[self.categories[idx]] = this.chart.append('g').classed('cg-' + uv.util.formatClassName(self.categories[idx]), true);
    self['draw' + self.config.graph.orientation + 'Bars'](idx, csum, tsum);
  }

  self.finalize();
};

uv.StepUpBarGraph.prototype = uv.util.inherits(uv.Graph);

uv.StepUpBarGraph.prototype.setDefaults = function () {
  var self = this;
  self.graphdef.stepup = 'stepup';
  return this;
};

uv.StepUpBarGraph.prototype.drawHorizontalBars = function (idx, csum, tsum) {
  var self = this, len = self.categories.length,
    color = uv.util.getColorBand(self.config, idx),
    bargroup = self.bargroups[self.categories[idx]];

  var bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);
  bars.append('rect')
    .attr('height', self.axes.ver.scale.rangeBand() / len)
    .attr('width', 0)
    .attr('transform',
      function (d) {
      return (d.value < 0) ? 'scale(-1,1)': 'scale(1,1)';
    })
    .attr('x', function (d, i) {
      if (d.resetSum === true) csum[i] = self.min();
      var value = self.axes.hor.scale(csum[i]) - self.axes.hor.scale(self.min());
      csum[i] += d.value;
      return d.value < self.min() ? -value: value;
    })
    .attr('y', function (d) {return self.axes.ver.scale(d.name); })
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('stroke', 'none')
    .style('fill', color)
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('width', function (d, i) { return Math.abs(self.axes.hor.scale(csum[i]) - self.axes.hor.scale(self.min()) - self.axes.hor.scale(csum[i] - d.value)); })
      .call(uv.util.endAll, function (d,i){
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseover', uv.effects.bar.mouseover(self, idx));
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseout', uv.effects.bar.mouseout(self, idx));
      });

  bars.append('text')
    .attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
    .attr('dx', function (d) { return (d.value < 0)? -16: 4; })
    .attr('dy', '.35em')
    .attr('text-anchor', 'start')
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('fill', self.config.label.showlabel ? uv.util.getColorBand(self.config, idx) : 'none')
    .style('opacity', 0)
    .style('font-family', self.config.bar.fontfamily)
    .style('font-size', self.config.bar.fontsize)
    .style('font-weight', self.config.bar.fontweight)
    .text(function(d) { return uv.util.getLabelValue(self, d); })
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .style('opacity', 1)
      .attr('x', function (d, i) {
        if (d.resetSum === true) tsum[i] = 0;
        tsum[i] += d.value;
        return self.axes.hor.scale(tsum[i]);
      });

  bars.append('svg:title')
    .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});

  bargroup.attr('transform', 'translate(0,' + idx * self.axes.ver.scale.rangeBand() / len + ')');
};

uv.StepUpBarGraph.prototype.drawVerticalBars = function (idx, csum, tsum) {
  var self = this, len = self.categories.length,
    color = uv.util.getColorBand(self.config, idx),
    bargroup = self.bargroups[self.categories[idx]],
    scaledSum = 0;

  var bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);

  bars.append('rect')
    .attr('height', 0)
    .attr('width', self.axes.hor.scale.rangeBand() / len)
    .attr('transform',
      function (d) {
      return (d.value < 0) ? 'scale(1,-1)': 'scale(1,1)';
    })
    .attr('x', function (d) { return self.axes.hor.scale(d.name); })
    .attr('y', function (d, i) {
      if (d.resetSum === true) csum[i] = 0;
      var value = (2*self.height() - self.axes.ver.scale(csum[i]));
      csum[i] += d.value;
      return (d.value < 0)? -value: value;
    })
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('stroke', 'none')
    .style('fill', color)
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('height', function (d, i) {
        return Math.abs(self.axes.ver.scale(-csum[i]) - self.axes.ver.scale(-csum[i]-d.value));
      })
      .call(uv.util.endAll, function (d,i){
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseover', uv.effects.bar.mouseover(self, idx));
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseout', uv.effects.bar.mouseout(self, idx));
      });

  bars.append('text').attr('transform','scale(1,-1)')
    .attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
    .attr('y', -self.height() - 10)
    .attr('dy', function (d) { return (d.value < 0)? '2.3em': '.71em'})
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
      .attr('y', function (d, i) {
        if (d.resetSum === true) tsum[i] = 0;
        tsum[i] += d.value;
        return -(2*self.height() - self.axes.ver.scale(tsum[i])) - 10;
      });

  bars.append('svg:title')
    .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});

  bargroup.attr('transform', 'translate(' + idx * self.axes.hor.scale.rangeBand() / len + ',' + 2 * self.height() + ') scale(1,-1)');
};
