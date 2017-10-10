# jQuery Nice Select

A lightweight jQuery plugin that replaces native select elements with customizable dropdowns.

## Usage

Include jQuery and the plugin.

```html
<script src="path/to/jquery.js"></script> 
<script src="path/to/jquery.nice-select.js"></script>
```

Include the plugin styles, either the compiled CSS...

```html
<link rel="stylesheet" href="path/to/nice-select.css">
```

...or, ideally, import the SASS source (if you use SASS) in your main stylesheet for easier customization.

```scss
@import 'nice-select';
```

Finally, initialize the plugin.

```javascript
$(document).ready(function() {
  $('select').niceSelect();
});
```

## Usage with Vue.js

Require plugin in `bootstrap.js` or other root js script:

```js
// ... code
try {
    window.$ = window.jQuery = require('jquery');
    
    require('jquery-nice-select');
    // .. load other plugin 
    require('bootstrap-sass');
} catch (e) {}
```

Then finally in your component you must define new directive:

```vue
<template>
    <select v-nice-select>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option N</option>
    </select>
</template>

<script>
export default {
    directives: {
        niceSelect: {
            componentUpdated(el) {
                $(el).niceSelect();
            }
        }
    }
}
</script>
```

---

Full documentation and examples at [hernansartorio.com/jquery-nice-select](http://hernansartorio.com/jquery-nice-select).