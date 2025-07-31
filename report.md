eports are only visible to you
aria-allowed-attr
(8 occurrences)
error

Elements must only use supported ARIA attributes

<label class="form-custom-radio" aria-checked="true" tabindex="0"><input type="radio" tabindex="-1"  ...

Learn more
aria-allowed-role
(1 occurrence)
warning

ARIA role should be appropriate for the element

<main _ngcontent-ng-c3855325956="" aria-describedby="main-page__title" role="group" class="main-page ...

Learn more
landmark-one-main
(1 occurrence)
warning

Document should have one main landmark

<html lang="en" data-beasties-container="">

Learn more
region
(4 occurrences)
warning

All page content should be contained by landmarks

<h1 _ngcontent-ng-c3855325956="" id="main-page__title" class="main-page__title text-preset-5">memory ...



wcag/h32
(1 occurrence)
error
<form> element must have a submit button

<form _ngcontent-ng-c3855325956="" novalidate="" class="main-page__form bg-white ng-untouched ng-pri ...

Learn more
wcag/h71
(3 occurrences)
error
<fieldset> must have a <legend> as the first child

<fieldset role="radiogroup" class="form-group" aria-labelledby="labelledby-radio-group-suyk3i14"><la ...


Reports are only visible to you
no-unknown-animations
(1 occurrence)
error

Only reference animations that have been defined to prevent silent failures in animation sequences.

animation: slide-out-to-right 0.5s forwards;

project/src/sass/styles.scss:27
Learn more
declaration-property-unit-disallowed-list
(90 occurrences)
warning

Consider using relative units (em, rem) instead of absolute units (px, pt) to support resizing and improve accessibility.

min-height: 48px;

project/src/app/components/button/button.scss:6
Learn more
frontend-mentor/prefers-reduced-motion
(5 occurrences)
warning

Provide alternatives for users who prefer reduced motion to prevent motion sickness and other accessibility issues.

transition: transform 0.6s;

project/src/app/components/flip-card/flip-card.scss:49
Learn more
no-descending-specificity
(7 occurrences)
warning

Order selectors from least to most specific to prevent unexpected style overrides.

&__inner {
    position: relative;
    width: 100%;

project/src/app/components/flip-card/flip-card.scss:45
Learn more
selector-max-specificity
(3 occurrences)
warning

Keep selector specificity low to maintain a flat hierarchy that is easier to maintain and override when needed.

&.selected {
      opacity: 1;
    }

project/src/app/components/flip-card/flip-card.scss:100
Learn more
frontend-mentor/no-fixed
(2 occurrences)
warning

Avoid position: fixed as it can cause content to be cut off when zoomed, creating accessibility issues for users who need to enlarge content.

position: fixed;

project/src/app/modals/result/modal-result.scss:8
Learn more
declaration-block-no-duplicate-properties
(1 occurrence)
warning

Remove duplicate properties to improve code maintainability and prevent unexpected styling behavior.

padding: 1rem;

project/src/app/modals/result/modal-result.scss:13
Learn more
declaration-no-important
(5 occurrences)
warning

Avoid !important as it breaks the natural cascade and makes future style changes more difficult to implement.

animation-duration: 0.01ms !important;

project/src/sass/base/_reset.scss:70
Learn more
frontend-mentor/encourage-css-functions
(27 occurrences)
info

Consider using CSS functions like calc(), min(), and clamp() to create more responsive and flexible layouts that adapt to different viewport sizes.

padding-inline: 15px;

project/src/app/components/button/button.scss:39
Learn more
frontend-mentor/no-extra-semicolons
(27 occurrences)
info

Unexpected extra semicolon

.button {
  @include text-preset-9;

project/src/app/components/button/button.scss:3
frontend-mentor/use-logical-properties
(4 occurrences)
info

Use logical properties (e.g., inline-start instead of left) to support different reading directions and improve internationalization.

margin-bottom: 10px;

project/src/app/modals/result/modal-result.scss:26
Learn more
frontend-mentor/max-width-media-query
(1 occurrence)
info

Consider using min-width instead of max-width and using a mobile-first approach, which can lead to cleaner code and better performance on smaller devices.

@media screen and (max-width: 32em) {
    &.show-menu .header__options--menu {
      display: flex;

project/src/app/pages/board/components/header/header.scss:34
Learn more
frontend-mentor/encourage-css-variables
(1 occurrence)
info

Use CSS custom properties (variables) to centralize values, improve consistency, and make site-wide changes easier to implement.

background: rgba(0, 0, 0, 0.5);

project/src/sass/utils/_mixins.scss:13