Package.describe({
  name: 'jkutianski:autoform-textarea-plus',
  summary: 'Custom textarea input type with char counter & well area for AutoForm',
  documentation: './README.md',
  git: 'https://github.com/jkutianski/meteor-autoform-textarea-plus.git',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.use([
    'ecmascript@0.6.3',
    'templating@1.0.0',
    'blaze@2.0.0',
    'spacebars-compiler@1.1.3',
    'underscore@1.0.0',
    'aldeed:autoform@6.0.0',
    'aldeed:template-extension@4.1.0',
  ], 'client');

  api.addFiles([
    'autoform-textareaPlus.html',
    'autoform-textareaPlus.js'
  ], 'client');
});
