var uv = uv || {};

uv.Test = function () {
  var self = this;

  self.categories = ['fruits', 'browsers', 'distros', 'countries'];
  self.categoryData = {
    'fruits' : ['oranges', 'apples', 'mangoes', 'pears', 'berries', 'guava', 'pineapples', 'watermelons'],
    'browsers' : ['firefox', 'safari', 'ie', 'chrome', 'opera', 'maxthon', 'midori', 'epiphany'],
    'distros': ['Linux Mint', 'Ubuntu', 'PCLinuxOS', 'Fedora', 'Rosa', 'OpenSUSE', 'Sabayon Linux'],
    'countries' : ['U.S.A', 'U.K', 'India', 'China', 'Canada', 'Brazil', 'Pakistan', 'France', 'Spain', 'Australia']
  };

  self.labels = ['years', 'users', 'mood'];
  self.labelData = {
    'years' : ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
    'users' : ['infants', 'kids', 'teens', 'middleage', 'oldage'],
    'mood' : ['happy', 'sad', 'excited', 'surprised', 'none', 'angry']
  };

  self.init();
};


uv.Test.prototype.init = function () {
  var self = this;
  var labelNumber = uv.Test.getRandomInteger(0, self.labels.length), categoryNumber = uv.Test.getRandomInteger(0, self.categories.length),
    label = self.labels[labelNumber], category = self.categories[categoryNumber];

  var nLabels = uv.Test.getRandomInteger(1, self.labelData[label].length + 1),
      nCategories = uv.Test.getRandomInteger(1, self.categoryData[category].length + 1);

  self.categorySet = uv.Test.getRandomSet(self.categoryData[category], nCategories);
  self.labelSet = uv.Test.getRandomSet(self.labelData[label], nLabels);
};

uv.Test.getRandomSet = function (array, num) {
  var self = this;
  var numbers = [], set = [], selected = 0;
  while (selected !== num) {
    var number = uv.Test.getRandomInteger(0, array.length);
    if (numbers.indexOf(number) === -1) {
      set.push(array[number]);
      numbers.push(number);
      selected += 1;
    }
  }

  return set;
};

uv.Test.prototype.getGraphDef = function () {
  var self = this;
  var graphdef = {};
  graphdef.categories = self.categorySet;
  graphdef.dataset = self.getDataset();

  console.log(graphdef);
  return graphdef;
};

uv.Test.prototype.getDataset = function () {
  var self = this;
  var dataset = {};
  for (var i=0, cLength = self.categorySet.length; i<cLength; i++) {
    var data = [], category = self.categorySet[i];
    for (var j=0, lLength = self.labelSet.length; j<lLength; j++) {
      data.push(uv.Test.getDataElement(self.labelSet[j]));
    }
    dataset[category] = data;
  }

  return dataset;
};

uv.Test.getDataElement = function (label) {
  var self = this, dataElement = {};
  dataElement.name = label;
  dataElement.value = uv.Test.getRandomInteger(1, 1000);
  return dataElement;
};

uv.Test.getRandomValue = function (min, max) {
  return (Math.random() * (max - min + 1)) + min;
};

uv.Test.getRandomDataset = function (num, min, max) {
  var self = this, data = [];
  for (var i = 0; i < num; i++) {
    data.push(uv.Test.getRandomValue(min, max));
  }
};

uv.Test.getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

uv.Test.getRandomIntegers = function (num, min, max) {
  var self = this, data = [];
  for (var i = 0; i < num; i++) {
    data.push(uv.Test.getRandomInteger(min, max));
  }
  return data;
};
