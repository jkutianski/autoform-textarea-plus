# meteor-autoform-textarea-plus
Custom textarea input type with char counter & well area for AutoForm

## How to install it / Como instalarlo

`meteor add jkutianski:autoform-textarea-plus`

## How to use it / Como usarlo

Create a SimpleSchema and set `textareaPlus` as AutoForm type

```
const SchemaTextAreaField = new SimpleSchema({
  textarea: {
    type: String,
    label: 'Texto',
    optional: false,
    max: 250,
    min: 200,
    autoform: {
      type: 'textareaPlus',
      rows: 5,
      placeholder: 'Placeholder',
      afFormGroup: {
        afWell: {
          class: 'm-t-1 col-xs-12',
          content: '<div>This is a well area for {{label}}</div>'
        },
        afCounterBlock: {
          class: 'help-block text-right m-t-0',
          content: '{{countRestMax}} characters left'
        }
      }
    }
  }
});
```

afWell & afCounterBlock content can be an String or Template

```
afWell: {
  content: '<div>This is a well area for {{label}}</div>'
},
afCounterBlock: {
  content: '{{countRestMax}} characters left'
}
```

or

```
afWell: {
  content: Template && Template.textAreaWell
},
afCounterBlock: {
  content: Template && Template.textAreaCounter
}
```

## Template helpers

`afWell` content template helpers:

* `formId` the Form id.
* `label` the label defined on the schema.
* `placeholder` the placeholder defined on the schema.
* `max` the maximun characters defined on the schema.
* `min` the minimun characters defined on the schema.


`afCounterBlock` content template helpers:

* `formId` the Form id.
* `label` the label defined on the schema.
* `count` characters count on the textarea.
* `countRestMax` character left from the max.
* `countRestMin` characters left from the min.
* `max` the maximun characters defined on the schema.
* `min` the minimun characters defined on the schema.

