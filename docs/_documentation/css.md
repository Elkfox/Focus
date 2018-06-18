---
title:  "Styles"
handle: "css"
category: "css"
---

### CSS
We provide some basic popup styling CSS and SCSS files located in the `css/` folder that have been pulled from our in-house framework [Concrete](https://elkfox.github.io/Concrete/). Variables located at the top of the file are the easiest ways to modify the configuration of the popup.

#### Table Of Classes

| Class | Description |
| ----- | ----------- |
| .popup | The parent class of the popup.<br /> Should be added to the starting element of every popup to apply styling.|
| .overlay | When added to the starting element, this will open the popup with a semi-transparent background overlay. |
| .popup-outside | The outside area of the popup, used for closing the Focus element when clicked. |
| .popup-inner | The vertically and horizontally centered popup element. |
| .popup-content | The contents of the popup, this will scroll vertically if the content height exceeds the window height. |
