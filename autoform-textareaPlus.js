/* jshint evil: true */

import { ReactiveVar } from 'meteor/reactive-var';

AutoForm.addInputType('textareaPlus', {
  template: 'afTextAreaPlus',
  valueConverters: {
    stringArray(val) {
      if (typeof val === 'string' && val.length > 0) {
        return linesToArray(val);
      }
      return val;
    },
    number: AutoForm.valueConverters.stringToNumber,
    numberArray: AutoForm.valueConverters.stringToNumberArray,
    boolean: AutoForm.valueConverters.stringToBoolean,
    booleanArray(val) {
      if (typeof val === 'string' && val.length > 0) {
        var arr = linesToArray(val);
        return _.map(arr, function(item) {
          return AutoForm.valueConverters.stringToBoolean(item);
        });
      }
      return val;
    },
    date: AutoForm.valueConverters.stringToDate,
    dateArray(val) {
      if (typeof val === 'string' && val.length > 0) {
        var arr = linesToArray(val);
        return _.map(arr, function(item) {
          return AutoForm.valueConverters.stringToDate(item);
        });
      }
      return val;
    }
  },
  contextAdjust(ctx) {
    if (
      typeof ctx.atts.maxlength === 'undefined' &&
      typeof ctx.max === 'number'
    ) {
      ctx.atts.maxlength = ctx.max;
    }

    if (
      typeof ctx.atts.minlength === 'undefined' &&
      typeof ctx.min === 'number'
    ) {
      ctx.atts.minlength = ctx.min;
    }

    return ctx;
  }
});

Template.afTextAreaPlus.helpers({
  atts() {
    let atts = _.clone(this.atts);

    AutoForm.Utility.addClass(atts, 'form-control');

    return _.omit(atts,
      'well',
      'afWell',
      'afCounterBlock'
    );
  },
  afWell() {
    let atts = _.omit(this.atts,
      'well',
      'afWell',
      'afCounterBlock',
      'class'
    );

    atts.class = 'well';
    AutoForm.Utility.addClass(atts,
      this.atts.afWell && this.atts.afWell.class || ''
    );

    let well = this.atts.afWell && this.atts.afWell.content;

    let template = 'afWellTemplate_' + this.atts.id;

    if (typeof well === 'string') {
      well = compileTemplate(template, well);
    }

    if (well instanceof Template) {
      setTemplate(template, well, _.pick(this, 'formId', 'name'), {
        formId() {
          return this.formId;
        },
        label() {
          return AutoForm.getLabelForField(this.name);
        },
        placeholder() {
          return atts.placeholder;
        },
        max() {
          return atts.maxlength;
        },
        min() {
          return atts.minlength;
        }
      });

      return { template: template, atts: atts };
    }

    return;
  },
  afCounterBlock() {
    let atts = _.omit(this.atts,
      'well',
      'afWell',
      'afCounterBlock',
      'class'
    );

    atts.class = 'counter-block';
    AutoForm.Utility.addClass(atts,
      this.atts.afCounterBlock && this.atts.afCounterBlock.class || ''
    );

    let counter = this.atts.afCounterBlock && this.atts.afCounterBlock.content;

    let template = 'afCounterBlockTemplate_' + this.atts.id;

    if (typeof counter === 'string') {
      counter = compileTemplate(template, counter);
    }

    if (counter instanceof Template) {
      setTemplate(template, counter, _.pick(this, 'formId', 'name', 'count'), {
        formId() {
          return this.formId;
        },
        label() {
          return AutoForm.getLabelForField(this.name);
        },
        count() {
          return this.count.get();
        },
        countRestMax() {
          let maxlength = this.atts.maxlength || 0;
          return maxlength - this.count.get();
        },
        countRestMin() {
          let minlength = this.atts.minlength || 0;
          return minlength - this.count.get();
        },
        max() {
          return this.atts.maxlength;
        },
        min() {
          return this.atts.minlength;
        }
      });

      return { template: template, atts: atts };
    }

    return;
  }
});

Template.afTextAreaPlus.events({
  'keyup :input'(e) {
    let value = e.currentTarget.value;
    this.count.set(value ? value.length : 0);
  }
});

Template.afTextAreaPlus.onCreated(function() {
  this.data.formId = AutoForm.getFormId();
  this.data.count = new ReactiveVar(this.data.value.length);
});

const compileTemplate = function compileTemplate(name, html) {
  let compiled = SpacebarsCompiler.compile(html, { isTemplate: true });
  return new Template(name, eval(compiled));
};

const setTemplate = function setTemplate(name, tmpl, data, helpers) {
  Template[name] = tmpl;
  Template[name].onCreated(function() {
    _.extend(this.data, data);
  });
  Template[name].helpers(helpers);
};

const linesToArray = function linesToArray(text) {
  text = text.split('\n');
  var lines = [];
  _.each(text, function(line) {
    line = $.trim(line);
    if (line.length) {
      lines.push(line);
    }
  });
  return lines;
};
