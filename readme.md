# Tiny Flex Frameset | Version 0.1.0 Beta

A CSS Flexbox Grid Frameset with focus on simple to use flexbox parameters and a mobile first, percentage based responsive frameset. The precompiled version uses 5% steps but can be altered for personal use inside `grid.scss`. The system also has some special versions for `1/3rd (33.3334%)`, `1/6th (16.6667%)`, `1/8th (12.5%)` and some other funky stuff.

## Installation

For modifications you need to compile the .sass files to css with [Gulp.js](http://www.gulpjs.com) for example. If you just want to use the precompiled version, there is a rr-flex.css and a rr-flex.min.css version in the `/dist` folder. 

## How does it work?

In your html code, you simply pick a container and assign the class `flex` to it and modify other attributes, based on the breakpoint version it should be working in. So for example you want the flex-direction to be column in mobile but row in desktop, you use:

```html
<section class="flex mobile-flexcolumn desktop-flexrowreverse">
   ... </section>
``` 

Here some examples for the `mobile` breakpoint. Same stuff is usable with `tablet` and `desktop` prefix.

```css
.mobile-flexrow {
  flex-direction: row; }
.mobile-flexcolumn {
  flex-direction: column; }
.mobile-flexrowreverse {
  flex-direction: row-reverse; }
.mobile-flexcolumnreverse {
  flex-direction: column-reverse; }

.mobile-jc-flexstart {
  justify-content: flex-start; }
.mobile-jc-flexend {
  justify-content: flex-end; }
.mobile-jc-center {
  justify-content: center; }
.mobile-jc-spacebetween {
  justify-content: space-between; }
.mobile-jc-spacearound {
  justify-content: space-around; }

.mobile-flexwrap {
  flex-wrap: wrap; }
.mobile-flexnowrap {
  flex-wrap: nowrap; }

.mobile-alignitems-center {
  align-items: center; }
.mobile-alignitems-start {
  align-items: flex-start; }
.mobile-alignitems-end {
  align-items: flex-end; }
.mobile-alignitems-baseline {

  align-items: baseline; }
.mobile-alignself-auto {
  align-self: center; }
.mobile-alignself-baseline {
  align-self: baseline; }
.mobile-alignself-start {
  align-self: flex-start; }
.mobile-alignself-end {
  align-self: flex-end; }
.mobile-alignself-center {
  align-self: center; }
```

Some nice little helpers

```scss
/* Order from minus 10 to plus 10. */ 
.mobile-order-minus-10 {
  order: -10; }
/* Viewscreen Hight (vh) from 10 to 100 for all 3 breakpoints */ 
.mobile-height-100vh {
  min-height: 100vh; }
/* Margins top and bottom in 8 pixel steps for all 3 breakpoints, 0 to 80 */
.mobile-margin-top-80 {
  margin-top: 80px; }
.mobile-margin-bottom-0 {
  margin-bottom: 0px; }  

/* Padding is missing right now */  
```

```scss
/* Flex basis 0 and auto */ 
.desktop-flex-basis-auto {
    flex-basis: auto; }
  .desktop-flex-basis-0 {
    flex-basis: 0; }

/* Flex grow 0 to 5 */ 
  .desktop-flex-grow-0 {
    flex-grow: 0; }
/* Flex shrink 0 to 5 */ 
  .desktop-flex-shrink-0 {
    flex-shrink: 0; }
```
Last but not least, the option to remove a container (display; none) by breakpoint. 
```scss
@media (max-width: 600px) {
  .mobile-hidden {
    display: none !important; } }
@media (min-width: 600px) and (max-width: 768px) {
  .tablet-hidden {
    display: none !important; } }
@media (min-width: 768px) {
  .desktop-hidden {
    display: none !important; } }
```

## The Grid

The core of the system with 3 breakpoints, mobile first, table and desktop. Size: ~13kb minified.

```scss
/* Breakpoints with identifier, startsize and endsize */
$breakpoints: ("mobile" , 0 , 600) , ("tablet" , 600 , 768) , ("desktop" , 768 , 0);

/* Flex Grid in 5% steps */
@each $name , $start , $end in $breakpoints {

  @if ($start == 0) {

    @for $i from 1 through 20 {
    
      .#{$name}-#{$i*5} {
        width: ($i) * 5%;
        flex: none;
      }
    }
    // special
    .#{$name}-#{"1-3"} , .#{$name}-#{"33"}  {
      width: 33.3334%;
      flex: none;
    }
    .#{$name}-#{"1-6"} , .#{$name}-#{"16"} {
      width: 16.6667%;
      flex: none;
    }
    .#{$name}-#{"1-8"} , .#{$name}-#{"12"} {
      width: 12.5%;
      flex: none;
    }
    .#{$name}-auto {
      display: block;        
      flex-grow: 1;
      flex-shrink: 1;
    }

  } @else {

    @media (min-width: #{$start}px) {

      @for $i from 1 through 20 {
    
        .#{$name}-#{$i*5} {
          width: ($i)* 5%;
          flex: none;
        }
      }
      // special
      .#{$name}-#{"1-3"} , .#{$name}-#{"33"}  {
        width: 33.3334%;
        flex: none;
      }
      .#{$name}-#{"1-6"} , .#{$name}-#{"16"} {
        width: 16.6667%;
        flex: none;
      }
      .#{$name}-#{"1-8"} , .#{$name}-#{"12"} {
        width: 12.5%;
        flex: none;
      }
      .#{$name}-auto {
        display: block;        
        flex-grow: 1;
        flex-shrink: 1;
      }
    }
  }
}
```

### Examples

```html
<div class="flex">
    <div class="mobile-100">Width is allways 100%</div>
    <div class="mobile-100 desktop-50">Width in mobile and tablet 
      (although not defined) 100%, desktop: 50% width</div>
</div>
```

```html
<div class="flex">
    <div class="mobile-100 desktop-33">Width is 100% in mobile, 33% in desktop</div>
    <div class="mobile-100 desktop-33">Width is 100% in mobile, 33% in desktop</div>
    <div class="mobile-hidden desktop-33">not visible in mobile, desktop 33%</div>
</div>
```

```html
<div class="flex">
    <div class="mobile-30">Width is 30% in mobile, tablet and desktop</div>
    <div class="mobile-40">Width is 40%</div>
    <div class="mobile-auto">Width is "auto" resulting in 30%</div>
</div>
```


## The gulpfile.json

`Work in progress` 

Catches the scss stuff in the `/src` folder and compiles it into a `/dist` folder. rr-flex.css and rr-flex.min.css. 

```js
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var merge = require('merge-stream');
var stripCssComments = require('gulp-strip-css-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');

ulp.task('sasscompile', function () {

    gulp.src('src/sass/rr-flex/*.*')
        .pipe(sass())
        .pipe(stripCssComments())
        .pipe(removeEmptyLines())
        .pipe(rename({
            basename: 'rr-flex'
        })        )     
        .pipe(gulp.dest('dist/css/'))
        .pipe(cleanCSS())
        .pipe(minify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css/'))
});
```