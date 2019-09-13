---
---
;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var DataProjector, Info, Menu, Observer, Palette, Projector, Storage, Subject, Toolbar, Utility, dataProjector,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Subject = require('./Subject.coffee');

Observer = require('./Observer.coffee');

Utility = require('./Utility.coffee');

Palette = require('./Palette.coffee');

Storage = require('./Storage.coffee');

Toolbar = require('./Toolbar.coffee');

Menu = require('./Menu.coffee');

Info = require('./Info.coffee');

Projector = require('./Projector.coffee');

DataProjector = (function(_super) {
  __extends(DataProjector, _super);

  DataProjector.prototype.storage = null;

  DataProjector.prototype.toolbar = null;

  DataProjector.prototype.menu = null;

  DataProjector.prototype.info = null;

  DataProjector.prototype.projector = null;

  DataProjector.prototype.palette = null;

  DataProjector.prototype.colors = null;

  function DataProjector() {
    this.storage = new Storage();
    this.storage.attach(this);
    this.storage.requestData();
    this.toolbar = new Toolbar('#toolbar');
    this.toolbar.attach(this);
    this.menu = new Menu('#menu');
    this.menu.attach(this);
    this.info = new Info('#info');
    this.info.attach(this);
    this.projector = new Projector();
    this.projector.attach(this);
  }

  DataProjector.prototype.update = function(subject, type, data) {
    if (subject instanceof Storage) {
      this.onStorageEvent(type, data);
    }
    if (subject instanceof Toolbar) {
      this.onToolbarEvent(type, data);
    }
    if (subject instanceof Menu) {
      this.onMenuEvent(type, data);
    }
    if (subject instanceof Projector) {
      return this.onProjectorEvent(type, data);
    }
  };

  DataProjector.prototype.onStorageEvent = function(type, data) {
    switch (type) {
      case Storage.EVENT_DATA_READY:
        this.info.display("Processed " + (this.storage.getPoints()) + " points.");
        this.info.display("Found " + (this.storage.getClusters()) + " clusters.");
        return this.initialize();
      case Storage.EVENT_SCREENSHOT_OK:
        return this.info.display("Screenshot " + (this.storage.getSaved()) + " saved.");
    }
  };

  DataProjector.prototype.onToolbarEvent = function(type, data) {
    var state;
    switch (type) {
      case Toolbar.EVENT_MENU:
        state = this.menu.toggle();
        return this.toolbar.setMenuButtonSelected(state);
      case Toolbar.EVENT_INFO:
        state = this.info.toggle();
        return this.toolbar.setInfoButtonSelected(state);
      case Toolbar.EVENT_PERSPECTIVE:
        this.projector.setMode(Projector.VIEW.PERSPECTIVE);
        return this.toolbar.setCameraButtonSelected(true, false, false);
      case Toolbar.EVENT_ORTHOGRAPHIC:
        this.projector.setMode(Projector.VIEW.ORTHOGRAPHIC);
        return this.toolbar.setCameraButtonSelected(false, true, false);
      case Toolbar.EVENT_DUAL:
        this.projector.setMode(Projector.VIEW.DUAL);
        return this.toolbar.setCameraButtonSelected(false, false, true);
      case Toolbar.EVENT_RESET:
        this.projector.resetCamera(true);
        return this.toolbar.blinkResetButton();
      case Toolbar.EVENT_CLEAR:
        this.info.clear();
        return this.toolbar.blinkClearButton();
      case Toolbar.EVENT_BOX:
        state = this.projector.toggleBox();
        return this.toolbar.setBoxButtonSelected(state);
      case Toolbar.EVENT_VIEWPORT:
        state = this.projector.toggleViewport();
        return this.toolbar.setViewportButtonSelected(state);
      case Toolbar.EVENT_SELECT:
        state = this.projector.toggleSelector();
        return this.toolbar.setSelectButtonSelected(state);
      case Toolbar.EVENT_VIEW_TOP:
        this.projector.changeView(Utility.DIRECTION.TOP);
        return this.toolbar.setViewButtonSelected(true, false, false);
      case Toolbar.EVENT_VIEW_FRONT:
        this.projector.changeView(Utility.DIRECTION.FRONT);
        return this.toolbar.setViewButtonSelected(false, true, false);
      case Toolbar.EVENT_VIEW_SIDE:
        this.projector.changeView(Utility.DIRECTION.SIDE);
        return this.toolbar.setViewButtonSelected(false, false, true);
      case Toolbar.EVENT_SPIN_LEFT:
        this.projector.setSpin(Projector.SPIN.LEFT);
        return this.toolbar.setSpinButtonSelected(true, false, false);
      case Toolbar.EVENT_SPIN_STOP:
        this.projector.setSpin(Projector.SPIN.NONE);
        return this.toolbar.setSpinButtonSelected(false, true, false);
      case Toolbar.EVENT_SPIN_RIGHT:
        this.projector.setSpin(Projector.SPIN.RIGHT);
        return this.toolbar.setSpinButtonSelected(false, false, true);
      case Toolbar.EVENT_ANIMATE:
        state = this.projector.toggleAnimation();
        return this.toolbar.setAnimateButtonSelected(state);
      case Toolbar.EVENT_PRINT:
        this.storage.saveImage(this.projector.getImage());
        return this.toolbar.blinkPrintButton();
    }
  };

  DataProjector.prototype.onMenuEvent = function(type, data) {
    switch (type) {
      case Menu.EVENT_TOGGLE_ALL_ON:
        return this.projector.setAllClustersVisible(true);
      case Menu.EVENT_TOGGLE_ALL_OFF:
        return this.projector.setAllClustersVisible(false);
      case Menu.EVENT_TOGGLE_ID:
        return this.projector.toggleClusterVisibility(data.id);
      case Menu.EVENT_CLUSTER_ID:
        return this.projector.toggleClusterSelection(data.id);
    }
  };

  DataProjector.prototype.onProjectorEvent = function(type, data) {
    console.log("DataProjector.onProjectorEvent " + type + " : " + data);
    switch (type) {
      case Projector.EVENT_DATA_LOADED:
        return console.log("DataProjector.onProjectorEvent " + type);
      case Projector.EVENT_POINTS_SELECTED:
        return this.info.display("Selected " + data.points + " points.");
      case Projector.EVENT_CLUSTER_SELECTED:
        if (data.id > -1) {
          return this.info.display("Cluster " + data.id + " selected");
        } else {
          return this.info.display("No cluster selected");
        }
    }
  };

  DataProjector.prototype.initialize = function() {
    this.palette = new Palette(this.storage.getClusters());
    this.colors = this.palette.getColors();
    this.menu.create(this.storage.getClusters(), this.palette.getColors());
    this.projector.setColors(this.colors);
    this.projector.load(this.storage);
    return this.onToolbarEvent(Toolbar.EVENT_SPIN_RIGHT);
  };

  return DataProjector;

})(Observer);

dataProjector = new DataProjector();


},{"./Info.coffee":2,"./Menu.coffee":3,"./Observer.coffee":4,"./Palette.coffee":5,"./Projector.coffee":7,"./Storage.coffee":9,"./Subject.coffee":10,"./Toolbar.coffee":11,"./Utility.coffee":12}],2:[function(require,module,exports){
var Info, Panel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Panel = require('./Panel.coffee');

Info = (function(_super) {
  __extends(Info, _super);

  function Info(id) {
    Info.__super__.constructor.call(this, id);
  }

  Info.prototype.display = function(message) {
    return $('#message').append(message + "<br/>");
  };

  Info.prototype.clear = function() {
    return $('#message').text("");
  };

  return Info;

})(Panel);

module.exports = Info;


},{"./Panel.coffee":6}],3:[function(require,module,exports){
var Menu, Panel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Panel = require('./Panel.coffee');

Menu = (function(_super) {
  __extends(Menu, _super);

  Menu.EVENT_TOGGLE_ALL_ON = "EVENT_TOGGLE_ALL_ON";

  Menu.EVENT_TOGGLE_ALL_OFF = "EVENT_TOGGLE_ALL_OFF";

  Menu.EVENT_TOGGLE_ID = "EVENT_TOGGLE_ID";

  Menu.EVENT_CLUSTER_ID = "EVENT_CLUSTER_ID";

  Menu.TOGGLE_ON = "[+]";

  Menu.TOGGLE_OFF = "[-]";

  Menu.TOGGLE_MIX = "[/]";

  Menu.prototype.clusters = 0;

  Menu.prototype.selected = -1;

  Menu.prototype.colors = null;

  function Menu(id) {
    this.onCluster = __bind(this.onCluster, this);
    this.onToggle = __bind(this.onToggle, this);
    this.onToggleAll = __bind(this.onToggleAll, this);
    Menu.__super__.constructor.call(this, id);
  }

  Menu.prototype.onToggleAll = function(event) {
    var i, state, _i, _j, _ref, _ref1;
    state = $("#toggleAll").text();
    switch (state) {
      case Menu.TOGGLE_OFF:
      case Menu.TOGGLE_MIX:
        $("#toggleAll").text(Menu.TOGGLE_ON);
        for (i = _i = 0, _ref = this.clusters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          $("#t" + String(i)).text(Menu.TOGGLE_ON);
        }
        return this.notify(Menu.EVENT_TOGGLE_ALL_ON);
      case Menu.TOGGLE_ON:
        $("#toggleAll").text(Menu.TOGGLE_OFF);
        for (i = _j = 0, _ref1 = this.clusters; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          $("#t" + String(i)).text(Menu.TOGGLE_OFF);
        }
        return this.notify(Menu.EVENT_TOGGLE_ALL_OFF);
    }
  };

  Menu.prototype.onToggle = function(event) {
    var id, identifier, index;
    identifier = event.target.id;
    id = identifier.replace("t", "");
    index = parseInt(id);
    this.doToggle(index);
    return this.notify(Menu.EVENT_TOGGLE_ID, {
      id: index
    });
  };

  Menu.prototype.onCluster = function(event) {
    var index;
    index = parseInt(event.target.id.replace("b", ""));
    if (this.selected === index) {
      this.selected = -1;
    } else {
      this.selected = index;
    }
    this.updateSwatches();
    this.updateButtons();
    return this.notify(Menu.EVENT_CLUSTER_ID, {
      id: index
    });
  };

  Menu.prototype.doToggle = function(index) {
    var state, tag;
    tag = "#t" + String(index);
    state = $(tag).text();
    switch (state) {
      case Menu.TOGGLE_ON:
        $(tag).text(Menu.TOGGLE_OFF);
        break;
      case Menu.TOGGLE_OFF:
        $(tag).text(Menu.TOGGLE_ON);
    }
    return this.updateMasterToggle();
  };

  Menu.prototype.create = function(clusters, colors) {
    var html, i, _i, _j, _ref, _ref1;
    this.clusters = clusters;
    this.colors = colors;
    for (i = _i = 0, _ref = this.clusters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      html = "<span class='toggle' id='t" + i + "'>[+]</span><span class='button' id='b" + i + "'> Cluster</span><span class='color' id='c" + i + "'> " + i + " </span><br/>";
      $("#menu").append(html);
    }
    $("#toggleAll").click(this.onToggleAll);
    for (i = _j = 0, _ref1 = this.clusters; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      $("#t" + String(i)).click(this.onToggle);
      $("#b" + String(i)).click(this.onCluster);
    }
    return this.updateSwatches();
  };

  Menu.prototype.togglesOn = function() {
    var i, result, state, tag, _i, _ref;
    result = 0;
    for (i = _i = 0, _ref = this.clusters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      tag = "#t" + String(i);
      state = $(tag).text();
      if (state === Menu.TOGGLE_ON) {
        result++;
      }
    }
    return result;
  };

  Menu.prototype.updateMasterToggle = function() {
    var shown;
    shown = this.togglesOn();
    switch (shown) {
      case 0:
        return $("#toggleAll").text(Menu.TOGGLE_OFF);
      case this.clusters:
        return $("#toggleAll").text(Menu.TOGGLE_ON);
      default:
        return $("#toggleAll").text(Menu.TOGGLE_MIX);
    }
  };

  Menu.prototype.updateSwatches = function() {
    var i, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = this.clusters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (i === this.selected) {
        _results.push($("#c" + String(i)).css('color', Palette.HIGHLIGHT.getStyle()));
      } else {
        _results.push($("#c" + String(i)).css('color', this.colors[i].getStyle()));
      }
    }
    return _results;
  };

  Menu.prototype.updateButtons = function() {
    var i, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = this.clusters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (i === this.selected) {
        _results.push($("#b" + String(i)).css('color', Palette.HIGHLIGHT.getStyle()));
      } else {
        _results.push($("#b" + String(i)).css('color', Palette.BUTTON.getStyle()));
      }
    }
    return _results;
  };

  return Menu;

})(Panel);

module.exports = Menu;


},{"./Panel.coffee":6}],4:[function(require,module,exports){
var Observer;

Observer = (function() {
  function Observer() {}

  Observer.prototype.update = function(subject, type, data) {};

  return Observer;

})();

module.exports = Observer;


},{}],5:[function(require,module,exports){
var Palette;

Palette = (function() {
  Palette.BACKGROUND = new THREE.Color(0x202020);

  Palette.HIGHLIGHT = new THREE.Color(0xFFFFFF);

  Palette.SELECTOR = new THREE.Color(0xCC0000);

  Palette.BUTTON = new THREE.Color(0xCCCCCC);

  Palette.BUTTON_SELECTED = new THREE.Color(0xFF9C00);

  Palette.prototype.colors = null;

  function Palette(size) {
    this.colors = new Array();
    this.generate(size);
  }

  Palette.prototype.generate = function(size) {
    var color, hue, i, lightness, saturation, step, _i, _results;
    hue = 0;
    saturation = 0.7;
    lightness = 0.45;
    step = 1 / size;
    _results = [];
    for (i = _i = 0; 0 <= size ? _i < size : _i > size; i = 0 <= size ? ++_i : --_i) {
      hue = (i + 1) * step;
      color = new THREE.Color();
      color.setHSL(hue, saturation, lightness);
      _results.push(this.colors.push(color));
    }
    return _results;
  };

  Palette.prototype.getColors = function() {
    return this.colors;
  };

  Palette.prototype.print = function() {
    var c, css, hsl, hue, i, lightness, saturation, _i, _len, _ref, _results;
    i = 0;
    _ref = this.colors;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      css = c.getStyle();
      hsl = c.getHSL();
      hue = hsl.h.toFixed(1);
      saturation = hsl.s.toFixed(1);
      lightness = hsl.l.toFixed(1);
      _results.push(console.log(i++ + " > " + hue + " : " + saturation + " : " + lightness + " | " + css));
    }
    return _results;
  };

  return Palette;

})();

module.exports = Palette;


},{}],6:[function(require,module,exports){
var Panel, Subject,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Subject = require('./Subject.coffee');

Panel = (function(_super) {
  __extends(Panel, _super);

  Panel.EVENT_PANEL_SHOWN = "EVENT_PANEL_SHOWN";

  Panel.EVENT_PANEL_HIDDEN = "EVENT_PANEL_HIDDEN";

  Panel.prototype.visible = true;

  function Panel(id) {
    this.id = id;
    Panel.__super__.constructor.call(this);
  }

  Panel.prototype.show = function() {
    $(this.id).show();
    this.visible = true;
    return this.notify(Panel.EVENT_PANEL_SHOWN);
  };

  Panel.prototype.hide = function() {
    $(this.id).hide();
    this.visible = false;
    return this.notify(Panel.EVENT_PANEL_HIDDEN);
  };

  Panel.prototype.toggle = function() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
    return this.visible;
  };

  return Panel;

})(Subject);

module.exports = Panel;


},{"./Subject.coffee":10}],7:[function(require,module,exports){
var Palette, Projector, Selector, Subject, Utility,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Subject = require('./Subject.coffee');

Utility = require('./Utility.coffee');

Palette = require('./Palette.coffee');

Selector = require('./Selector.coffee');

Projector = (function(_super) {
  __extends(Projector, _super);

  Projector.EVENT_DATA_LOADED = "EVENT_DATA_LOADED";

  Projector.EVENT_POINTS_SELECTED = "EVENT_POINTS_SELECTED";

  Projector.EVENT_CLUSTER_SELECTED = "EVENT_CLUSTER_SELECTED";

  Projector.VIEW = {
    NONE: -1,
    PERSPECTIVE: 0,
    ORTHOGRAPHIC: 1,
    DUAL: 2
  };

  Projector.SPIN = {
    LEFT: -1,
    NONE: 0,
    RIGHT: +1
  };

  Projector.SPIN_STEP = Utility.DEGREE / 10;

  Projector.prototype.SCREEN_WIDTH = window.innerWidth;

  Projector.prototype.SCREEN_HEIGHT = window.innerHeight;

  Projector.prototype.mode = Projector.VIEW.PERSPECTIVE;

  Projector.prototype.storage = null;

  Projector.prototype.colors = null;

  Projector.prototype.scene = null;

  Projector.prototype.cameraPerspective = null;

  Projector.prototype.cameraOrthographic = null;

  Projector.prototype.renderer = null;

  Projector.prototype.mouse = new THREE.Vector3();

  Projector.prototype.mouseStart = new THREE.Vector3();

  Projector.prototype.mouseEnd = new THREE.Vector3();

  Projector.prototype.dragging = false;

  Projector.prototype.selector = null;

  Projector.prototype.box = null;

  Projector.prototype.viewport = null;

  Projector.prototype.direction = Utility.DIRECTION.ALL;

  Projector.prototype.view1 = null;

  Projector.prototype.view2 = null;

  Projector.prototype.view3 = null;

  Projector.prototype.points = null;

  Projector.prototype.particles = null;

  Projector.prototype.clusters = null;

  Projector.prototype.selected = -1;

  Projector.prototype.controls = null;

  Projector.prototype.timeStamp = 0;

  function Projector() {
    this.clustersVisible = __bind(this.clustersVisible, this);
    this.startTimer = __bind(this.startTimer, this);
    this.updatePoints = __bind(this.updatePoints, this);
    this.toggleClusterSelection = __bind(this.toggleClusterSelection, this);
    this.setAllClustersVisible = __bind(this.setAllClustersVisible, this);
    this.toggleClusterVisibility = __bind(this.toggleClusterVisibility, this);
    this.getSpinStep = __bind(this.getSpinStep, this);
    this.spinCamera = __bind(this.spinCamera, this);
    this.setSpin = __bind(this.setSpin, this);
    this.toggleAnimation = __bind(this.toggleAnimation, this);
    this.changeView = __bind(this.changeView, this);
    this.setViewsVisible = __bind(this.setViewsVisible, this);
    this.updateView = __bind(this.updateView, this);
    this.resetCamera = __bind(this.resetCamera, this);
    this.updateMouse3D = __bind(this.updateMouse3D, this);
    this.updateSelection = __bind(this.updateSelection, this);
    this.render = __bind(this.render, this);
    this.animate = __bind(this.animate, this);
    this.processPoint = __bind(this.processPoint, this);
    this.load = __bind(this.load, this);
    this.createRenderingEngine = __bind(this.createRenderingEngine, this);
    this.createViews = __bind(this.createViews, this);
    this.createBox = __bind(this.createBox, this);
    this.createControls = __bind(this.createControls, this);
    this.createOrthographicCamera = __bind(this.createOrthographicCamera, this);
    this.createPerspectiveCamera = __bind(this.createPerspectiveCamera, this);
    this.addUIListeners = __bind(this.addUIListeners, this);
    this.getImage = __bind(this.getImage, this);
    this.toggleSelector = __bind(this.toggleSelector, this);
    this.toggleViewport = __bind(this.toggleViewport, this);
    this.toggleBox = __bind(this.toggleBox, this);
    this.setColors = __bind(this.setColors, this);
    this.setMode = __bind(this.setMode, this);
    this.onTimer = __bind(this.onTimer, this);
    this.onMouseUp = __bind(this.onMouseUp, this);
    this.onMouseMove = __bind(this.onMouseMove, this);
    this.onMouseDown = __bind(this.onMouseDown, this);
    this.onWindowResize = __bind(this.onWindowResize, this);
    Projector.__super__.constructor.call(this);
    this.addUIListeners();
    this.scene = new THREE.Scene();
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.createControls();
    this.createBox();
    this.cameraPerspective.lookAt(this.box.position);
    this.cameraOrthographic.lookAt(this.box.position);
    this.createViews();
    this.updateView(true);
    this.selector = new Selector(this.box);
    this.createRenderingEngine();
    this.onWindowResize(null);
    this.animate();
  }

  Projector.prototype.onWindowResize = function(event) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    console.log("Screen " + this.SCREEN_WIDTH + " x " + this.SCREEN_HEIGHT);
    if (this.renderer != null) {
      this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      switch (this.mode) {
        case Projector.VIEW.PERSPECTIVE:
          this.cameraPerspective.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
          this.cameraPerspective.updateProjectionMatrix();
          break;
        case Projector.VIEW.ORTHOGRAPHIC:
          this.cameraOrthographic.left = -(this.SCREEN_WIDTH / 8);
          this.cameraOrthographic.right = +(this.SCREEN_WIDTH / 8);
          this.cameraOrthographic.top = +(this.SCREEN_HEIGHT / 8);
          this.cameraOrthographic.bottom = -(this.SCREEN_HEIGHT / 8);
          this.cameraOrthographic.updateProjectionMatrix();
          break;
        case Projector.VIEW.DUAL:
          this.cameraPerspective.aspect = 0.5 * this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
          this.cameraPerspective.updateProjectionMatrix();
          this.cameraOrthographic.left = -(this.SCREEN_WIDTH / 10);
          this.cameraOrthographic.right = +(this.SCREEN_WIDTH / 10);
          this.cameraOrthographic.top = +(this.SCREEN_HEIGHT / 5);
          this.cameraOrthographic.bottom = -(this.SCREEN_HEIGHT / 5);
          this.cameraOrthographic.updateProjectionMatrix();
      }
    }
    return this.controls.handleResize();
  };

  Projector.prototype.onMouseDown = function(event) {
    if (this.mode === Projector.VIEW.DUAL) {
      event.preventDefault();
      if (event.shiftKey) {
        this.dragging = true;
        this.updateMouse3D();
        this.mouseStart.copy(this.mouse);
        this.selector.start(this.mouseStart.clone());
        return event.stopPropagation();
      }
    }
  };

  Projector.prototype.onMouseMove = function(event) {
    if (this.mode === Projector.VIEW.DUAL) {
      event.preventDefault();
      if (this.dragging) {
        this.updateMouse3D();
        this.selector.update(this.mouse);
        return event.stopPropagation();
      }
    }
  };

  Projector.prototype.onMouseUp = function(event) {
    if (this.mode === Projector.VIEW.DUAL) {
      event.preventDefault();
      if (this.dragging) {
        this.dragging = false;
        this.updateMouse3D();
        this.mouseEnd.copy(this.mouse);
        this.selector.end(this.mouseEnd.clone());
        this.updateSelection();
        return event.stopPropagation();
      }
    }
  };

  Projector.prototype.onTimer = function(index) {
    this.toggleClusterVisibility(index);
    if (++index === this.storage.getClusters()) {
      index = 0;
    }
    if (this.animateOn) {
      return this.startTimer(index);
    }
  };

  Projector.prototype.setMode = function(mode) {
    this.mode = mode;
    return this.onWindowResize(null);
  };

  Projector.prototype.setColors = function(colors) {
    this.colors = colors;
  };

  Projector.prototype.toggleBox = function() {
    return (this.box.visible = !this.box.visible);
  };

  Projector.prototype.toggleViewport = function() {
    return this.updateView(!this.viewport.visible);
  };

  Projector.prototype.toggleSelector = function() {
    var state;
    state = this.selector.toggle();
    this.updateSelection();
    return state;
  };

  Projector.prototype.getImage = function() {
    return document.getElementById("renderer").toDataURL("image/png");
  };

  Projector.prototype.addUIListeners = function() {
    window.addEventListener('resize', this.onWindowResize, false);
    $('#container').mousedown(this.onMouseDown);
    $('#container').mousemove(this.onMouseMove);
    return $('#container').mouseup(this.onMouseUp);
  };

  Projector.prototype.createPerspectiveCamera = function() {
    this.cameraPerspective = new THREE.PerspectiveCamera(50, 0.5 * this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 150, 1000);
    this.cameraPerspective.position.set(0, 0, 550);
    return this.scene.add(this.cameraPerspective);
  };

  Projector.prototype.createOrthographicCamera = function() {
    this.cameraOrthographic = new THREE.OrthographicCamera(-(this.SCREEN_WIDTH / 8), +(this.SCREEN_WIDTH / 8), +(this.SCREEN_HEIGHT / 4), -(this.SCREEN_HEIGHT / 4), 250, 750);
    this.cameraOrthographic.position.set(0, 500, 0);
    return this.scene.add(this.cameraOrthographic);
  };

  Projector.prototype.createControls = function() {
    this.controls = new THREE.TrackballControls(this.cameraPerspective);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    return this.controls.addEventListener('change', this.render);
  };

  Projector.prototype.createBox = function() {
    this.box = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshBasicMaterial({
      color: 0x404040,
      wireframe: true
    }));
    return this.scene.add(this.box);
  };

  Projector.prototype.createViews = function() {
    var geometry1, geometry2, geometry3;
    this.viewport = new THREE.Object3D();
    geometry1 = new THREE.Geometry();
    geometry1.vertices.push(new THREE.Vector3(+100, +101, +100));
    geometry1.vertices.push(new THREE.Vector3(-100, +101, +100));
    geometry1.vertices.push(new THREE.Vector3(-100, +101, -100));
    geometry1.vertices.push(new THREE.Vector3(+100, +101, -100));
    geometry1.vertices.push(new THREE.Vector3(+100, +101, +100));
    this.view1 = new THREE.Line(geometry1, new THREE.LineBasicMaterial(), THREE.LineStrip);
    geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3(+100, +100, +101));
    geometry2.vertices.push(new THREE.Vector3(-100, +100, +101));
    geometry2.vertices.push(new THREE.Vector3(-100, -100, +101));
    geometry2.vertices.push(new THREE.Vector3(+100, -100, +101));
    geometry2.vertices.push(new THREE.Vector3(+100, +100, +101));
    this.view2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial(), THREE.LineStrip);
    geometry3 = new THREE.Geometry();
    geometry3.vertices.push(new THREE.Vector3(+101, +100, +100));
    geometry3.vertices.push(new THREE.Vector3(+101, -100, +100));
    geometry3.vertices.push(new THREE.Vector3(+101, -100, -100));
    geometry3.vertices.push(new THREE.Vector3(+101, +100, -100));
    geometry3.vertices.push(new THREE.Vector3(+101, +100, +100));
    this.view3 = new THREE.Line(geometry3, new THREE.LineBasicMaterial(), THREE.LineStrip);
    this.viewport.add(this.view1);
    this.viewport.add(this.view2);
    this.viewport.add(this.view3);
    return this.box.add(this.viewport);
  };

  Projector.prototype.createRenderingEngine = function() {
    var container;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    this.renderer.setClearColor(Palette.BACKGROUND.getHex(), 1);
    this.renderer.domElement.style.position = "relative";
    this.renderer.domElement.id = "renderer";
    this.renderer.autoClear = false;
    container = $('#container').get(0);
    return container.appendChild(this.renderer.domElement);
  };

  Projector.prototype.load = function(storage) {
    var c, clusters, data, material, p, _i, _j;
    this.storage = storage;
    data = this.storage.getData();
    clusters = this.storage.getClusters();
    this.points = new Array();
    for (c = _i = 0; 0 <= clusters ? _i < clusters : _i > clusters; c = 0 <= clusters ? ++_i : --_i) {
      this.points[c] = new THREE.Geometry();
      this.points[c].colorsNeedUpdate = true;
    }
    $.each(data.points, this.processPoint);
    this.particles = new Array();
    for (p = _j = 0; 0 <= clusters ? _j < clusters : _j > clusters; p = 0 <= clusters ? ++_j : --_j) {
      material = new THREE.ParticleBasicMaterial({
        size: 1.0,
        sizeAttenuation: false,
        vertexColors: true
      });
      this.particles[p] = new THREE.ParticleSystem(this.points[p], material);
      this.box.add(this.particles[p]);
    }
    return this.notify(Projector.EVENT_DATA_LOADED);
  };

  Projector.prototype.processPoint = function(nodeName, nodeData) {
    var color, index, vertex;
    index = parseInt(nodeData.cid);
    vertex = new THREE.Vector3();
    vertex.x = parseFloat(nodeData.x);
    vertex.y = parseFloat(nodeData.y);
    vertex.z = parseFloat(nodeData.z);
    this.points[index].vertices.push(vertex);
    color = this.colors[index].clone();
    return this.points[index].colors.push(color);
  };

  Projector.prototype.animate = function() {
    requestAnimationFrame(this.animate);
    this.controls.update();
    return this.render();
  };

  Projector.prototype.render = function() {
    this.renderer.clear();
    switch (this.mode) {
      case Projector.VIEW.PERSPECTIVE:
        if (this.spin !== Projector.SPIN.NONE) {
          this.spinCamera();
        }
        this.cameraPerspective.lookAt(this.box.position);
        this.renderer.setViewport(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        return this.renderer.render(this.scene, this.cameraPerspective);
      case Projector.VIEW.ORTHOGRAPHIC:
        this.cameraOrthographic.rotation.z = 0;
        this.renderer.setViewport(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        return this.renderer.render(this.scene, this.cameraOrthographic);
      case Projector.VIEW.DUAL:
        if (this.spin !== Projector.SPIN.NONE) {
          this.spinCamera();
        }
        this.cameraPerspective.lookAt(this.box.position);
        this.renderer.setViewport(0, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT);
        this.renderer.render(this.scene, this.cameraPerspective);
        this.cameraOrthographic.rotation.z = 0;
        this.renderer.setViewport(this.SCREEN_WIDTH / 2, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT);
        return this.renderer.render(this.scene, this.cameraOrthographic);
    }
  };

  Projector.prototype.updateSelection = function() {
    var all, cloud, color, counter, i, j, vertex, _i, _j, _ref;
    counter = 0;
    for (i = _i = 0, _ref = this.storage.getClusters(); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (this.particles[i].visible) {
        cloud = this.points[i];
        all = cloud.vertices.length;
        for (j = _j = 0; 0 <= all ? _j < all : _j > all; j = 0 <= all ? ++_j : --_j) {
          vertex = cloud.vertices[j];
          color = cloud.colors[j];
          if (this.selector.isActive() && this.selector.contains(vertex, Utility.DIRECTION.ALL)) {
            color.setHex(Palette.HIGHLIGHT.getHex());
            counter++;
          } else {
            color.setHex(this.colors[i].getHex());
          }
        }
        cloud.colorsNeedUpdate = true;
      }
    }
    return this.notify(Projector.EVENT_POINTS_SELECTED, {
      points: counter
    });
  };

  Projector.prototype.updateMouse3D = function() {
    var ratio;
    ratio = 100 / 250;
    switch (this.direction) {
      case Utility.DIRECTION.TOP:
        this.mouse.x = (event.pageX - (3 * this.SCREEN_WIDTH / 4)) * ratio;
        this.mouse.y = 100;
        return this.mouse.z = (event.pageY - (this.SCREEN_HEIGHT / 2)) * ratio;
      case Utility.DIRECTION.FRONT:
        this.mouse.x = (event.pageX - (3 * this.SCREEN_WIDTH / 4)) * ratio;
        this.mouse.y = -(event.pageY - (this.SCREEN_HEIGHT / 2)) * ratio;
        return this.mouse.z = 100;
      case Utility.DIRECTION.SIDE:
        this.mouse.x = 100;
        this.mouse.y = -(event.pageY - (this.SCREEN_HEIGHT / 2)) * ratio;
        return this.mouse.z = -(event.pageX - (3 * this.SCREEN_WIDTH / 4)) * ratio;
    }
  };

  Projector.prototype.resetCamera = function(location) {
    if (location) {
      TweenLite.to(this.cameraPerspective.position, 1, {
        x: 0,
        y: 0,
        z: 550
      });
    }
    TweenLite.to(this.cameraPerspective.rotation, 1, {
      x: 0,
      y: 0,
      z: 0
    });
    return TweenLite.to(this.cameraPerspective.up, 1, {
      x: 0,
      y: 1,
      z: 0
    });
  };

  Projector.prototype.updateView = function(visible) {
    this.viewport.visible = visible;
    if (this.viewport.visible) {
      switch (this.direction) {
        case Utility.DIRECTION.TOP:
          this.setViewsVisible(true, false, false);
          this.cameraOrthographic.position.set(0, 500, 0);
          break;
        case Utility.DIRECTION.FRONT:
          this.setViewsVisible(false, true, false);
          this.cameraOrthographic.position.set(0, 0, 500);
          break;
        case Utility.DIRECTION.SIDE:
          this.setViewsVisible(false, false, true);
          this.cameraOrthographic.position.set(500, 0, 0);
      }
      this.cameraOrthographic.lookAt(this.box.position);
    } else {
      this.setViewsVisible(false, false, false);
    }
    return this.viewport.visible;
  };

  Projector.prototype.setViewsVisible = function(top, front, side) {
    this.view1.visible = top;
    this.view2.visible = front;
    return this.view3.visible = side;
  };

  Projector.prototype.changeView = function(direction) {
    this.direction = direction;
    this.updateView(this.viewport.visible);
    return this.selector.setDirection(this.direction);
  };

  Projector.prototype.toggleAnimation = function() {
    this.animateOn = !this.animateOn;
    if (this.animateOn) {
      this.setAllClustersVisible(false);
      this.startTimer(0);
    } else {
      this.setAllClustersVisible(true);
    }
    return this.animateOn;
  };

  Projector.prototype.setSpin = function(spin) {
    this.spin = spin;
    switch (this.spin) {
      case Projector.SPIN.LEFT:
        return this.resetCamera(false);
      case Projector.SPIN.NONE:
        return this.timeStamp = 0;
      case Projector.SPIN.RIGHT:
        return this.resetCamera(false);
    }
  };

  Projector.prototype.spinCamera = function() {
    var STEP, cx, cy, radians, radius, x, y;
    STEP = this.getSpinStep();
    cx = this.cameraPerspective.position.x;
    cy = -1 * this.cameraPerspective.position.z;
    radians = Math.atan2(cy, cx);
    radius = Math.sqrt(cx * cx + cy * cy);
    switch (this.spin) {
      case Projector.SPIN.LEFT:
        radians += STEP;
        if (radians > Math.PI) {
          radians = radians - (2 * Math.PI);
        }
        break;
      case Projector.SPIN.RIGHT:
        radians -= STEP;
        if (radians < -Math.PI) {
          radians = (2 * Math.PI) + radians;
        }
    }
    x = radius * Math.cos(radians);
    y = radius * Math.sin(radians);
    this.cameraPerspective.position.x = x;
    return this.cameraPerspective.position.z = -1 * y;
  };

  Projector.prototype.getSpinStep = function() {
    var date, delta, step, timeNow;
    step = Projector.SPIN_STEP;
    if (this.timeStamp !== 0) {
      date = new Date();
      timeNow = date.getTime();
      delta = timeNow - this.timeStamp;
      this.timeStamp = timeNow;
      step = delta * step / 10;
    }
    return step;
  };

  Projector.prototype.toggleClusterVisibility = function(index) {
    return this.particles[index].visible = !this.particles[index].visible;
  };

  Projector.prototype.setAllClustersVisible = function(visible) {
    var p, _i, _len, _ref, _results;
    _ref = this.particles;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      _results.push(p.visible = visible);
    }
    return _results;
  };

  Projector.prototype.toggleClusterSelection = function(index) {
    var hexColor;
    if (this.selected > -1) {
      hexColor = this.colors[this.selected].getHex();
      this.updatePoints(this.selected, hexColor);
    }
    if (this.selected === index) {
      this.selected = -1;
    } else {
      this.selected = index;
      this.updatePoints(this.selected, Palette.HIGHLIGHT.getHex());
    }
    if (this.selected > -1) {
      return this.notify(Projector.EVENT_CLUSTER_SELECTED, {
        id: index
      });
    } else {
      return this.notify(Projector.EVENT_CLUSTER_SELECTED, {
        id: -1
      });
    }
  };

  Projector.prototype.updatePoints = function(index, color) {
    var all, cloud, i, _i;
    cloud = this.points[index];
    all = cloud.vertices.length;
    for (i = _i = 0; 0 <= all ? _i < all : _i > all; i = 0 <= all ? ++_i : --_i) {
      cloud.colors[i].setHex(color);
    }
    return this.points[index].colorsNeedUpdate = true;
  };

  Projector.prototype.startTimer = function(index) {
    this.toggleClusterVisibility(index);
    return window.setTimeout(this.onTimer, 2 * Utility.SECOND, index);
  };

  Projector.prototype.clustersVisible = function() {
    var cloud, result, _i, _len, _ref;
    result = 0;
    _ref = this.particles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cloud = _ref[_i];
      if (cloud.visible) {
        result++;
      }
    }
    return result;
  };

  return Projector;

})(Subject);

module.exports = Projector;


},{"./Palette.coffee":5,"./Selector.coffee":8,"./Subject.coffee":10,"./Utility.coffee":12}],8:[function(require,module,exports){
var Palette, Selector, Utility,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Utility = require('./Utility.coffee');

Palette = require('./Palette.coffee');

Selector = (function() {
  Selector.prototype.active = false;

  Selector.prototype.direction = Utility.DIRECTION.TOP;

  Selector.prototype.selectorTop = null;

  Selector.prototype.selectorFront = null;

  Selector.prototype.selectorSide = null;

  Selector.prototype.mouseStart = null;

  Selector.prototype.mouse = null;

  Selector.prototype.mouseEnd = null;

  Selector.prototype.min = null;

  Selector.prototype.max = null;

  function Selector(parent) {
    this.toggle = __bind(this.toggle, this);
    this.isActive = __bind(this.isActive, this);
    this.mouseStart = new THREE.Vector3();
    this.mouse = new THREE.Vector3();
    this.mouseEnd = new THREE.Vector3();
    this.min = new THREE.Vector3();
    this.max = new THREE.Vector3();
    this.selectorTop = this.createSelector(Utility.DIRECTION.TOP);
    parent.add(this.selectorTop);
    this.selectorFront = this.createSelector(Utility.DIRECTION.FRONT);
    parent.add(this.selectorFront);
    this.selectorSide = this.createSelector(Utility.DIRECTION.SIDE);
    parent.add(this.selectorSide);
    this.setActive(false);
  }

  Selector.prototype.setActive = function(active) {
    this.active = active;
    this.selectorTop.visible = this.active;
    this.selectorFront.visible = this.active;
    this.selectorSide.visible = this.active;
    return this.active;
  };

  Selector.prototype.setDirection = function(direction) {
    this.direction = direction;
    return console.log("Selector.setDirection " + this.direction);
  };

  Selector.prototype.isActive = function() {
    return this.active;
  };

  Selector.prototype.toggle = function() {
    return this.setActive(!this.active);
  };

  Selector.prototype.start = function(mouse) {
    this.mouse = mouse;
    this.setActive(true);
    if (!this.contains(mouse, this.direction)) {
      return this.mouseStart = mouse;
    } else {
      switch (this.direction) {
        case Utility.DIRECTION.TOP:
          return this.mouseStart = this.getStart(mouse, this.selectorTop);
        case Utility.DIRECTION.FRONT:
          return this.mouseStart = this.getStart(mouse, this.selectorFront);
        case Utility.DIRECTION.SIDE:
          return this.mouseStart = this.getStart(mouse, this.selectorSide);
      }
    }
  };

  Selector.prototype.getStart = function(mouse, selector) {
    var distanceTo0, distanceTo1, distanceTo2, distanceTo3, shortest, start;
    distanceTo0 = mouse.distanceTo(selector.geometry.vertices[0]);
    distanceTo1 = mouse.distanceTo(selector.geometry.vertices[1]);
    distanceTo2 = mouse.distanceTo(selector.geometry.vertices[2]);
    distanceTo3 = mouse.distanceTo(selector.geometry.vertices[3]);
    shortest = Math.min(distanceTo0, distanceTo1, distanceTo2, distanceTo3);
    if (shortest === distanceTo0) {
      start = selector.geometry.vertices[2].clone();
    }
    if (shortest === distanceTo1) {
      start = selector.geometry.vertices[3].clone();
    }
    if (shortest === distanceTo2) {
      start = selector.geometry.vertices[0].clone();
    }
    if (shortest === distanceTo3) {
      start = selector.geometry.vertices[1].clone();
    }
    return start;
  };

  Selector.prototype.update = function(mouse) {
    this.mouse = mouse;
    switch (this.direction) {
      case Utility.DIRECTION.TOP:
        this.selectorTop.geometry.vertices[0].x = this.mouseStart.x;
        this.selectorTop.geometry.vertices[0].y = 100;
        this.selectorTop.geometry.vertices[0].z = this.mouseStart.z;
        this.selectorTop.geometry.vertices[1].x = this.mouse.x;
        this.selectorTop.geometry.vertices[1].y = 100;
        this.selectorTop.geometry.vertices[1].z = this.mouseStart.z;
        this.selectorTop.geometry.vertices[2].x = this.mouse.x;
        this.selectorTop.geometry.vertices[2].y = 100;
        this.selectorTop.geometry.vertices[2].z = this.mouse.z;
        this.selectorTop.geometry.vertices[3].x = this.mouseStart.x;
        this.selectorTop.geometry.vertices[3].y = 100;
        this.selectorTop.geometry.vertices[3].z = this.mouse.z;
        this.selectorTop.geometry.vertices[4].x = this.mouseStart.x;
        this.selectorTop.geometry.vertices[4].y = 100;
        this.selectorTop.geometry.vertices[4].z = this.mouseStart.z;
        this.selectorFront.geometry.vertices[0].x = this.mouseStart.x;
        this.selectorFront.geometry.vertices[0].z = 100;
        this.selectorFront.geometry.vertices[1].x = this.mouse.x;
        this.selectorFront.geometry.vertices[1].z = 100;
        this.selectorFront.geometry.vertices[2].x = this.mouse.x;
        this.selectorFront.geometry.vertices[2].z = 100;
        this.selectorFront.geometry.vertices[3].x = this.mouseStart.x;
        this.selectorFront.geometry.vertices[3].z = 100;
        this.selectorFront.geometry.vertices[4].x = this.mouseStart.x;
        this.selectorFront.geometry.vertices[4].z = 100;
        this.selectorSide.geometry.vertices[0].x = 100;
        this.selectorSide.geometry.vertices[0].z = this.mouseStart.z;
        this.selectorSide.geometry.vertices[1].x = 100;
        this.selectorSide.geometry.vertices[1].z = this.mouseStart.z;
        this.selectorSide.geometry.vertices[2].x = 100;
        this.selectorSide.geometry.vertices[2].z = this.mouse.z;
        this.selectorSide.geometry.vertices[3].x = 100;
        this.selectorSide.geometry.vertices[3].z = this.mouse.z;
        this.selectorSide.geometry.vertices[4].x = 100;
        this.selectorSide.geometry.vertices[4].z = this.mouseStart.z;
        break;
      case Utility.DIRECTION.FRONT:
        this.selectorFront.geometry.vertices[0].x = this.mouseStart.x;
        this.selectorFront.geometry.vertices[0].y = this.mouseStart.y;
        this.selectorFront.geometry.vertices[0].z = 100;
        this.selectorFront.geometry.vertices[1].x = this.mouse.x;
        this.selectorFront.geometry.vertices[1].y = this.mouseStart.y;
        this.selectorFront.geometry.vertices[1].z = 100;
        this.selectorFront.geometry.vertices[2].x = this.mouse.x;
        this.selectorFront.geometry.vertices[2].y = this.mouse.y;
        this.selectorFront.geometry.vertices[2].z = 100;
        this.selectorFront.geometry.vertices[3].x = this.mouseStart.x;
        this.selectorFront.geometry.vertices[3].y = this.mouse.y;
        this.selectorFront.geometry.vertices[3].z = 100;
        this.selectorFront.geometry.vertices[4].x = this.mouseStart.x;
        this.selectorFront.geometry.vertices[4].y = this.mouseStart.y;
        this.selectorFront.geometry.vertices[4].z = 100;
        this.selectorTop.geometry.vertices[0].x = this.mouseStart.x;
        this.selectorTop.geometry.vertices[0].y = 100;
        this.selectorTop.geometry.vertices[1].x = this.mouse.x;
        this.selectorTop.geometry.vertices[1].y = 100;
        this.selectorTop.geometry.vertices[2].x = this.mouse.x;
        this.selectorTop.geometry.vertices[2].y = 100;
        this.selectorTop.geometry.vertices[3].x = this.mouseStart.x;
        this.selectorTop.geometry.vertices[3].y = 100;
        this.selectorTop.geometry.vertices[4].x = this.mouseStart.x;
        this.selectorTop.geometry.vertices[4].y = 100;
        this.selectorSide.geometry.vertices[0].x = 100;
        this.selectorSide.geometry.vertices[0].y = this.mouseStart.y;
        this.selectorSide.geometry.vertices[1].x = 100;
        this.selectorSide.geometry.vertices[1].y = this.mouse.y;
        this.selectorSide.geometry.vertices[2].x = 100;
        this.selectorSide.geometry.vertices[2].y = this.mouse.y;
        this.selectorSide.geometry.vertices[3].x = 100;
        this.selectorSide.geometry.vertices[3].y = this.mouseStart.y;
        this.selectorSide.geometry.vertices[4].x = 100;
        this.selectorSide.geometry.vertices[4].y = this.mouseStart.y;
        break;
      case Utility.DIRECTION.SIDE:
        this.selectorSide.geometry.vertices[0].x = 100;
        this.selectorSide.geometry.vertices[0].y = this.mouseStart.y;
        this.selectorSide.geometry.vertices[0].z = this.mouseStart.z;
        this.selectorSide.geometry.vertices[1].x = 100;
        this.selectorSide.geometry.vertices[1].y = this.mouse.y;
        this.selectorSide.geometry.vertices[1].z = this.mouseStart.z;
        this.selectorSide.geometry.vertices[2].x = 100;
        this.selectorSide.geometry.vertices[2].y = this.mouse.y;
        this.selectorSide.geometry.vertices[2].z = this.mouse.z;
        this.selectorSide.geometry.vertices[3].x = 100;
        this.selectorSide.geometry.vertices[3].y = this.mouseStart.y;
        this.selectorSide.geometry.vertices[3].z = this.mouse.z;
        this.selectorSide.geometry.vertices[4].x = 100;
        this.selectorSide.geometry.vertices[4].y = this.mouseStart.y;
        this.selectorSide.geometry.vertices[4].z = this.mouseStart.z;
        this.selectorTop.geometry.vertices[0].y = 100;
        this.selectorTop.geometry.vertices[0].z = this.mouseStart.z;
        this.selectorTop.geometry.vertices[1].y = 100;
        this.selectorTop.geometry.vertices[1].z = this.mouseStart.z;
        this.selectorTop.geometry.vertices[2].y = 100;
        this.selectorTop.geometry.vertices[2].z = this.mouse.z;
        this.selectorTop.geometry.vertices[3].y = 100;
        this.selectorTop.geometry.vertices[3].z = this.mouse.z;
        this.selectorTop.geometry.vertices[4].y = 100;
        this.selectorTop.geometry.vertices[4].z = this.mouseStart.z;
        this.selectorFront.geometry.vertices[0].y = this.mouseStart.y;
        this.selectorFront.geometry.vertices[0].z = 100;
        this.selectorFront.geometry.vertices[1].y = this.mouseStart.y;
        this.selectorFront.geometry.vertices[1].z = 100;
        this.selectorFront.geometry.vertices[2].y = this.mouse.y;
        this.selectorFront.geometry.vertices[2].z = 100;
        this.selectorFront.geometry.vertices[3].y = this.mouse.y;
        this.selectorFront.geometry.vertices[3].z = 100;
        this.selectorFront.geometry.vertices[4].y = this.mouseStart.y;
        this.selectorFront.geometry.vertices[4].z = 100;
    }
    this.selectorTop.geometry.verticesNeedUpdate = true;
    this.selectorFront.geometry.verticesNeedUpdate = true;
    return this.selectorSide.geometry.verticesNeedUpdate = true;
  };

  Selector.prototype.end = function(mouseEnd) {
    this.mouseEnd = mouseEnd;
    return this.updateBounds();
  };

  Selector.prototype.updateBounds = function() {
    this.min.x = Math.min(this.getMinX(this.selectorTop), this.getMinX(this.selectorFront));
    this.max.x = Math.max(this.getMaxX(this.selectorTop), this.getMaxX(this.selectorFront));
    this.min.y = Math.min(this.getMinY(this.selectorFront), this.getMinY(this.selectorSide));
    this.max.y = Math.max(this.getMaxY(this.selectorFront), this.getMaxY(this.selectorSide));
    this.min.z = Math.min(this.getMinZ(this.selectorTop), this.getMinZ(this.selectorSide));
    return this.max.z = Math.max(this.getMaxZ(this.selectorTop), this.getMaxZ(this.selectorSide));
  };

  Selector.prototype.contains = function(point, direction) {
    var inside;
    inside = true;
    switch (direction) {
      case Utility.DIRECTION.ALL:
        if (point.x < this.min.x || point.x > this.max.x) {
          inside = false;
        }
        if (point.y < this.min.y || point.y > this.max.y) {
          inside = false;
        }
        if (point.z < this.min.z || point.z > this.max.z) {
          inside = false;
        }
        break;
      case Utility.DIRECTION.TOP:
        if (point.x < this.min.x || point.x > this.max.x) {
          inside = false;
        }
        if (point.z < this.min.z || point.z > this.max.z) {
          inside = false;
        }
        break;
      case Utility.DIRECTION.FRONT:
        if (point.x < this.min.x || point.x > this.max.x) {
          inside = false;
        }
        if (point.y < this.min.y || point.y > this.max.y) {
          inside = false;
        }
        break;
      case Utility.DIRECTION.SIDE:
        if (point.z < this.min.z || point.z > this.max.z) {
          inside = false;
        }
        if (point.y < this.min.y || point.y > this.max.y) {
          inside = false;
        }
    }
    return inside;
  };

  Selector.prototype.getMinX = function(selector) {
    var i, minX, vertices, _i;
    vertices = selector.geometry.vertices;
    minX = vertices[0].x;
    for (i = _i = 1; _i <= 4; i = ++_i) {
      if (vertices[i].x < minX) {
        minX = vertices[i].x;
      }
    }
    return minX;
  };

  Selector.prototype.getMaxX = function(selector) {
    var i, maxX, vertices, _i;
    vertices = selector.geometry.vertices;
    maxX = vertices[0].x;
    for (i = _i = 1; _i <= 4; i = ++_i) {
      if (vertices[i].x > maxX) {
        maxX = vertices[i].x;
      }
    }
    return maxX;
  };

  Selector.prototype.getMinY = function(selector) {
    var i, minY, vertices, _i;
    vertices = selector.geometry.vertices;
    minY = vertices[0].y;
    for (i = _i = 1; _i <= 4; i = ++_i) {
      if (vertices[i].y < minY) {
        minY = vertices[i].y;
      }
    }
    return minY;
  };

  Selector.prototype.getMaxY = function(selector) {
    var i, maxY, vertices, _i;
    vertices = selector.geometry.vertices;
    maxY = vertices[0].y;
    for (i = _i = 1; _i <= 4; i = ++_i) {
      if (vertices[i].y > maxY) {
        maxY = vertices[i].y;
      }
    }
    return maxY;
  };

  Selector.prototype.getMinZ = function(selector) {
    var i, minZ, vertices, _i;
    vertices = selector.geometry.vertices;
    minZ = vertices[0].z;
    for (i = _i = 1; _i <= 4; i = ++_i) {
      if (vertices[i].z < minZ) {
        minZ = vertices[i].z;
      }
    }
    return minZ;
  };

  Selector.prototype.getMaxZ = function(selector) {
    var i, maxZ, vertices, _i;
    vertices = selector.geometry.vertices;
    maxZ = vertices[0].z;
    for (i = _i = 1; _i <= 4; i = ++_i) {
      if (vertices[i].z > maxZ) {
        maxZ = vertices[i].z;
      }
    }
    return maxZ;
  };

  Selector.prototype.createSelector = function(direction) {
    var SIZE, geometry, selector;
    SIZE = 100;
    geometry = new THREE.Geometry();
    switch (direction) {
      case Utility.DIRECTION.TOP:
        geometry.vertices.push(new THREE.Vector3(+SIZE, +SIZE, +SIZE));
        geometry.vertices.push(new THREE.Vector3(-SIZE, +SIZE, +SIZE));
        geometry.vertices.push(new THREE.Vector3(-SIZE, +SIZE, -SIZE));
        geometry.vertices.push(new THREE.Vector3(+SIZE, +SIZE, -SIZE));
        geometry.vertices.push(new THREE.Vector3(+SIZE, +SIZE, +SIZE));
        break;
      case Utility.DIRECTION.FRONT:
        geometry.vertices.push(new THREE.Vector3(+SIZE, +SIZE, +SIZE));
        geometry.vertices.push(new THREE.Vector3(-SIZE, +SIZE, +SIZE));
        geometry.vertices.push(new THREE.Vector3(-SIZE, -SIZE, +SIZE));
        geometry.vertices.push(new THREE.Vector3(+SIZE, -SIZE, +SIZE));
        geometry.vertices.push(new THREE.Vector3(+SIZE, +SIZE, +SIZE));
        break;
      case Utility.DIRECTION.SIDE:
        geometry.vertices.push(new THREE.Vector3(+SIZE, +SIZE, +SIZE));
        geometry.vertices.push(new THREE.Vector3(+SIZE, -SIZE, +SIZE));
        geometry.vertices.push(new THREE.Vector3(+SIZE, -SIZE, -SIZE));
        geometry.vertices.push(new THREE.Vector3(+SIZE, +SIZE, -SIZE));
        geometry.vertices.push(new THREE.Vector3(+SIZE, +SIZE, +SIZE));
    }
    return selector = new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: Palette.SELECTOR.getHex()
    }), THREE.LineStrip);
  };

  return Selector;

})();

module.exports = Selector;


},{"./Palette.coffee":5,"./Utility.coffee":12}],9:[function(require,module,exports){
var Storage, Subject,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Subject = require('./Subject.coffee');

Storage = (function(_super) {
  __extends(Storage, _super);

  Storage.EVENT_DATAFILE_READY = "EVENT_DATAFILE_READY";

  Storage.EVENT_JSON_READY = "EVENT_JSON_READY";

  Storage.EVENT_DATA_READY = "EVENT_DATA_READY";

  Storage.EVENT_SCREENSHOT_OK = "EVENT_SCREENSHOT_OK";

  Storage.prototype.datafile = null;

  Storage.prototype.data = null;

  Storage.prototype.points = 0;

  Storage.prototype.clusterIDs = null;

  Storage.prototype.clusters = 0;

  Storage.prototype.saved = 0;

  function Storage() {
    this.processPoint = __bind(this.processPoint, this);
    this.onSaveResponse = __bind(this.onSaveResponse, this);
    this.onJSON = __bind(this.onJSON, this);
    this.onDatafile = __bind(this.onDatafile, this);
    Storage.__super__.constructor.call(this);
    this.clusterIDs = new Array();
  }

  Storage.prototype.onDatafile = function(datafile) {
    this.datafile = datafile;
    this.notify(Storage.EVENT_DATAFILE_READY);
    return this.requestJSON(this.datafile);
  };

  Storage.prototype.onJSON = function(data) {
    this.data = data;
    this.notify(Storage.EVENT_JSON_READY);
    $.each(this.data.points, this.processPoint);
    return this.notify(Storage.EVENT_DATA_READY);
  };

  Storage.prototype.onSaveResponse = function(message) {
    console.log("DataProjector.onSaveResponse " + message);
    return this.notify(Storage.EVENT_SCREENSHOT_OK);
  };

  Storage.prototype.requestData = function() {
    return this.requestDatafile();
  };

  Storage.prototype.requestDatafile = function() {
    return this.onDatafile("http://ahmetcecen.github.io/data-projector/data.json");
  };

  Storage.prototype.requestJSON = function(datafile) {
    var file;
    this.datafile = datafile;
    file = this.datafile + "?" + String(Math.round(Math.random() * 99999));
    return $.getJSON(file, this.onJSON);
  };

  Storage.prototype.saveImage = function(base64Image) {
    return $.post('/upload', {
      id: ++this.saved,
      image: base64Image
    }, this.onSaveResponse);
  };

  Storage.prototype.processPoint = function(nodeName, nodeData) {
    var _ref;
    if (_ref = nodeData.cid, __indexOf.call(this.clusterIDs, _ref) < 0) {
      this.clusterIDs.push(nodeData.cid);
      this.clusters = this.clusterIDs.length;
    }
    return this.points++;
  };

  Storage.prototype.getDatafile = function() {
    return this.datafile;
  };

  Storage.prototype.getData = function() {
    return this.data;
  };

  Storage.prototype.getClusters = function() {
    return this.clusters;
  };

  Storage.prototype.getPoints = function() {
    return this.points;
  };

  Storage.prototype.getSaved = function() {
    return this.saved;
  };

  return Storage;

})(Subject);

module.exports = Storage;


},{"./Subject.coffee":10}],10:[function(require,module,exports){
var Subject;

Subject = (function() {
  Subject.prototype.observers = null;

  function Subject() {
    this.observers = new Array();
  }

  Subject.prototype.attach = function(o) {
    return this.observers.push(o);
  };

  Subject.prototype.detach = function(o) {
    var index;
    index = this.observers.indexOf(o);
    if (index >= 0) {
      return this.observers.splice(index, 1);
    }
  };

  Subject.prototype.notify = function(type, data) {
    var o, _i, _len, _ref, _results;
    if (data == null) {
      data = null;
    }
    _ref = this.observers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      o = _ref[_i];
      _results.push(o.update(this, type, data));
    }
    return _results;
  };

  return Subject;

})();

module.exports = Subject;


},{}],11:[function(require,module,exports){
var Palette, Panel, Toolbar, Utility,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Utility = require('./Utility.coffee');

Panel = require('./Panel.coffee');

Palette = require('./Palette.coffee');

Toolbar = (function(_super) {
  __extends(Toolbar, _super);

  Toolbar.EVENT_MENU = "EVENT_MENU";

  Toolbar.EVENT_INFO = "EVENT_INFO";

  Toolbar.EVENT_PERSPECTIVE = "EVENT_PERSPECTIVE";

  Toolbar.EVENT_ORTHOGRAPHIC = "EVENT_ORTHOGRAPHIC";

  Toolbar.EVENT_DUAL = "EVENT_DUAL";

  Toolbar.EVENT_RESET = "EVENT_RESET";

  Toolbar.EVENT_CLEAR = "EVENT_CLEAR";

  Toolbar.EVENT_BOX = "EVENT_BOX";

  Toolbar.EVENT_VIEWPORT = "EVENT_VIEWPORT";

  Toolbar.EVENT_SELECT = "EVENT_SELECT";

  Toolbar.EVENT_VIEW_TOP = "EVENT_VIEW_TOP";

  Toolbar.EVENT_VIEW_FRONT = "EVENT_VIEW_FRONT";

  Toolbar.EVENT_VIEW_SIDE = "EVENT_VIEW_SIDE";

  Toolbar.EVENT_SPIN_LEFT = "EVENT_SPIN_LEFT";

  Toolbar.EVENT_SPIN_STOP = "EVENT_SPIN_STOP";

  Toolbar.EVENT_SPIN_RIGHT = "EVENT_SPIN_RIGHT";

  Toolbar.EVENT_ANIMATE = "EVENT_ANIMATE";

  Toolbar.prototype.dispatcher = null;

  function Toolbar(id) {
    this.setAnimateButtonSelected = __bind(this.setAnimateButtonSelected, this);
    this.setSpinButtonSelected = __bind(this.setSpinButtonSelected, this);
    this.setViewButtonSelected = __bind(this.setViewButtonSelected, this);
    this.setSelectButtonSelected = __bind(this.setSelectButtonSelected, this);
    this.setViewportButtonSelected = __bind(this.setViewportButtonSelected, this);
    this.setBoxButtonSelected = __bind(this.setBoxButtonSelected, this);
    this.blinkClearButton = __bind(this.blinkClearButton, this);
    this.blinkResetButton = __bind(this.blinkResetButton, this);
    this.setCameraButtonSelected = __bind(this.setCameraButtonSelected, this);
    this.setInfoButtonSelected = __bind(this.setInfoButtonSelected, this);
    this.setMenuButtonSelected = __bind(this.setMenuButtonSelected, this);
    this.unblinkButton = __bind(this.unblinkButton, this);
    this.blinkButton = __bind(this.blinkButton, this);
    this.setButtonSelected = __bind(this.setButtonSelected, this);
    this.initialize = __bind(this.initialize, this);
    this.createDispatcher = __bind(this.createDispatcher, this);
    this.onClick = __bind(this.onClick, this);
    this.onKeyDown = __bind(this.onKeyDown, this);
    var item, _i, _len, _ref;
    Toolbar.__super__.constructor.call(this, id);
    this.createDispatcher();
    _ref = this.dispatcher;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      $(item.id).click({
        type: item.type
      }, this.onClick);
    }
    document.addEventListener('keydown', this.onKeyDown, false);
    this.initialize();
  }

  Toolbar.prototype.onKeyDown = function(event) {
    var item, modifier, _i, _len, _ref, _results;
    modifier = Utility.NO_KEY;
    if (event.shiftKey) {
      modifier = Utility.SHIFT_KEY;
    }
    _ref = this.dispatcher;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if ((item.key === event.keyCode) && (item.modifier === modifier)) {
        _results.push(this.notify(item.type));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Toolbar.prototype.onClick = function(event) {
    return this.notify(event.data.type);
  };

  Toolbar.prototype.createDispatcher = function() {
    return this.dispatcher = [
      {
        id: "#menuButton",
        key: 77,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_MENU
      }, {
        id: "#infoButton",
        key: 73,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_INFO
      }, {
        id: "#perspectiveButton",
        key: 80,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_PERSPECTIVE
      }, {
        id: "#orthographicButton",
        key: 79,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_ORTHOGRAPHIC
      }, {
        id: "#dualButton",
        key: 68,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_DUAL
      }, {
        id: "#resetButton",
        key: 82,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_RESET
      }, {
        id: "#clearButton",
        key: 67,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_CLEAR
      }, {
        id: "#boxButton",
        key: 66,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_BOX
      }, {
        id: "#viewportButton",
        key: 86,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_VIEWPORT
      }, {
        id: "#selectButton",
        key: 83,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_SELECT
      }, {
        id: "#viewTopButton",
        key: 49,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_VIEW_TOP
      }, {
        id: "#viewFrontButton",
        key: 50,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_VIEW_FRONT
      }, {
        id: "#viewSideButton",
        key: 51,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_VIEW_SIDE
      }, {
        id: "#spinLeftButton",
        key: 37,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_SPIN_LEFT
      }, {
        id: "#spinStopButton",
        key: 32,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_SPIN_STOP
      }, {
        id: "#spinRightButton",
        key: 39,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_SPIN_RIGHT
      }, {
        id: "#animateButton",
        key: 65,
        modifier: Utility.NO_KEY,
        type: Toolbar.EVENT_ANIMATE
      }
    ];
  };

  Toolbar.prototype.initialize = function() {
    this.setButtonSelected("#menuButton", true);
    this.setButtonSelected("#infoButton", false);
    this.setButtonSelected("#perspectiveButton", true);
    this.setButtonSelected("#orthographicButton", false);
    this.setButtonSelected("#dualButton", false);
    this.setButtonSelected("#boxButton", true);
    this.setButtonSelected("#viewportButton", false);
    this.setButtonSelected("#selectButton", false);
    this.setButtonSelected("#viewTopButton", true);
    this.setButtonSelected("#viewFrontButton", false);
    this.setButtonSelected("#viewSideButton", false);
    this.setButtonSelected("#spinLeftButton", false);
    this.setButtonSelected("#spinStopButton", true);
    this.setButtonSelected("#spinRightButton", false);
    return this.setButtonSelected("#animateButton", false);
  };

  Toolbar.prototype.setButtonSelected = function(id, selected) {
    var color;
    color = Palette.BUTTON.getStyle();
    if (selected) {
      color = Palette.BUTTON_SELECTED.getStyle();
    }
    return $(id).css('color', color);
  };

  Toolbar.prototype.blinkButton = function(id) {
    this.setButtonSelected(id, true);
    return window.setTimeout(this.unblinkButton, 200, id);
  };

  Toolbar.prototype.unblinkButton = function(id) {
    console.log("Toolbar.unblinkButton " + id);
    return this.setButtonSelected(id, false);
  };

  Toolbar.prototype.setMenuButtonSelected = function(selected) {
    return this.setButtonSelected("#menuButton", selected);
  };

  Toolbar.prototype.setInfoButtonSelected = function(selected) {
    return this.setButtonSelected("#infoButton", selected);
  };

  Toolbar.prototype.setCameraButtonSelected = function(selected1, selected2, selected3) {
    this.setButtonSelected("#perspectiveButton", selected1);
    this.setButtonSelected("#orthographicButton", selected2);
    return this.setButtonSelected("#dualButton", selected3);
  };

  Toolbar.prototype.blinkResetButton = function() {
    return this.blinkButton("#resetButton");
  };

  Toolbar.prototype.blinkClearButton = function() {
    return this.blinkButton("#clearButton");
  };

  Toolbar.prototype.setBoxButtonSelected = function(selected) {
    return this.setButtonSelected("#boxButton", selected);
  };

  Toolbar.prototype.setViewportButtonSelected = function(selected) {
    return this.setButtonSelected("#viewportButton", selected);
  };

  Toolbar.prototype.setSelectButtonSelected = function(selected) {
    return this.setButtonSelected("#selectButton", selected);
  };

  Toolbar.prototype.setViewButtonSelected = function(selected1, selected2, selected3) {
    this.setButtonSelected("#viewTopButton", selected1);
    this.setButtonSelected("#viewFrontButton", selected2);
    return this.setButtonSelected("#viewSideButton", selected3);
  };

  Toolbar.prototype.setSpinButtonSelected = function(selected1, selected2, selected3) {
    this.setButtonSelected("#spinLeftButton", selected1);
    this.setButtonSelected("#spinStopButton", selected2);
    return this.setButtonSelected("#spinRightButton", selected3);
  };

  Toolbar.prototype.setAnimateButtonSelected = function(selected) {
    return this.setButtonSelected("#animateButton", selected);
  };

  return Toolbar;

})(Panel);

module.exports = Toolbar;


},{"./Palette.coffee":5,"./Panel.coffee":6,"./Utility.coffee":12}],12:[function(require,module,exports){
var Utility;

Utility = (function() {
  function Utility() {}

  Utility.DIRECTION = {
    ALL: 0,
    TOP: 1,
    FRONT: 2,
    SIDE: 3
  };

  Utility.DEGREE = Math.PI / 180;

  Utility.SECOND = 1000;

  Utility.NO_KEY = "NO_KEY";

  Utility.SHIFT_KEY = "SHIFT_KEY";

  Utility.CTRL_KEY = "CTRL_KEY";

  Utility.ALT_KEY = "ALT_KEY";

  Utility.printVector3 = function(vector) {
    return console.log(vector.x.toFixed(1) + " : " + vector.y.toFixed(1) + " : " + vector.z.toFixed(1));
  };

  return Utility;

})();

module.exports = Utility;


},{}]},{},[1])
;