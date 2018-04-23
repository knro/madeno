# Madeno

Madeno is Material Design Notification component for Material UI v1.

## Getting Started

```
npm install madeno
```

## Demo
Install and run the demo to see how Madeno looks. Spoiler alert: it looks nice.

## Changelog
### Madeno 0.3 beta 4
* We added this changelog, yay
* Fixes missing ```date``` parameter for ```date-fns``` in demo
* Fixes issues that caused the demo to be unable to render

### Madeno 0.3 beta 3
* Remove misplaced ```moment``` package
* Use ```date-fns\format``` to get the default timestamp
* Timestamp is now by default of the format ```H:mm``` instead of ```H:mm A```
* Madeno is now about 20kB smaller

### Madeno 0.3 beta 2
* Adds ```accent``` property with default color ```#8bc34a``` for brand identity
* Implements showing the ```appTitle``` for brand identity, uses ```accent``` as font color
* Update ```moment``` from version 2.20.1 to 2.22.1
* Fixes an issue where the hover effect of buttons would be shown to far to the left
* Colors cheveron in the ```accent``` color

### Madeno 0.3 beta 1
From here on out we'll be a bit more carefull with the stability and quality of the code.

* Major improvements to follow the official Material Design specifications
* Revamped demo

### Madeno 0.3 alpha 4
* Use the official drop shadow for Material Design notifications

### Madeno 0.3 alpha 3
* Put a div arround avatars

### Madeno 0.3 alpha 2
* Fixes issues with ```appTitle``` property

### Madeno 0.3 alpha 1
* Add ```appTitle``` property
* Kill of ```CardHeader``` in favor of ```CardContent```
* ```raised``` has been replaced with ```elevation``` and expects a number between ```0``` and ```24```
* The timestamp can no longer be disabled
* ```appTitle``` has been added as a new variable to show in the notification to better match Material Design
* Clean-up for the files included in the build and package that can be downloaded from npm

### Madeno 0.2.2
* Minor update to used font weights

### Madeno 0.2.1
* Updates the drop shadow behind notifications

### Madeno 0.2.0
* Replace some branding and references to the original project
* Update a bunch of dependencies
* Move action buttons to the left
* Places notifications at the same distance from the bottom as from the right
* Use a more Material Design-like drop shadow

### Madeno 0.1.1
* Don't show a divider between the header and the footer
* Use a background color for the footer